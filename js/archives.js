/* =========================================================
   AVENGERS: DOOMSDAY - CLASSIFIED BATTLEWORLD ARCHIVES
========================================================= */

(function () {
  const DOSSIER_DATA = [
    {
      dDay: "D-39",
      tag: "CLASSIFIED #01",
      icon: "🎭",
      title: "로버트 다우니 주니어의 전격 귀환",
      short: "토니 스타크의 얼굴을 한 빅터 폰 둠",
      full: "MCU의 시작이자 영원한 아이언맨이었던 로버트 다우니 주니어가 마블 역사상 가장 강력하고 입체적인 빌런 '닥터 둠(Doctor Doom / Victor von Doom)'으로 돌아옵니다. 루소 형제는 '같은 가면을 쓰는 새로운 과업(New mask, same task)'이라는 키워드로 멀티버스를 관통하는 충격적인 서사를 예고했습니다."
    },
    {
      dDay: "D-35",
      tag: "CLASSIFIED #02",
      icon: "🎬",
      title: "루소 형제(Russo Brothers)의 복귀",
      short: "인피니티 워 & 엔드게임의 신화 재현",
      full: "조 루소와 앤서니 루소 감독이 '어벤져스: 둠스데이'와 '어벤져스: 시크릿 워즈'의 메가폰을 다시 잡았습니다. 마블 역사상 가장 거대한 스케일의 멀티버스 대서사시를 조율할 적임자로, 전 세계 영화 팬들의 기대를 한몸에 받고 있습니다."
    },
    {
      dDay: "D-30",
      tag: "CLASSIFIED #03",
      icon: "🌌",
      title: "인커전(Incursion) 현상의 절정",
      short: "서로 다른 두 우주가 정면 충돌하다",
      full: "멀티버스의 경계가 무너지며 두 차원의 지구가 서로를 향해 충돌하는 '인커전' 현상이 최고조에 달합니다. 하나의 우주가 파괴되어야만 다른 우주가 생존할 수 있는 잔인한 딜레마 속에서, 닥터 둠의 파멸적인 해결책이 시작됩니다."
    },
    {
      dDay: "D-25",
      tag: "CLASSIFIED #04",
      icon: "🏰",
      title: "배틀월드(Battleworld)의 탄생",
      short: "멸망한 멀티버스 조각들로 세운 제국",
      full: "모든 차원이 붕괴된 후 남은 잔해들을 모아 닥터 둠이 창조한 모자이크 행성 '배틀월드'. 각 차원의 영웅과 악당들이 뒤섞여 닥터 둠의 절대 권력 아래 목숨을 건 생존 전쟁을 벌이게 됩니다."
    },
    {
      dDay: "D-20",
      tag: "CLASSIFIED #05",
      icon: "4️⃣",
      title: "판타스틱 4와의 숙명적 격돌",
      short: "미스터 판타스틱 vs 빅터 폰 둠",
      full: "1960년대 레트로 퓨처 감성의 지구에서 온 '판타스틱 4: 퍼스트 스텝스' 팀이 메인 타임라인으로 합류합니다. 리드 리처즈(미스터 판타스틱)와 닥터 둠 사이의 지성과 자존심을 건 세기의 대결이 스크린에 펼쳐집니다."
    },
    {
      dDay: "D-15",
      tag: "CLASSIFIED #06",
      icon: "🐺",
      title: "뮤턴트 & X-맨의 전면전 합류",
      short: "울버린과 데드풀, 엑스맨의 참전",
      full: "'데드풀과 울버린'을 통해 문이 열린 폭스 유니버스의 뮤턴트들이 마침내 어벤져스와 함께 전선에 섭니다. 과거 영화 시리즈의 반가운 레전드 캐릭터들이 대거 깜짝 등장할 예정입니다."
    },
    {
      dDay: "D-10",
      tag: "CLASSIFIED #07",
      icon: "⚡",
      title: "마법과 과학의 결합: 둠의 슈트",
      short: "티타늄 나노 아머와 에메랄드 룬",
      full: "닥터 둠의 슈트는 단순한 기술력의 산물이 아닙니다. 토니 스타크의 최첨단 기계 공학과 닥터 스트레인지에 필적하는 고대 흑마법이 결합된 하이브리드 아머로, 어떤 슈퍼파워도 흡수하여 무력화합니다."
    },
    {
      dDay: "D-05",
      tag: "CLASSIFIED #08",
      icon: "🇰🇷",
      title: "대한민국 전 세계 최초 개봉!",
      short: "2026년 12월 16일 수요일 대개봉",
      full: "한국은 전통적인 마블 블록버스터의 최대 흥행 전략 거점으로, 북미 개봉일(12월 18일)보다 이틀 빠른 12월 16일 전 세계 최초로 극장에 걸립니다. 스포일러 없이 전 세계에서 가장 먼저 결말을 목격할 수 있습니다."
    },
    {
      dDay: "D-03",
      tag: "CLASSIFIED #09",
      icon: "🔮",
      title: "시크릿 워즈(Secret Wars)로의 연결",
      short: "마블 페이즈 6의 거대한 클라이맥스",
      full: "둠스데이는 단순한 단독 영화가 아닙니다. 2027년 개봉할 '어벤져스: 시크릿 워즈'와 직결되는 2부작 프로젝트의 전반부로, 영화의 마지막 장면은 전 세계 극장가를 충격의 도가니로 몰아넣을 것입니다."
    },
    {
      dDay: "D-DAY",
      tag: "FINAL TARGET",
      icon: "👑",
      title: "AVENGERS: DOOMSDAY 대개봉",
      short: "모든 차원이 하나로 격돌한다",
      full: "드디어 기다려온 파멸과 구원의 날! 지금 바로 전국 극장에서 아이맥스, 4DX, 돌비 시네마로 차원이 다른 전율을 경험하세요."
    }
  ];

  function initArchives() {
    const grid = document.getElementById('archive-grid');
    const modal = document.getElementById('archive-modal');
    const modalClose = document.getElementById('modal-close-btn');
    if (!grid || !modal) return;

    grid.innerHTML = '';

    DOSSIER_DATA.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'archive-dossier';
      const isFinal = index === DOSSIER_DATA.length - 1;

      card.innerHTML = `
        <div class="archive-card-inner">
          <div class="archive-front ${isFinal ? 'd-day-final' : ''}">
            <span class="archive-badge-tag">${item.tag}</span>
            <div class="archive-d-day">${item.dDay}</div>
            <div class="archive-topic">${item.short}</div>
          </div>
          <div class="archive-back">
            <div class="archive-back-icon">${item.icon}</div>
            <div class="archive-back-text">${item.title}</div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        card.classList.toggle('opened');

        // Open modal
        document.getElementById('modal-icon').textContent = item.icon;
        document.getElementById('modal-tag').textContent = `${item.dDay} • ${item.tag}`;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-message').textContent = item.full;

        modal.classList.add('show');

        if (typeof window.triggerSparks === 'function') {
          const rect = card.getBoundingClientRect();
          window.triggerSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, '#10b981');
        }
      });

      grid.appendChild(card);
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initArchives);
})();

