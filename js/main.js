/* =========================================================
   AVENGERS: DOOMSDAY - MAIN APPLICATION CONTROLLER
========================================================= */

(function () {
  function initApp() {
    console.log(
      "%c[AVENGERS: DOOMSDAY] %cKOREA RELEASE COUNTDOWN INITIALIZED: 2026.12.16",
      "color: #10b981; font-weight: bold; font-size: 14px;",
      "color: #38bdf8;"
    );

    // Summon Doombot Squadron across the sky
    const summonBtn = document.getElementById('btn-summon-doombot');
    const doombotLayer = document.getElementById('flying-doombot');

    if (summonBtn && doombotLayer) {
      summonBtn.addEventListener('click', () => {
        doombotLayer.classList.remove('fly');
        void doombotLayer.offsetWidth; // Trigger reflow
        doombotLayer.classList.add('fly');

        summonBtn.classList.add('active');
        setTimeout(() => {
          summonBtn.classList.remove('active');
        }, 10000);
      });
    }

    // Portal Alert toggle
    const alertBtn = document.getElementById('btn-portal-alert');
    if (alertBtn) {
      alertBtn.addEventListener('click', () => {
        alertBtn.classList.toggle('active');
        const isActive = alertBtn.classList.contains('active');
        const riftLayer = document.querySelector('.multiverse-rift-layer');
        if (riftLayer) {
          riftLayer.style.opacity = isActive ? '1' : '0.4';
          riftLayer.style.filter = isActive ? 'hue-rotate(90deg) contrast(1.4)' : 'none';
        }
        alertBtn.querySelector('span:last-child').textContent = isActive ? '위험 수준: 극대' : '위험 수준: 정상';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
