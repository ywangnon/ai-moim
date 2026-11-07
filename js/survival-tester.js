/* =========================================================
   AVENGERS: DOOMSDAY - MULTIVERSE SURVIVAL TESTER
========================================================= */

(function () {
  const VERDICTS = [
    {
      minRate: 85,
      maxRate: 99,
      title: "👑 라트베리아 제국 최고 엘리트",
      desc: "닥터 둠의 총애를 받아 배틀월드 중심 요새의 핵심 장군으로 임명됩니다.",
      role: "지정 임무: 멀티버스 균열 감시 사령관"
    },
    {
      minRate: 65,
      maxRate: 84,
      title: "🛡️ 어벤져스 저항군 핵심 스트라이커",
      desc: "스타크의 나노 테크와 닥터 둠의 마법 사이에서 기적적인 생존 능력을 발휘합니다.",
      role: "지정 임무: 시공간 앵커 수호대"
    },
    {
      minRate: 40,
      maxRate: 64,
      title: "⚔️ 배틀월드 콜로세움 전사",
      desc: "수많은 차원의 빌런들과 싸우며 질긴 생명력으로 끝까지 살아남습니다.",
      role: "지정 임무: 인커전 방어선 보병"
    },
    {
      minRate: 15,
      maxRate: 39,
      title: "⚡ 타노스도 도망친 멀티버스 미아",
      desc: "시공간 붕괴에 휘말렸으나 기적적으로 TVA의 주황색 포탈을 발견해 탈출합니다.",
      role: "지정 임무: TVA 보이드 생존자"
    },
    {
      minRate: 1,
      maxRate: 14,
      title: "💀 둠봇의 나노 가루 변환형",
      desc: "영화 오프닝 5분 만에 닥터 둠의 카리스마 넘치는 등장 씬의 제물이 됩니다.",
      role: "지정 임무: 파멸의 증인"
    }
  ];

  let selectedHero = "아이언맨";

  function initSurvivalTester() {
    const avatarBtns = document.querySelectorAll('.hero-avatar-btn');
    const judgeBtn = document.getElementById('btn-judge-action');
    const resultBox = document.getElementById('judgment-result');
    const nicknameInput = document.getElementById('user-codename');
    const copyBtn = document.getElementById('btn-copy-ticket');

    avatarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        avatarBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedHero = btn.getAttribute('data-hero') || "히어로";
      });
    });

    if (judgeBtn) {
      judgeBtn.addEventListener('click', () => {
        const nickname = nicknameInput.value.trim() || "익명의 요원";

        // Seeded random calculation based on nickname
        let hash = 0;
        for (let i = 0; i < nickname.length; i++) {
          hash = (hash << 5) - hash + nickname.charCodeAt(i);
          hash |= 0;
        }
        const rate = Math.abs(hash % 98) + 1; // 1 to 99%

        const verdict = VERDICTS.find(v => rate >= v.minRate && rate <= v.maxRate) || VERDICTS[2];

        document.getElementById('ticket-user').textContent = nickname;
        document.getElementById('ticket-hero').textContent = selectedHero;
        document.getElementById('ticket-rate').textContent = `${rate}%`;
        document.getElementById('ticket-verdict').textContent = verdict.title;
        document.getElementById('ticket-desc').textContent = verdict.desc;
        document.getElementById('ticket-role').textContent = verdict.role;

        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (typeof window.triggerSparks === 'function') {
          const rect = resultBox.getBoundingClientRect();
          window.triggerSparks(rect.left + rect.width / 2, rect.top + 30, '#10b981');
        }
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const user = document.getElementById('ticket-user').textContent;
        const hero = document.getElementById('ticket-hero').textContent;
        const rate = document.getElementById('ticket-rate').textContent;
        const title = document.getElementById('ticket-verdict').textContent;
        const role = document.getElementById('ticket-role').textContent;

        const shareText = `[어벤져스: 둠스데이 멀티버스 생존자 판결]\n요원: ${user} (동행: ${hero})\n생존율: ${rate}\n판결: ${title}\n${role}\n2026. 12. 16 대한민국 극장 대개봉!`;

        navigator.clipboard.writeText(shareText).then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = '✅ 복사 완료!';
          setTimeout(() => {
            copyBtn.textContent = originalText;
          }, 2000);
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initSurvivalTester);
})();
