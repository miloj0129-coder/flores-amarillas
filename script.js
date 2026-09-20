const galaxy = document.getElementById('galaxy');
const space = document.getElementById('space');
const ctx = space.getContext('2d');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const flowers = [...document.querySelectorAll('.flower')];
const messages = flowers.map((flower) => flower.dataset.message);
let current = 0;
let dragging = false;
let moved = false;
let startX = 0;
let startY = 0;
let rx = -6;
let ry = 7;
let particles = [];

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  space.width = window.innerWidth * ratio;
  space.height = window.innerHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: 190 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.7 + 0.25,
    speed: Math.random() * 0.22 + 0.03,
    phase: Math.random() * Math.PI * 2,
    warm: Math.random() > 0.72
  }));
}

function renderSpace(time = 0) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const particle of particles) {
    particle.y -= particle.speed;
    if (particle.y < -4) particle.y = window.innerHeight + 4;
    const alpha = 0.22 + (Math.sin(time * 0.001 + particle.phase) + 1) * 0.26;
    ctx.fillStyle = particle.warm ? `rgba(255, 231, 100, ${alpha})` : `rgba(220, 233, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(renderSpace);
}

function setTilt() {
  galaxy.style.setProperty('--rx', `${rx}deg`);
  galaxy.style.setProperty('--ry', `${ry}deg`);
}

function burst(x, y) {
  for (let i = 0; i < 18; i += 1) {
    const sparkle = document.createElement('i');
    sparkle.className = 'click-sparkle';
    sparkle.textContent = i % 3 === 0 ? '✦' : '·';
    sparkle.style.left = `${x + (Math.random() - 0.5) * 90}px`;
    sparkle.style.top = `${y + (Math.random() - 0.5) * 65}px`;
    sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 150}px`);
    sparkle.style.setProperty('--dy', `${-40 - Math.random() * 100}px`);
    galaxy.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1200);
  }
}

function showMessage(text, x = galaxy.clientWidth / 2, y = galaxy.clientHeight / 2) {
  modalMessage.textContent = `“${text}”`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  burst(x, y);
}

flowers.forEach((flower, index) => {
  flower.addEventListener('click', (event) => {
    if (moved) return;
    current = index;
    const rect = galaxy.getBoundingClientRect();
    showMessage(flower.dataset.message, event.clientX - rect.left, event.clientY - rect.top);
  });
});

document.getElementById('surprise').addEventListener('click', () => {
  current = (current + 1) % messages.length;
  showMessage(messages[current]);
});

document.getElementById('another').addEventListener('click', () => {
  current = (current + 1) % messages.length;
  modalMessage.textContent = `“${messages[current]}”`;
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

galaxy.addEventListener('pointerdown', (event) => {
  if (event.target.closest('.flower')) return;
  dragging = true;
  moved = false;
  startX = event.clientX;
  startY = event.clientY;
  galaxy.setPointerCapture(event.pointerId);
});
galaxy.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  const dx = event.clientX - startX;
  const dy = event.clientY - startY;
  if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
  ry = Math.max(-34, Math.min(34, ry + dx * 0.13));
  rx = Math.max(-28, Math.min(20, rx - dy * 0.13));
  startX = event.clientX;
  startY = event.clientY;
  setTilt();
});
function stopDrag() { dragging = false; setTimeout(() => { moved = false; }, 50); }
galaxy.addEventListener('pointerup', stopDrag);
galaxy.addEventListener('pointercancel', stopDrag);
galaxy.addEventListener('pointerleave', stopDrag);

resizeCanvas();
setTilt();
window.addEventListener('resize', resizeCanvas);
requestAnimationFrame(renderSpace);
