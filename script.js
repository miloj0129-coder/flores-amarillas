const phrases = [
  {
    text: "La vida se vuelve más hermosa cuando aprendes a ver la luz en lo simple.",
    author: "Inspiración diaria"
  },
  {
    text: "Cada flor amarilla parece decirte: sigue adelante, aún hay belleza por descubrir.",
    author: "Mensajes del alma"
  },
  {
    text: "Hay días que brillan solo porque decimos sí a la alegría con el corazón.",
    author: "Pensamientos cálidos"
  },
  {
    text: "Aunque el mundo sea grande, siempre habrá un pequeño rincón que te haga sonreír.",
    author: "Luz soñada"
  },
  {
    text: "La felicidad no siempre llega de golpe; a veces llega como un sol tímido entre flores.",
    author: "Belleza cotidiana"
  }
];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
let index = 0;

function updateQuote() {
  const current = phrases[index];
  quoteText.textContent = `“${current.text}”`;
  quoteAuthor.textContent = `- ${current.author}`;
  index = (index + 1) % phrases.length;
}

updateQuote();
setInterval(updateQuote, 4200);

const petalLayer = document.getElementById("petalLayer");

function createFloatingPetals() {
  const petalCount = 28;

  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.top = `${-10 - Math.random() * 20}%`;
    petal.style.setProperty("--duration", `${10 + Math.random() * 12}s`);
    petal.style.setProperty("--x", `${(Math.random() - 0.5) * 140}px`);
    petal.style.setProperty("--spin", `${(Math.random() - 0.5) * 720}deg`);
    petal.style.animationDelay = `${Math.random() * 5}s`;
    petalLayer.appendChild(petal);
  }
}

createFloatingPetals();
