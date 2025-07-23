// 1. Animated Navigation Underline
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const underline = document.createElement('div');
underline.style.position = 'absolute';
underline.style.height = '2px';
underline.style.background = 'linear-gradient(90deg, #6366F1, #F472B6)';
underline.style.transition = 'all 0.3s cubic-bezier(.4,2,.6,1)';
underline.style.borderRadius = '2px';
underline.style.pointerEvents = 'none';
underline.style.zIndex = '10';
let navBar = document.querySelector('.navbar-nav');
if (navBar) {
  navBar.style.position = 'relative';
  navBar.appendChild(underline);
  function moveUnderline(link) {
    const rect = link.getBoundingClientRect();
    const navRect = navBar.getBoundingClientRect();
    underline.style.width = rect.width + 'px';
    underline.style.left = (rect.left - navRect.left) + 'px';
    underline.style.top = (rect.bottom - navRect.top) + 2 + 'px';
    underline.style.opacity = 1;
  }
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveUnderline(link));
    link.addEventListener('focus', () => moveUnderline(link));
    link.addEventListener('mouseleave', () => underline.style.opacity = 0);
    link.addEventListener('blur', () => underline.style.opacity = 0);
    if (link.classList.contains('active')) moveUnderline(link);
  });
}

// 2. Hero Parallax/Floating Effect
const hero = document.querySelector('.hero-gradient, .bg-primary.text-white');
if (hero) {
  hero.addEventListener('mousemove', e => {
    const { width, height, left, top } = hero.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width * 20;
    const y = (e.clientY - top - height / 2) / height * 20;
    hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    const img = hero.querySelector('img');
    if (img) img.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px) scale(1.05)`;
  });
  hero.addEventListener('mouseleave', () => {
    hero.style.backgroundPosition = '';
    const img = hero.querySelector('img');
    if (img) img.style.transform = '';
  });
}

// 3. Card/Image Tilt on Mouse Move
function tiltCard(card) {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}
document.querySelectorAll('.card, .glass-card').forEach(tiltCard);

// 4. Button Ripple Effect
function addRipple(e) {
  const btn = e.currentTarget;
  let ripple = btn.querySelector('.ripple');
  if (ripple) ripple.remove();
  ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(99,102,241,0.18)';
  ripple.style.pointerEvents = 'none';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple-effect 0.6s linear';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.style.position = 'relative';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', addRipple);
});
// Add ripple effect keyframes
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `@keyframes ripple-effect { to { transform: scale(2.5); opacity: 0; } } .ripple { position: absolute; z-index: 2; pointer-events: none; }`;
document.head.appendChild(rippleStyle);

// 5. Section Reveal with Intersection Observer
const revealSections = document.querySelectorAll('section, .glass-card, .resume-item');
const observer = new window.IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, { threshold: 0.15 });
revealSections.forEach(section => {
  observer.observe(section);
});

// 6. Animated Particles in Hero Background
function createParticles(container, options = {}) {
  const particleCount = options.count || 36;
  const colors = options.colors || ['#6366F1', '#F472B6', '#fff'];
  const sizeRange = options.sizeRange || [2, 5];
  const speedRange = options.speedRange || [0.2, 0.7];
  const particles = [];
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 0;
  container.style.position = 'relative';
  container.prepend(canvas);
  function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      color: colors[Math.floor(Math.random() * colors.length)],
      dx: (Math.random() - 0.5) * speedRange[1],
      dy: (Math.random() - 0.5) * speedRange[1],
      alpha: Math.random() * 0.5 + 0.3
    });
  }
  function animate() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -p.r) p.x = canvas.width + p.r;
      if (p.x > canvas.width + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = canvas.height + p.r;
      if (p.y > canvas.height + p.r) p.y = -p.r;
    }
    requestAnimationFrame(animate);
  }
  animate();
}
const heroSection = document.querySelector('.hero-gradient, .bg-primary.text-white');
if (heroSection) {
  createParticles(heroSection, {
    count: 36,
    colors: ['#6366F1', '#F472B6', '#fff'],
    sizeRange: [2, 5],
    speedRange: [0.2, 0.7]
  });
} 