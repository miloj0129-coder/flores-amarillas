const quotes = [
  ['Si el universo fuera un jardín, tú serías mi flor favorita.', 'Desde un rincón lleno de luz'],
  ['No necesitas brillar como una estrella: ya eres el lugar donde nace la luz.', 'Para alguien muy especial'],
  ['Que tus días tengan pétalos, tus noches estrellas y tu corazón mucha calma.', 'Una señal amarilla'],
  ['Hay personas que son como el sol: llegan y hacen florecer todo a su alrededor.', 'El universo te lo quería decir'],
  ['Te mereces todas las flores que existen y un poquito más.', 'Con cariño, desde esta galaxia']
];
const quoteText = document.querySelector('#quoteText');
const quoteAuthor = document.querySelector('#quoteAuthor');
let quoteIndex = 0;
function newQuote() { const quote = quotes[quoteIndex]; quoteText.classList.add('changing'); setTimeout(() => { quoteText.textContent = `“${quote[0]}”`; quoteAuthor.textContent = `— ${quote[1]}`; quoteText.classList.remove('changing'); }, 180); quoteIndex = (quoteIndex + 1) % quotes.length; }
document.querySelector('#newQuote').addEventListener('click', newQuote);
setInterval(newQuote, 7000);

const system = document.querySelector('#planetSystem');
const scene = document.querySelector('#scene');
let dragging = false; let startX = 0; let startY = 0; let rotateX = -14; let rotateY = -24;
function movePlanet(x, y) { rotateY += (x - startX) * .35; rotateX -= (y - startY) * .2; rotateX = Math.max(-55, Math.min(35, rotateX)); startX=x; startY=y; system.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; }
scene.addEventListener('pointerdown', e => { dragging=true; startX=e.clientX; startY=e.clientY; scene.setPointerCapture(e.pointerId); });
scene.addEventListener('pointermove', e => { if(dragging) movePlanet(e.clientX,e.clientY); });
scene.addEventListener('pointerup', () => dragging=false); scene.addEventListener('pointercancel', () => dragging=false);
let autoRotate = true; setInterval(() => { if(autoRotate && !dragging) { rotateY += .13; system.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; } }, 30);

const modal = document.querySelector('#messageModal');
function toggleModal(open) { modal.classList.toggle('open', open); modal.setAttribute('aria-hidden', String(!open)); }
document.querySelector('#openMessage').addEventListener('click', () => toggleModal(true));
document.querySelector('#closeMessage').addEventListener('click', () => toggleModal(false));
modal.addEventListener('click', e => { if(e.target === modal) toggleModal(false); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') toggleModal(false); });

function createSparkles() { for(let i=0;i<18;i++){ const star=document.createElement('i'); star.className='spark'; star.textContent = i%3===0 ? '✦' : '·'; star.style.left=`${35+Math.random()*30}%`; star.style.top=`${30+Math.random()*35}%`; star.style.setProperty('--delay',`${Math.random()*1.8}s`); document.body.appendChild(star); setTimeout(()=>star.remove(),3000); } }
document.querySelector('#sparkButton').addEventListener('click', createSparkles); document.querySelector('#finalSpark').addEventListener('click', createSparkles); document.querySelector('#modalSpark').addEventListener('click', () => { createSparkles(); toggleModal(false); });
const glow = document.querySelector('#cursorGlow'); document.addEventListener('pointermove', e => { glow.style.left=`${e.clientX}px`; glow.style.top=`${e.clientY}px`; });
