// server.js
// Minimal AirConsole-style relay server.
//
// Roles:
//   - "screen"     one per room — the big display (TV / laptop)
//   - "controller" many per room — phones that join with a room code
//
// The server never looks at game payloads; it just relays JSON messages
// between the screen and its controllers. All game logic lives in the
// client HTML files (public/screen.html and public/controller.html).

const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

/** rooms: Map<code, { screen: ws|null, players: Map<playerId, {ws, name}> }> */
const rooms = new Map();

function makeRoomCode() {
  let code;
  do {
    code = String(Math.floor(1000 + Math.random() * 9000)); // 4-digit
  } while (rooms.has(code));
  return code;
}

function send(ws, msg) {
  if (ws && ws.readyState === ws.OPEN) ws.send(JSON.stringify(msg));
}

function broadcastPlayerList(room) {
  const players = [...room.players.entries()].map(([id, p]) => ({ id, name: p.name }));
  send(room.screen, { type: "player-list", players });
}

wss.on("connection", (ws) => {
  // Each connection tags itself as "screen" or "controller" in its first message.
  ws.role = null;
  ws.roomCode = null;
  ws.playerId = null;

  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return; // ignore malformed messages
    }

    switch (msg.type) {
      // --- Screen creates a new room ---
      case "create-room": {
        const code = makeRoomCode();
        rooms.set(code, { screen: ws, players: new Map() });
        ws.role = "screen";
        ws.roomCode = code;
        send(ws, { type: "room-created", code });
        break;
      }

      // --- Controller joins an existing room ---
      case "join-room": {
        const code = String(msg.code || "").trim();
        const room = rooms.get(code);
        if (!room) {
          send(ws, { type: "join-error", message: "Room not found" });
          return;
        }
        const playerId = crypto.randomUUID();
        const name = (msg.name || "Player").slice(0, 24);
        room.players.set(playerId, { ws, name });

        ws.role = "controller";
        ws.roomCode = code;
        ws.playerId = playerId;

        send(ws, { type: "joined", playerId, code });
        send(room.screen, { type: "player-joined", playerId, name });
        broadcastPlayerList(room);
        break;
      }

      // --- Controller -> Screen input event ---
      case "input": {
        const room = rooms.get(ws.roomCode);
        if (!room || ws.role !== "controller") return;
        send(room.screen, { type: "input", playerId: ws.playerId, data: msg.data });
        break;
      }

      // --- Screen -> one controller (e.g. rumble, "you're it", assign color) ---
      case "to-controller": {
        const room = rooms.get(ws.roomCode);
        if (!room || ws.role !== "screen") return;
        const player = room.players.get(msg.playerId);
        if (player) send(player.ws, { type: "message", data: msg.data });
        break;
      }

      // --- Screen -> all controllers (e.g. "game started", state sync) ---
      case "to-all-controllers": {
        const room = rooms.get(ws.roomCode);
        if (!room || ws.role !== "screen") return;
        for (const { ws: pws } of room.players.values()) {
          send(pws, { type: "message", data: msg.data });
        }
        break;
      }

      default:
        break;
    }
  });

  ws.on("close", () => {
    const room = rooms.get(ws.roomCode);
    if (!room) return;

    if (ws.role === "screen") {
      // Screen left: tell every controller the room is closed, then drop it.
      for (const { ws: pws } of room.players.values()) {
        send(pws, { type: "room-closed" });
      }
      rooms.delete(ws.roomCode);
    } else if (ws.role === "controller") {
      room.players.delete(ws.playerId);
      send(room.screen, { type: "player-left", playerId: ws.playerId });
      broadcastPlayerList(room);
    }
  });
});

server.listen(PORT, () => {
  console.log(`AirConsole-clone server running at http://localhost:${PORT}`);
  console.log(`  Screen:     http://localhost:${PORT}/screen.html`);
  console.log(`  Controller: http://localhost:${PORT}/controller.html`);
});
