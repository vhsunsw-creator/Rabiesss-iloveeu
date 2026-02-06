let step = 0;
let envelopeIndex = 0;

const steps = [
  "Hey Rabiesss 👀",
  "I hope you’re smiling right now 😌",
  "Because this is made just for you 💖",
  "Tap again… something special awaits ✨"
];

const letters = [
  "You have no idea how happy you make me 🥰",
  "Every message from you is my favorite 💭",
  "Even your quirks are adorable 😏",
  "And I wouldn’t trade this feeling for anything 💖"
];

// TAP ANYWHERE FOR FLOATING HEARTS
document.body.addEventListener("click", (e) => {
  createFloatingHearts(e.clientX, e.clientY);
});

function nextStep() {
  step++;
  const text = document.getElementById("text");
  if (step < steps.length) {
    typeWriter(steps[step], text);
  } else {
    showEnvelope();
  }
}

// TYPEWRITER EFFECT
function typeWriter(txt, element, i = 0) {
  element.innerText = "";
  let timer = setInterval(() => {
    element.innerText += txt[i];
    i++;
    if (i >= txt.length) clearInterval(timer);
  }, 40);
}

// SHOW ENVELOPE WITH FLY-IN
function showEnvelope() {
  const card = document.getElementById("card");

  const envelope = document.createElement("div");
  envelope.className = "envelope";
  envelope.innerText = "✉️";

  const startSide = Math.floor(Math.random() * 4);
  switch(startSide){
    case 0: envelope.style.top = "-100px"; envelope.style.left = Math.random()*80+"%"; break;
    case 1: envelope.style.top = Math.random()*80+"%"; envelope.style.left = "-100px"; break;
    case 2: envelope.style.top = "100%"; envelope.style.left = Math.random()*80+"%"; break;
    case 3: envelope.style.top = Math.random()*80+"%"; envelope.style.left = "100%"; break;
  }

  envelope.animate([
    { transform: `translate(0,0) rotate(0deg)` },
    { transform: `translate(0,0) rotate(${Math.random()*20-10}deg)` }
  ], { duration: 800, fill: "forwards", easing: "ease-out" });

  envelope.onclick = () => openLetterWithExplosion(envelope);
  card.appendChild(envelope);
}

// OPEN LETTER + HEART EXPLOSION
function openLetterWithExplosion(envelope) {
  const card = document.getElementById("card");

  // create exploding hearts
  createFloatingHearts(envelope.offsetLeft + 20, envelope.offsetTop + 20, 25);

  envelope.remove();

  // show current letter
  const div = document.createElement("div");
  div.className = "letter";
  div.innerText = letters[envelopeIndex];
  card.appendChild(div);

  envelopeIndex++;

  if(envelopeIndex < letters.length) {
    setTimeout(showEnvelope, 800);
  } else {
    setTimeout(showFinalCinematic, 1200);
  }
}

// CREATE FLOATING HEARTS
function createFloatingHearts(x, y, count=10) {
  for(let i=0;i<count;i++){
    const heart = document.createElement("span");
    heart.innerHTML = "💖";
    heart.style.position = "absolute";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = Math.random()*25 + 15 + "px";
    heart.style.opacity = 1;
    document.body.appendChild(heart);

    let angle = Math.random()*2*Math.PI;
    let dist = Math.random()*100 + 50;
    let dx = Math.cos(angle)*dist;
    let dy = Math.sin(angle)*dist;

    heart.animate([
      { transform: 'translate(0,0)', opacity:1 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity:0 }
    ], { duration: 1200 + Math.random()*500, fill:"forwards", easing:"ease-out" });

    setTimeout(()=> heart.remove(), 1800);
  }
}

// CINEMATIC FINAL PHOTO
function showFinalCinematic() {
  const card = document.getElementById("card");
  card.classList.add("final");
  card.innerHTML = `
    <img src="final.jpg" alt="Us 💖">
    <h1>I love you Rabiesss 👽💖</h1>
    <p>Forever yours 😌</p>
  `;

  // automatic heart + sparkle explosion on final photo
  const interval = setInterval(() => {
    for(let i=0;i<15;i++){
      createFloatingHearts(Math.random()*window.innerWidth, Math.random()*window.innerHeight, 1);
    }
  }, 200);

  setTimeout(()=> clearInterval(interval), 6000);

  // final zoom + pulse
  const img = document.querySelector(".final img");
  img.animate([
    { transform: "scale(0.8)", opacity:0 },
    { transform: "scale(1)", opacity:1 }
  ], { duration: 1000, fill:"forwards", easing:"ease-out" });
}

// START BUTTON
document.getElementById("btn").addEventListener("click", nextStep);
