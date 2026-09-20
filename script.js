const ambientHearts = document.getElementById('ambientHearts');
const heartIcons = ['♥', '♡', '❤', '✦'];

for (let i = 0; i < 22; i++) {
  const heart = document.createElement('span');
  heart.textContent = heartIcons[i % heartIcons.length];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 18}px`;
  heart.style.animationDuration = `${8 + Math.random() * 12}s`;
  heart.style.animationDelay = `${Math.random() * 4}s`;
  heart.style.opacity = (0.2 + Math.random() * 0.8).toFixed(2);
  ambientHearts.appendChild(heart);
}

const sceneParticles = document.querySelector('.scene-particles');
for (let i = 0; i < 120; i++) {
  const dot = document.createElement('span');
  dot.className = 'spark';
  const size = Math.random() * 5 + 2;
  const color = i % 3 === 0 ? 'rgba(255, 244, 155, 0.95)' : 'rgba(255,255,255,0.65)';
  dot.style.position = 'absolute';
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = '50%';
  dot.style.background = color;
  dot.style.boxShadow = `0 0 ${Math.random() * 12 + 6}px ${color}`;
  sceneParticles.appendChild(dot);
}
