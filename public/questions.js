// questions.js — shared question banks for screen.html
// Loaded before the main script. Exposes: GK_QUESTIONS, buildFlagQuestions(),
// shuffleArray(), sampleRandom() as globals.

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function sampleRandom(arr, n) { return shuffleArray(arr).slice(0, n); }

// ---------- World capitals (dynamic distractors from this same list) ----------
const COUNTRY_CAPITALS = [
  ["France","Paris"],["Japan","Tokyo"],["Germany","Berlin"],["Italy","Rome"],["Spain","Madrid"],
  ["Canada","Ottawa"],["Australia","Canberra"],["Brazil","Brasília"],["Russia","Moscow"],["China","Beijing"],
  ["India","New Delhi"],["Egypt","Cairo"],["South Korea","Seoul"],["Mexico","Mexico City"],["Argentina","Buenos Aires"],
  ["Turkey","Ankara"],["Greece","Athens"],["Portugal","Lisbon"],["Netherlands","Amsterdam"],["Sweden","Stockholm"],
  ["Norway","Oslo"],["Poland","Warsaw"],["Switzerland","Bern"],["Austria","Vienna"],["Thailand","Bangkok"],
  ["Indonesia","Jakarta"],["Vietnam","Hanoi"],["Philippines","Manila"],["Nigeria","Abuja"],["Kenya","Nairobi"],
  ["South Africa","Pretoria"],["Chile","Santiago"],["Peru","Lima"],["Colombia","Bogotá"],["Cuba","Havana"],
  ["Ireland","Dublin"],["Finland","Helsinki"],["Denmark","Copenhagen"],["New Zealand","Wellington"],["Iceland","Reykjavik"],
];

function buildCapitalQuestions() {
  return COUNTRY_CAPITALS.map(([country, capital]) => {
    const wrongPool = COUNTRY_CAPITALS.filter((c) => c[1] !== capital).map((c) => c[1]);
    const wrongs = shuffleArray(wrongPool).slice(0, 3);
    const options = shuffleArray([capital, ...wrongs]);
    return { text: `What is the capital of ${country}?`, options, correct: options.indexOf(capital) };
  });
}

// ---------- General knowledge facts ----------
// Each row: [question, correctAnswer, wrong1, wrong2, wrong3]
const RAW_FACTS = [
  // Science
  ["What is the chemical symbol for water?","H2O","CO2","O2","NaCl"],
  ["What planet is closest to the Sun?","Mercury","Venus","Earth","Mars"],
  ["What gas do humans need to breathe to survive?","Oxygen","Nitrogen","Helium","Carbon dioxide"],
  ["What is the boiling point of water in Celsius?","100°C","90°C","80°C","120°C"],
  ["Which force pulls objects toward Earth?","Gravity","Magnetism","Friction","Inertia"],
  ["What is the powerhouse of the cell called?","Mitochondria","Nucleus","Ribosome","Cytoplasm"],
  ["What is the chemical symbol for gold?","Au","Ag","Gd","Go"],
  ["How many bones are in the adult human body?","206","186","226","300"],
  ["What is the hardest natural substance on Earth?","Diamond","Quartz","Iron","Granite"],
  ["Which gas makes up most of Earth's atmosphere?","Nitrogen","Oxygen","Carbon dioxide","Argon"],
  ["What do you call an animal that eats both plants and meat?","Omnivore","Herbivore","Carnivore","Scavenger"],
  ["What is the study of weather called?","Meteorology","Geology","Astronomy","Biology"],
  ["What part of the plant conducts photosynthesis?","Leaves","Roots","Stem","Flowers"],
  ["What is the freezing point of water in Fahrenheit?","32°F","0°F","100°F","212°F"],
  ["What is the largest organ in the human body?","Skin","Liver","Heart","Lungs"],
  ["What is the center of an atom called?","Nucleus","Electron","Proton","Neutron"],
  ["What is the process by which plants make food using sunlight?","Photosynthesis","Respiration","Fermentation","Digestion"],
  ["What type of energy is stored in food?","Chemical energy","Kinetic energy","Nuclear energy","Thermal energy"],
  ["Which blood type is known as the universal donor?","O negative","AB positive","A positive","B negative"],
  ["Which planet is known as the Red Planet?","Mars","Venus","Jupiter","Saturn"],
  // Human body
  ["How many chambers does the human heart have?","4","2","3","5"],
  ["What is the largest bone in the human body?","Femur","Tibia","Humerus","Pelvis"],
  ["Which organ pumps blood through the body?","Heart","Liver","Lungs","Kidneys"],
  ["What is the human body's largest internal organ?","Liver","Stomach","Kidney","Pancreas"],
  ["How many pairs of ribs does the average adult have?","12","10","14","24"],
  ["What part of the body do you use to smell?","Nose","Tongue","Ears","Skin"],
  ["What is the medical term for the windpipe?","Trachea","Esophagus","Larynx","Pharynx"],
  ["Which organ filters waste from the blood?","Kidneys","Liver","Lungs","Spleen"],
  ["What is the outer layer of skin called?","Epidermis","Dermis","Hypodermis","Cuticle"],
  ["How many teeth does a full set of adult human teeth have?","32","28","30","36"],
  ["Which part of the brain controls balance?","Cerebellum","Cerebrum","Medulla","Cortex"],
  ["What is the average human body temperature in Celsius?","37°C","35°C","40°C","30°C"],
  ["What connects muscles to bones?","Tendons","Ligaments","Cartilage","Nerves"],
  ["What connects bones to other bones?","Ligaments","Tendons","Cartilage","Muscles"],
  ["Which blood cells help fight infection?","White blood cells","Red blood cells","Platelets","Plasma"],
  // Animals
  ["What is the largest mammal in the world?","Blue whale","African elephant","Giraffe","Polar bear"],
  ["What is a baby kangaroo called?","Joey","Cub","Calf","Pup"],
  ["How many legs does a spider have?","8","6","10","4"],
  ["What is the fastest land animal?","Cheetah","Lion","Horse","Gazelle"],
  ["Which bird is known for mimicking sounds and words?","Parrot","Crow","Eagle","Owl"],
  ["What do you call a group of wolves?","Pack","Herd","Flock","School"],
  ["Which sea creature has eight arms?","Octopus","Squid","Jellyfish","Starfish"],
  ["What is the tallest animal in the world?","Giraffe","Elephant","Camel","Ostrich"],
  ["Which animal is known as the King of the Jungle?","Lion","Tiger","Elephant","Gorilla"],
  ["What do pandas mainly eat?","Bamboo","Fish","Fruit","Insects"],
  ["How many hearts does an octopus have?","3","1","2","4"],
  ["What is a group of lions called?","Pride","Pack","Herd","Colony"],
  ["Which animal is known for its black and white stripes?","Zebra","Panda","Skunk","Tiger"],
  ["What is the only mammal capable of true flight?","Bat","Flying squirrel","Sugar glider","Ostrich"],
  ["Which reptile can regrow its tail?","Lizard","Turtle","Snake","Crocodile"],
  ["What is the largest bird in the world by weight?","Ostrich","Eagle","Albatross","Emu"],
  ["How many legs does an insect have?","6","4","8","10"],
  ["Which animal is famous for changing colors to blend in?","Chameleon","Frog","Gecko","Iguana"],
  ["What is a young dog called?","Puppy","Kitten","Cub","Kid"],
  ["Which ocean animal is known to have the largest brain?","Sperm whale","Dolphin","Octopus","Shark"],
  // History
  ["Who was the first President of the United States?","George Washington","Thomas Jefferson","Abraham Lincoln","John Adams"],
  ["In which year did World War II end?","1945","1939","1918","1950"],
  ["Which ancient civilization built the pyramids of Giza?","Egyptians","Romans","Greeks","Mayans"],
  ["Who painted the Mona Lisa?","Leonardo da Vinci","Michelangelo","Raphael","Donatello"],
  ["Which wall divided a European city until 1989?","Berlin Wall","Great Wall","Hadrian's Wall","Western Wall"],
  ["Who is known for describing gravity after seeing an apple fall?","Isaac Newton","Albert Einstein","Galileo","Charles Darwin"],
  ["Which empire was ruled by Julius Caesar?","Roman Empire","Greek Empire","Egyptian Empire","Persian Empire"],
  ["In which year did the Titanic sink?","1912","1905","1920","1898"],
  ["Who wrote the Declaration of Independence?","Thomas Jefferson","Benjamin Franklin","George Washington","John Adams"],
  ["Which country gifted the Statue of Liberty to the USA?","France","England","Spain","Italy"],
  ["What ancient wonder was located in Alexandria?","Lighthouse of Alexandria","Hanging Gardens","Colossus of Rhodes","Great Pyramid"],
  ["Who was the first man to walk on the Moon?","Neil Armstrong","Buzz Aldrin","Yuri Gagarin","John Glenn"],
  ["Which country was formerly known as Persia?","Iran","Iraq","Turkey","Egypt"],
  ["What year was the Declaration of Independence signed?","1776","1789","1812","1763"],
  ["Who was the queen of ancient Egypt famous for her alliance with Rome?","Cleopatra","Nefertiti","Hatshepsut","Isis"],
  ["Which explorer is credited with reaching the Americas in 1492?","Christopher Columbus","Ferdinand Magellan","Marco Polo","Vasco da Gama"],
  ["What was the name of the ship the Pilgrims sailed to America on?","Mayflower","Santa Maria","Endeavour","Beagle"],
  ["Which country was the first to grant women the right to vote nationally?","New Zealand","United States","United Kingdom","France"],
  ["Who was the British Prime Minister during most of World War II?","Winston Churchill","Neville Chamberlain","Tony Blair","Margaret Thatcher"],
  ["Which US president appears on the one-dollar bill?","George Washington","Abraham Lincoln","Thomas Jefferson","Benjamin Franklin"],
  // Math
  ["What is 7 x 8?","56","54","64","48"],
  ["What is the square root of 64?","8","6","7","9"],
  ["How many sides does a hexagon have?","6","5","7","8"],
  ["What is 15% of 200?","30","20","25","35"],
  ["What is the value of Pi rounded to two decimal places?","3.14","3.41","3.12","3.16"],
  ["How many degrees are in a right angle?","90","45","180","60"],
  ["What is 100 divided by 4?","25","20","30","40"],
  ["How many sides does an octagon have?","8","6","7","10"],
  ["What is 9 squared?","81","72","90","99"],
  ["How many degrees are in a full circle?","360","180","90","270"],
  ["What is the sum of the angles in a triangle?","180 degrees","90 degrees","270 degrees","360 degrees"],
  ["What is 12 x 12?","144","124","132","154"],
  ["What comes after a million?","Billion","Trillion","Thousand","Zillion"],
  ["What is an even number?","A number divisible by 2","A number divisible by 3","A number ending in 1","A prime number"],
  ["What is the Roman numeral for 50?","L","C","D","X"],
  // Sports
  ["How many players are on a standard soccer team on the field?","11","9","10","12"],
  ["In which sport would you perform a slam dunk?","Basketball","Volleyball","Tennis","Baseball"],
  ["How many rings are on the Olympic flag?","5","4","6","7"],
  ["Which country hosts the Wimbledon tennis tournament?","England","France","USA","Australia"],
  ["How many players are on a basketball team on the court at once?","5","6","7","4"],
  ["In which sport do players use a shuttlecock?","Badminton","Tennis","Squash","Table tennis"],
  ["What is the national sport of Japan?","Sumo wrestling","Judo","Karate","Baseball"],
  ["How often are the Summer Olympic Games held?","Every 4 years","Every 2 years","Every 3 years","Every 5 years"],
  ["Which sport is known as 'the beautiful game'?","Soccer","Basketball","Rugby","Cricket"],
  ["In golf, what is a score of one under par called?","Birdie","Eagle","Bogey","Par"],
  ["How many players are on a volleyball team on the court?","6","5","7","8"],
  ["What sport is played at Wimbledon?","Tennis","Cricket","Golf","Rugby"],
  ["In baseball, how many strikes make an out?","3","2","4","5"],
  ["Which country won the first FIFA World Cup?","Uruguay","Brazil","Argentina","Italy"],
  ["How many holes are played in a standard round of golf?","18","9","12","20"],
  ["What color card signals a player is sent off in soccer?","Red","Yellow","Blue","Black"],
  ["In American football, how many points is a touchdown worth?","6","3","7","2"],
  ["Which martial art originated in Japan and means 'gentle way'?","Judo","Karate","Taekwondo","Aikido"],
  ["How many players are on an ice hockey team on the ice per side?","6","5","7","4"],
  ["What is the maximum score possible in ten-pin bowling?","300","200","250","350"],
  // Space
  ["What is the name of Earth's only natural satellite?","The Moon","Mars","Titan","Europa"],
  ["Which is the largest planet in our solar system?","Jupiter","Saturn","Neptune","Earth"],
  ["What galaxy is Earth located in?","Milky Way","Andromeda","Whirlpool","Sombrero"],
  ["Which star system is closest to our Sun?","Alpha Centauri","Sirius","Betelgeuse","Vega"],
  ["How many planets are in our solar system?","8","7","9","10"],
  ["What do we call a rocky object that burns up in Earth's atmosphere?","Meteor","Asteroid","Comet","Satellite"],
  ["Which planet has the most prominent ring system?","Saturn","Jupiter","Uranus","Neptune"],
  ["What was the first artificial satellite launched into space?","Sputnik 1","Apollo 11","Voyager 1","Explorer 1"],
  ["Which space agency landed the first humans on the Moon?","NASA","ESA","Roscosmos","JAXA"],
  ["What is a group of stars forming a recognizable pattern called?","Constellation","Galaxy","Nebula","Cluster"],
  ["What is the term for a star's explosive death?","Supernova","Black hole","Nova","Nebula"],
  ["Which planet spins almost on its side relative to its orbit?","Uranus","Neptune","Venus","Saturn"],
  ["What force mainly causes tides on Earth?","The Moon's gravity","The Sun's heat","Earth's rotation","Wind"],
  ["About how long does it take Earth to orbit the Sun?","365 days","30 days","24 hours","100 days"],
  ["What is NASA's famous space telescope launched in 1990?","Hubble Space Telescope","James Webb Telescope","Kepler Telescope","Spitzer Telescope"],
  // Food
  ["What is the main ingredient in guacamole?","Avocado","Tomato","Onion","Pepper"],
  ["Which country is credited with inventing pizza as we know it?","Italy","France","Greece","USA"],
  ["What is the main ingredient in traditional hummus?","Chickpeas","Lentils","Black beans","Peas"],
  ["What drink is made by fermenting grapes?","Wine","Beer","Cider","Whiskey"],
  ["Which spice comes from the crocus flower and is the priciest by weight?","Saffron","Cinnamon","Turmeric","Paprika"],
  ["What grain is used to make traditional sushi?","Rice","Wheat","Barley","Corn"],
  ["Which country is the origin of the taco?","Mexico","Spain","Brazil","Peru"],
  ["What is the main flavoring in traditional Italian pesto?","Basil","Parsley","Mint","Oregano"],
  ["What type of milk is traditionally used for mozzarella cheese?","Buffalo or cow's milk","Goat's milk","Sheep's milk","Almond milk"],
  ["Which fruit is associated with the saying 'keeps the doctor away'?","Apple","Orange","Banana","Grape"],
  ["What is the main ingredient in traditional French ratatouille?","Vegetables","Beef","Chicken","Fish"],
  ["Which country is famous for inventing the sandwich as commonly named?","England","France","USA","Germany"],
  ["What is miso soup's key ingredient?","Fermented soybean paste","Seaweed","Rice","Fish"],
  ["Sushi rice is traditionally seasoned with what?","Rice vinegar","Soy sauce","Lemon juice","Mirin only"],
  // General
  ["What is the tallest mountain in the world?","Mount Everest","K2","Kilimanjaro","Denali"],
  ["What is the longest river in the world?","The Nile","Amazon","Yangtze","Mississippi"],
  ["What is the smallest country in the world by area?","Vatican City","Monaco","San Marino","Liechtenstein"],
  ["Which desert is the largest hot desert in the world?","Sahara Desert","Gobi Desert","Kalahari Desert","Arabian Desert"],
  ["What is the currency used in Japan?","Yen","Won","Yuan","Ringgit"],
  ["What is the official language of Brazil?","Portuguese","Spanish","French","Italian"],
  ["Which continent is the largest by land area?","Asia","Africa","North America","Europe"],
  ["What is the most spoken language in the world by native speakers?","Mandarin Chinese","English","Spanish","Hindi"],
  ["Which continent is mostly covered by the largest cold desert?","Antarctica","Africa","Asia","Europe"],
  ["Which ocean is the largest?","Pacific Ocean","Atlantic Ocean","Indian Ocean","Arctic Ocean"],
  ["What is the smallest planet in our solar system?","Mercury","Mars","Venus","Pluto"],
  ["What is the capital of the United States?","Washington, D.C.","New York City","Los Angeles","Chicago"],
  ["Which country is known as the Land of the Rising Sun?","Japan","China","South Korea","Thailand"],
  ["What is the longest wall ever built by humans?","The Great Wall of China","Berlin Wall","Hadrian's Wall","Western Wall"],
];

const GK_FACT_QUESTIONS = RAW_FACTS.map(([text, correct, w1, w2, w3]) => {
  const options = shuffleArray([correct, w1, w2, w3]);
  return { text, options, correct: options.indexOf(correct) };
});

const GK_QUESTIONS = [...buildCapitalQuestions(), ...GK_FACT_QUESTIONS];

// ---------- Flag minigame ----------
const COUNTRIES = [
  ["United States","US"],["United Kingdom","GB"],["France","FR"],["Germany","DE"],["Italy","IT"],
  ["Spain","ES"],["Canada","CA"],["Australia","AU"],["Brazil","BR"],["Russia","RU"],
  ["China","CN"],["Japan","JP"],["India","IN"],["Egypt","EG"],["South Korea","KR"],
  ["Mexico","MX"],["Argentina","AR"],["Turkey","TR"],["Greece","GR"],["Portugal","PT"],
  ["Netherlands","NL"],["Sweden","SE"],["Norway","NO"],["Poland","PL"],["Switzerland","CH"],
  ["Austria","AT"],["Thailand","TH"],["Indonesia","ID"],["Vietnam","VN"],["Philippines","PH"],
  ["Nigeria","NG"],["Kenya","KE"],["South Africa","ZA"],["Chile","CL"],["Peru","PE"],
  ["Colombia","CO"],["Cuba","CU"],["Ireland","IE"],["Finland","FI"],["Denmark","DK"],
  ["New Zealand","NZ"],["Iceland","IS"],["Saudi Arabia","SA"],["United Arab Emirates","AE"],["Israel","IL"],
  ["Pakistan","PK"],["Bangladesh","BD"],["Malaysia","MY"],["Singapore","SG"],["Ukraine","UA"],
  ["Czech Republic","CZ"],["Hungary","HU"],["Romania","RO"],["Bulgaria","BG"],["Croatia","HR"],
  ["Serbia","RS"],["Belgium","BE"],["Morocco","MA"],["Jamaica","JM"],["Costa Rica","CR"],
];

function flagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

function buildFlagQuestions(n) {
  const picks = sampleRandom(COUNTRIES, n);
  return picks.map(([name, code]) => {
    const wrongPool = COUNTRIES.filter((c) => c[0] !== name).map((c) => c[0]);
    const wrongs = shuffleArray(wrongPool).slice(0, 3);
    const options = shuffleArray([name, ...wrongs]);
    return { text: flagEmoji(code), options, correct: options.indexOf(name) };
  });
}
