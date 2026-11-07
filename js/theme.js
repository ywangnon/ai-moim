/* =========================================================
   AVENGERS: DOOMSDAY - THEME CONTROLLER (DOOM vs STARK)
========================================================= */

(function () {
  const THEME_STORAGE_KEY = 'doomsday_theme';

  function applyTheme(mode, persist = true) {
    const themeBtn = document.getElementById('btn-theme-toggle');
    const themeStatusText = document.getElementById('theme-status-text');
    const isStark = mode === 'stark';

    if (isStark) {
      document.body.classList.add('stark-mode');
      if (themeBtn) {
        themeBtn.setAttribute('aria-checked', 'true');
        themeBtn.setAttribute('aria-label', '라트베리아 둠 모드로 전환');
        themeBtn.setAttribute('title', '현재: 스타크 테크 (클릭하여 둠 모드로 전환)');
      }
      if (themeStatusText) {
        themeStatusText.textContent = '스타크 테크';
      }
    } else {
      document.body.classList.remove('stark-mode');
      if (themeBtn) {
        themeBtn.setAttribute('aria-checked', 'false');
        themeBtn.setAttribute('aria-label', '스타크 테크 모드로 전환');
        themeBtn.setAttribute('title', '현재: 라트베리아 둠 (클릭하여 스타크 모드로 전환)');
      }
      if (themeStatusText) {
        themeStatusText.textContent = '라트베리아 둠';
      }
    }

    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      } catch (e) {
        console.warn('Storage error:', e);
      }
    }
  }

  function initTheme() {
    const themeBtn = document.getElementById('btn-theme-toggle');

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isCurrentStark = document.body.classList.contains('stark-mode');
        const nextTheme = isCurrentStark ? 'doom' : 'stark';
        applyTheme(nextTheme, true);

        // Celebration Sparkles on switch
        if (typeof window.triggerSparks === 'function') {
          const rect = themeBtn.getBoundingClientRect();
          window.triggerSparks(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            nextTheme === 'stark' ? '#38bdf8' : '#10b981'
          );
        }
      });
    }

    let saved = null;
    try {
      saved = localStorage.getItem(THEME_STORAGE_KEY);
    } catch (e) {}

    if (saved === 'stark' || saved === 'doom') {
      applyTheme(saved, false);
    } else {
      applyTheme('doom', false); // Default to Doctor Doom
    }
  }

  document.addEventListener('DOMContentLoaded', initTheme);
  window.applyTheme = applyTheme;
})();

