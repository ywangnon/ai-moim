/* =========================================================
   AVENGERS: DOOMSDAY - 3D DOOM MASK PARALLAX CONTROLLER
========================================================= */

(function () {
  function initMask3D() {
    const stage = document.getElementById('doom-stage');
    const container = document.getElementById('doom-mask-container');
    if (!stage || !container) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    function onMouseMove(e) {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Limit max rotation angles
      targetRotateY = (x / (rect.width / 2)) * 22;
      targetRotateX = -(y / (rect.height / 2)) * 22;
    }

    function onMouseLeave() {
      targetRotateX = 0;
      targetRotateY = 0;
    }

    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('mouseleave', onMouseLeave);

    // Click interactive ripple
    container.addEventListener('click', (e) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX || rect.left + rect.width / 2;
      const clickY = e.clientY || rect.top + rect.height / 2;

      if (typeof window.triggerSparks === 'function') {
        const isStark = document.body.classList.contains('stark-mode');
        window.triggerSparks(clickX, clickY, isStark ? '#38bdf8' : '#10b981');
      }

      container.style.transform = `scale(0.92) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      setTimeout(() => {
        container.style.transform = `scale(1) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      }, 150);
    });

    // Smooth animation loop using lerp
    function updateTransform() {
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;

      container.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
      requestAnimationFrame(updateTransform);
    }
    requestAnimationFrame(updateTransform);
  }

  document.addEventListener('DOMContentLoaded', initMask3D);
})();

