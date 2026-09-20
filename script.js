const modal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const galaxy = document.getElementById('galaxy');
const flowers = Array.from(document.querySelectorAll('.flower'));
const messages = flowers.map((flower) => flower.dataset.message);
let currentIndex = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let tiltX = -8;
let tiltY = 18;

function createSparkles(x, y) {
  for (let i = 0; i < 16; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.textContent = i % 3 === 0 ? '✦' : '·';
    sparkle.className = 'click-sparkle';
    sparkle.style.left = `${x + (Math.random() - 0.5) * 110}px`;
    sparkle.style.top = `${y + (Math.random() - 0.5) * 80}px`;
    sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 130}px`);
    sparkle.style.setProperty('--dy', `${-35 - Math.random() * 100}px`);
    galaxy.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1200);
  }
}

function openMessage(message, x = 0, y = 0) {
  modalMessage.textContent = `“${message}”`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  createSparkles(x, y);
}

function updateGalaxyTilt() {
  galaxy.style.setProperty('--tiltX', `${tiltX}deg`);
  galaxy.style.setProperty('--tiltY', `${tiltY}deg`);
}

flowers.forEach((flower, index) => {
  flower.addEventListener('click', (event) => {
    currentIndex = index;
    const rect = galaxy.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    openMessage(flower.dataset.message, x, y);
  });
});

document.getElementById('surpriseButton').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % messages.length;
  openMessage(messages[currentIndex], galaxy.clientWidth / 2, galaxy.clientHeight / 2);
});

document.getElementById('anotherButton').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % messages.length;
  modalMessage.textContent = `“${messages[currentIndex]}”`;
});

document.getElementById('closeModal').addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    document.getElementById('closeModal').click();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    document.getElementById('closeModal').click();
  }
});

galaxy.addEventListener('pointerdown', (event) => {
  isDragging = true;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  galaxy.setPointerCapture(event.pointerId);
});

galaxy.addEventListener('pointermove', (event) => {
  if (!isDragging) return;
  const deltaX = event.clientX - dragStartX;
  const deltaY = event.clientY - dragStartY;
  tiltY += deltaX * 0.12;
  tiltX -= deltaY * 0.12;
  tiltX = Math.max(-28, Math.min(18, tiltX));
  tiltY = Math.max(-30, Math.min(30, tiltY));
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  updateGalaxyTilt();
});

galaxy.addEventListener('pointerup', () => {
  isDragging = false;
});

galaxy.addEventListener('pointerleave', () => {
  isDragging = false;
});

updateGalaxyTilt();

const starLayer = document.getElementById('stars');
for (let i = 0; i < 75; i += 1) {
  const star = document.createElement('i');
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
  starLayer.appendChild(star);
}
