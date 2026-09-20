const universe = document.getElementById('universe');
const modal = document.getElementById('modal');
const message = document.getElementById('message');
const flowers = [...document.querySelectorAll('.flower')];
const messages = flowers.map((flower) => flower.dataset.message);
let current = 0;
let dragging = false;
let moved = false;
let startX = 0;
let startY = 0;
let rx = -7;
let ry = 12;

function setTilt() {
  universe.style.setProperty('--rx', `${rx}deg`);
  universe.style.setProperty('--ry', `${ry}deg`);
}

function sparkles(x, y) {
  for (let i = 0; i < 15; i += 1) {
    const star = document.createElement('i');
    star.className = 'click-sparkle';
    star.textContent = i % 3 === 0 ? '✦' : '·';
    star.style.left = `${x + (Math.random() - 0.5) * 80}px`;
    star.style.top = `${y + (Math.random() - 0.5) * 50}px`;
    star.style.setProperty('--dx', `${(Math.random() - 0.5) * 130}px`);
    star.style.setProperty('--dy', `${-40 - Math.random() * 90}px`);
    universe.appendChild(star);
    setTimeout(() => star.remove(), 1200);
  }
}

function showMessage(text, x = universe.clientWidth / 2, y = universe.clientHeight / 2) {
  message.textContent = `“${text}”`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  sparkles(x, y);
}

flowers.forEach((flower, index) => {
  flower.addEventListener('click', (event) => {
    if (moved) return;
    current = index;
    const rect = universe.getBoundingClientRect();
    showMessage(flower.dataset.message, event.clientX - rect.left, event.clientY - rect.top);
  });
});

document.getElementById('surprise').addEventListener('click', () => {
  current = (current + 1) % messages.length;
  showMessage(messages[current]);
});

document.getElementById('next').addEventListener('click', () => {
  current = (current + 1) % messages.length;
  message.textContent = `“${messages[current]}”`;
});

document.getElementById('close').addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) document.getElementById('close').click();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) document.getElementById('close').click();
});

universe.addEventListener('pointerdown', (event) => {
  if (event.target.closest('.flower')) return;
  dragging = true;
  moved = false;
  startX = event.clientX;
  startY = event.clientY;
  universe.setPointerCapture(event.pointerId);
});
universe.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  const dx = event.clientX - startX;
  const dy = event.clientY - startY;
  if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
  ry = Math.max(-30, Math.min(30, ry + dx * 0.12));
  rx = Math.max(-28, Math.min(18, rx - dy * 0.12));
  startX = event.clientX;
  startY = event.clientY;
  setTilt();
});
function stopDragging() {
  dragging = false;
  setTimeout(() => { moved = false; }, 40);
}
universe.addEventListener('pointerup', stopDragging);
universe.addEventListener('pointercancel', stopDragging);
universe.addEventListener('pointerleave', stopDragging);

const stars = document.getElementById('stars');
for (let i = 0; i < 90; i += 1) {
  const star = document.createElement('i');
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  stars.appendChild(star);
}
setTilt();
