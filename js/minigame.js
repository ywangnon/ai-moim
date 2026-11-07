/* =========================================================
   AVENGERS: DOOMSDAY - INCURSION PORTAL DEFENSE MINI-GAME
========================================================= */

(function () {
  let canvas, ctx;
  let gameRunning = false;
  let score = 0;
  let timeLeft = 30;
  let gameLoopId = null;
  let timerInterval = null;
  let targets = [];

  const TARGET_TYPES = [
    { emoji: "🤖", points: 100, radius: 24, speed: 2.2 },
    { emoji: "🌀", points: 150, radius: 26, speed: 1.8 },
    { emoji: "💎", points: 250, radius: 22, speed: 2.8 },
    { emoji: "⚡", points: 80, radius: 20, speed: 3.2 }
  ];

  function spawnTarget() {
    if (!gameRunning) return;
    const type = TARGET_TYPES[Math.floor(Math.random() * TARGET_TYPES.length)];
    targets.push({
      x: Math.random() * (canvas.width - 60) + 30,
      y: -30,
      radius: type.radius,
      speed: type.speed + Math.random() * 0.8,
      points: type.points,
      emoji: type.emoji
    });
  }

  function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = targets.length - 1; i >= 0; i--) {
      const t = targets[i];
      t.y += t.speed;

      // Draw target
      ctx.save();
      ctx.font = `${t.radius * 1.5}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t.emoji, t.x, t.y);
      ctx.restore();

      if (t.y > canvas.height + 40) {
        targets.splice(i, 1);
      }
    }

    if (gameRunning) {
      if (Math.random() < 0.05) spawnTarget();
      gameLoopId = requestAnimationFrame(updateGame);
    }
  }

  function handleHit(clientX, clientY) {
    if (!gameRunning) return;
    const rect = canvas.getBoundingClientRect();
    const hitX = clientX - rect.left;
    const hitY = clientY - rect.top;

    for (let i = targets.length - 1; i >= 0; i--) {
      const t = targets[i];
      const dist = Math.hypot(hitX - t.x, hitY - t.y);

      if (dist < t.radius * 1.5) {
        score += t.points;
        document.getElementById('game-score').textContent = score;

        if (typeof window.triggerSparks === 'function') {
          window.triggerSparks(clientX, clientY, '#10b981');
        }

        targets.splice(i, 1);
        break;
      }
    }
  }

  function startGame() {
    const overlay = document.getElementById('game-overlay');
    overlay.style.display = 'none';

    score = 0;
    timeLeft = 30;
    targets = [];
    gameRunning = true;

    document.getElementById('game-score').textContent = '0';
    document.getElementById('game-time').textContent = '30s';

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('game-time').textContent = `${timeLeft}s`;

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);

    updateGame();
  }

  function endGame() {
    gameRunning = false;
    clearInterval(timerInterval);
    cancelAnimationFrame(gameLoopId);

    const overlay = document.getElementById('game-overlay');
    overlay.style.display = 'flex';
    overlay.innerHTML = `
      <h3>방어 작전 완료!</h3>
      <p>최종 기록: <strong style="color:var(--latveria-gold); font-size:22px;">${score} Pts</strong><br>
      멀티버스 침공을 성공적으로 지연시켰습니다.</p>
      <button id="btn-game-restart" class="btn-judge" style="width: auto; padding: 12px 28px;">
        🔄 다시 도전하기
      </button>
    `;

    document.getElementById('btn-game-restart').addEventListener('click', startGame);
  }

  function initMinigame() {
    canvas = document.getElementById('game-canvas');
    const startBtn = document.getElementById('btn-game-start');
    if (!canvas || !startBtn) return;

    ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    startBtn.addEventListener('click', startGame);

    canvas.addEventListener('mousedown', (e) => handleHit(e.clientX, e.clientY));
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleHit(touch.clientX, touch.clientY);
    });
  }

  document.addEventListener('DOMContentLoaded', initMinigame);
})();

