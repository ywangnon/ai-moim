/* =========================================================
   AVENGERS: DOOMSDAY - MULTIVERSE INCURSION & RUNE PARTICLES
========================================================= */

(function () {
  const canvas = document.getElementById('incursion-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const PARTICLE_COUNT = 75;
  const particles = [];

  class IncursionParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // initial spread
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.8 + 1.0;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8 - 0.2;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.angle += this.pulseSpeed;

      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    draw() {
      const isStark = document.body.classList.contains('stark-mode');
      const currentAlpha = Math.max(0.1, this.alpha + Math.sin(this.angle) * 0.2);

      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      if (isStark) {
        // Arc Blue & Gold Spurt
        ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
      } else {
        // Latveria Green & Incursion Purple
        if (Math.random() > 0.3) {
          ctx.fillStyle = `rgba(16, 185, 129, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
        } else {
          ctx.fillStyle = `rgba(168, 85, 247, ${currentAlpha * 0.85})`;
          ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
        }
      }

      ctx.shadowBlur = this.size > 2 ? 8 : 4;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new IncursionParticle());
  }

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(renderParticles);
  }
  requestAnimationFrame(renderParticles);

  // ---------------------------------------------------------
  // Confetti / Sparks Canvas Engine
  // ---------------------------------------------------------
  const sparkCanvas = document.getElementById('confetti-canvas');
  if (!sparkCanvas) return;
  const sCtx = sparkCanvas.getContext('2d');
  sparkCanvas.width = width;
  sparkCanvas.height = height;

  window.addEventListener('resize', () => {
    sparkCanvas.width = window.innerWidth;
    sparkCanvas.height = window.innerHeight;
  });

  const sparks = [];

  window.triggerSparks = function (originX, originY, baseColor = '#10b981') {
    const x = originX || window.innerWidth / 2;
    const y = originY || window.innerHeight / 2;

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: baseColor,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  };

  function renderSparks() {
    sCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.12; // gravity
      s.vx *= 0.98;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      sCtx.save();
      sCtx.beginPath();
      sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      sCtx.fillStyle = s.color;
      sCtx.globalAlpha = Math.max(0, s.alpha);
      sCtx.shadowColor = s.color;
      sCtx.shadowBlur = 6;
      sCtx.fill();
      sCtx.restore();
    }
    requestAnimationFrame(renderSparks);
  }
  requestAnimationFrame(renderSparks);
})();

