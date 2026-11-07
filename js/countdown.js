/* =========================================================
   AVENGERS: DOOMSDAY - COUNTDOWN ENGINE
   Target: 2026-12-16 00:00:00 KST (대한민국 전 세계 최초 개봉)
========================================================= */

(function () {
  // 2026년 12월 16일 한국 시간 00:00:00 (KST = UTC+9)
  const RELEASE_DATE = new Date('2026-12-16T00:00:00+09:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = RELEASE_DATE - now;

    const daysEl = document.getElementById('d-days');
    const hoursEl = document.getElementById('d-hours');
    const minsEl = document.getElementById('d-mins');
    const secsEl = document.getElementById('d-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      const badge = document.querySelector('.release-target-badge');
      if (badge) {
        badge.innerHTML = '⚡ <strong>NOW PLAYING</strong> IN THEATERS WORLDWIDE';
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  document.addEventListener('DOMContentLoaded', updateCountdown);
  window.updateCountdown = updateCountdown;
})();

