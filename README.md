# AirConsole-style Controller Framework

A phone-as-controller multiplayer framework, same core idea as AirConsole:
open a "screen" page on your TV/laptop, phones scan a QR code or type a
4-digit room code, and their touch input streams to the screen in real time
over WebSockets.

## Run it

```bash
npm install
npm start
```

Then:
- Open **http://localhost:3000/screen.html** on your computer/TV.
- On each phone (same Wi-Fi network), open **http://localhost:3000/controller.html**
  and either scan the QR code or type the 4-digit room code.
  - Replace `localhost` with your computer's LAN IP (e.g. `192.168.1.23`)
    so phones on the network can reach it.

Included game: a 3–6 player party trivia game (10 built-in questions,
4-choice buzzer, speed-based scoring, live leaderboard) with a
translucent "liquid glass" look, plus a persistent chat drawer on the
controller and a chat panel on the screen.

## How it works

- `server.js` — a WebSocket relay. It knows nothing about game logic; it
  just tracks which controllers belong to which room and forwards JSON
  messages between them.
- `public/screen.html` — creates a room, shows the join code/QR, and
  renders the game.
- `public/controller.html` — joins a room and turns touch gestures into
  input events.

### Message protocol

Controller → screen (answers and chat both ride the generic "input" message):
```js
ws.send(JSON.stringify({ type: "input", data: { kind: "answer", choice: 2 } }))
ws.send(JSON.stringify({ type: "input", data: { kind: "chat", text: "gg" } }))
```

Screen receives:
```js
{ type: "input", playerId, data }
```

Screen → one controller (e.g. assign a color, buzz/vibrate):
```js
ws.send(JSON.stringify({ type: "to-controller", playerId, data: {...} }))
```

Screen → all controllers (e.g. "game started", sync state):
```js
ws.send(JSON.stringify({ type: "to-all-controllers", data: {...} }))
```
Controllers receive these as `{ type: "message", data }`.

## Customizing the trivia game

- **Questions**: edit the `QUESTIONS` array at the top of `screen.html` —
  each entry is `{ text, options: [4], correct: index }`. Add as many as
  you want.
- **Round length**: change `QUESTION_DURATION` (ms) in `screen.html`.
- **Scoring**: tweak the formula inside `reveal()` in `screen.html`
  (currently: faster correct answers earn more, 100–1000 points).
- **Theme**: all the "liquid glass" styling lives in the `.glass` class
  and the `.blob` background elements in both HTML files' `<style>`
  blocks — change the blob colors/blur or the glass opacity/blur to
  restyle everything at once.
- Room codes, QR joining, player list, and reconnect-safe cleanup are
  already handled by `server.js` — you shouldn't need to touch it unless
  you want persistent scores across sessions, private chat, or room
  passwords.

## Deploying so friends can join remotely

Host `server.js` anywhere that supports WebSockets (Render, Fly.io,
Railway, a VPS, etc.) — Express serves the static files and the `ws`
library upgrades the same HTTP server, so no separate WebSocket host is
needed. Just make sure your platform doesn't kill idle WebSocket
connections too aggressively.
