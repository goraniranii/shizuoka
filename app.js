/* 화면 기능은 여기에, 여행 내용 수정은 data.js에서! */
(() => {
  'use strict';
  const trip = window.TRIP_DATA;
  const mount = document.getElementById('app-content');
  const navItems = Array.from(document.querySelectorAll('.nav-item'));
  const STORE_KEY = 'shizuoka-trip-user-state-v1';
  const validViews = ['home', 'prep', ...trip.days.map(day => day.id)];

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      return { checked: raw.checked || {}, done: raw.done || {}, memo: raw.memo || {} };
    } catch (_) {
      return { checked: {}, done: {}, memo: {} };
    }
  }
  const state = loadState();
  let currentView = 'home';
  let toastTimer;

  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (_) { showToast('저장 공간을 사용할 수 없어요.'); }
  }
  function e(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function icon(name) { return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`; }
  function externalUrl(url) {
    try {
      const obj = new URL(url, window.location.href);
      return /^https?:$/.test(obj.protocol) ? e(obj.href) : '';
    } catch (_) { return ''; }
  }
  function mapUrl(item) {
    return item.mapUrl || (item.mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}` : '');
  }
  function link(url, label, className, iconName = 'arrow-up-right') {
    const href = externalUrl(url);
    if (!href) return '';
    return `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${icon(iconName)}${e(label)}</a>`;
  }
  function localDateISO() {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const get = type => parts.find(x => x.type === type).value;
    return `${get('year')}-${get('month')}-${get('day')}`;
  }
  function dateNum(iso) { return Date.parse(`${iso}T00:00:00Z`); }
  function dateCounter() {
    const today = localDateISO();
    const diff = Math.round((dateNum(trip.meta.startDate) - dateNum(today)) / 86400000);
    if (diff > 0) return `D-${diff}`;
    if (today <= trip.meta.endDate) return 'ON THE TRIP ✦';
    return 'OUR MEMORIES ✦';
  }
  function completedCount() {
    return [...trip.before, ...trip.packing].filter(item => !!state.checked[item.id]).length;
  }
  function sectionHeading(kicker, title, aside = '') {
    return `<div class="section-head"><div><div class="section-kicker">${e(kicker)}</div><h2>${e(title)}</h2></div>${aside ? `<small>${e(aside)}</small>` : ''}</div>`;
  }
  function hotelCard() {
    const hotel = trip.hotel;
    return `<div class="hotel-card">
      <div class="hotel-top"><div class="hotel-icon">${icon('home')}</div><div><div class="hotel-title">${e(hotel.name)}</div><div class="hotel-en">${e(hotel.enName)}</div></div></div>
      <div class="hotel-grid"><div><span>CHECK-IN</span><strong>${e(hotel.checkIn)}</strong></div><div><span>CHECK-OUT</span><strong>${e(hotel.checkOut)}</strong></div></div>
      <div class="address">${icon('map-pin')}<span>${e(hotel.address)}</span></div>
      <p class="hotel-details">${e(hotel.access)}<br>${e(hotel.note)}</p>
      <div class="action-row">
        ${link(hotel.mapUrl, '지도 열기', 'action-link action-primary', 'map-pin')}
        <button class="action-btn" type="button" data-copy="address">${icon('copy')}주소 복사</button>
        <a class="action-link" href="tel:${e(hotel.phone.replace(/[^+0-9]/g, ''))}">${icon('phone')}전화하기</a>
      </div>
    </div>`;
  }
  function notice() { return `<p class="notice">${icon('clock')}${e(trip.notice)}</p>`; }
  function renderHome() {
    const selected = trip.days.find(d => d.date === localDateISO());
    const checklistTotal = trip.before.length + trip.packing.length;
    return `<section class="hero">
      <div class="hero-visual"><span class="hero-coordinates">35° N · 138° E</span><span class="hero-jp">富士山</span><span class="hero-caption">THE BLUE DAYS OF DECEMBER</span></div>
      <div class="hero-body"><p class="eyebrow">SHIZUOKA · WINTER 2026</p><h1 class="hero-title">겨울의 시즈오카<em>.</em></h1><p class="hero-subtitle">${e(trip.meta.subtitle)}</p><div class="hero-footer"><span class="hero-date">${e(trip.meta.dateDisplay)}</span><span class="hero-count">2 NIGHTS · 3 DAYS</span></div></div>
    </section>
    <div class="content-pad">
      <div class="intro"><div class="intro-mark">${icon('sun')}</div><div><strong>우리의 2박 3일 여행 노트</strong><p>오늘의 일정, 지도, 준비물까지 한 곳에서 확인하기.</p></div></div>
      ${selected ? `<section class="section-block"><button class="to-next" type="button" data-view="${e(selected.id)}"><span><small>IT'S OUR TRAVEL DAY</small><strong>오늘 일정 바로 보기 · ${e(selected.title)}</strong></span>${icon('chevron')}</button></section>` : ''}
      <section class="section-block">${sectionHeading('ITINERARY', '날짜별 일정', 'DECEMBER 2026')}
        <div class="day-preview-list">${trip.days.map(day => `<button type="button" class="day-preview" data-view="${e(day.id)}"><span class="day-preview-num">${e(day.number)}</span><span class="day-preview-content"><span class="day-preview-date">${e(day.dateLabel)}</span><span class="day-preview-title" style="display:block">${e(day.title)}</span><span class="day-preview-sub">${e(day.highlights.join(' · '))}</span></span>${icon('chevron')}</button>`).join('')}</div>
      </section>
      <section class="section-block">${sectionHeading('OUR STAY', '숙소 정보')}${hotelCard()}</section>
      <section class="section-block">${sectionHeading('QUICK ACCESS', '여행 중 바로가기')}
        <div class="quick-info"><button type="button" data-view="prep">${icon('suitcase')}<strong>준비물 체크</strong><span>${completedCount()} / ${checklistTotal}개 완료</span></button><button type="button" data-view="day3">${icon('calendar')}<strong>귀국일 공항버스</strong><span>12/12 · 15:35 · 북쪽 14번</span></button></div>
      </section>${notice()}
    </div>`;
  }
  function renderChecklist(items) {
    return `<div class="checklist-card">${items.map(item => {
      const checked = !!state.checked[item.id];
      return `<div class="check-row ${checked ? 'done' : ''}">
        <button type="button" class="check-toggle" aria-label="${e(item.title)} ${checked ? '체크 해제' : '완료 체크'}" aria-pressed="${checked}" data-check="${e(item.id)}">${icon('check')}</button>
        <div class="check-copy"><div class="check-row-title">${e(item.title)}</div>${item.detail ? `<div class="check-row-detail">${e(item.detail)}</div>` : ''}${item.url ? link(item.url, item.linkLabel || '사이트 열기', 'text-link', 'arrow-up-right') : ''}</div>
      </div>`;
    }).join('')}</div>`;
  }
  function renderPrep() {
    const total = trip.before.length + trip.packing.length;
    const complete = completedCount();
    const percentage = total ? Math.round(complete / total * 100) : 0;
    return `<header class="page-heading prep-heading"><p class="eyebrow">BEFORE WE GO</p><h1>여행 준비,<br>하나씩 체크해요.</h1><p>챙긴 항목은 체크! 휴대폰에 자동으로 저장돼요.</p></header>
      <div class="content-pad"><div class="progress-panel"><div class="progress-numbers"><strong>전체 준비 현황</strong><span>${complete} <small style="font-size:12px">/ ${total}</small></span></div><div class="progress-track" role="progressbar" aria-label="준비 완료율" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}"><div class="progress-bar" style="width:${percentage}%"></div></div><p class="progress-hint">${percentage === 100 ? '준비 완료! 이제 즐겁게 다녀와요 ✨' : `${percentage}% 완료 · 차근차근 준비하고 있어요`}</p></div>
      <section class="section-block" style="margin-top:0">${sectionHeading('CHECKLIST 01', '출발 전 체크리스트', `${trip.before.length} ITEMS`)}${renderChecklist(trip.before)}</section>
      <section class="section-block">${sectionHeading('CHECKLIST 02', '개인 준비물', `${trip.packing.length} ITEMS`)}<div class="muted-note">${icon('suitcase')}<span>${e(trip.packingNote)}</span></div>${renderChecklist(trip.packing)}</section>
      <button class="reset-btn" type="button" data-reset="checklist">${icon('refresh')}체크리스트 전체 초기화</button>${notice()}</div>`;
  }
  function renderEvent(item) {
    const completed = !!state.done[item.id];
    const links = [];
    const placeUrl = mapUrl(item);
    if (placeUrl) links.push(link(placeUrl, '지도 보기', 'stop-link', 'map-pin'));
    if (item.links) for (const extra of item.links) links.push(link(extra.url, extra.label, 'stop-link', 'external'));
    return `<div class="timeline-item ${item.important ? 'important' : ''} ${completed ? 'done' : ''}">
      <div class="timeline-time">${e(item.time)}</div>
      <div class="timeline-content"><article class="stop-card ${item.important ? 'important' : ''}">
        <div class="stop-top"><div class="stop-main"><div class="category ${item.important ? 'important' : ''}">${e(item.category || '일정')}</div><h3 class="stop-title">${e(item.title)}</h3></div><button type="button" class="done-stop" data-stop="${e(item.id)}" aria-label="${e(item.title)} ${completed ? '방문 완료 해제' : '방문 완료 표시'}" aria-pressed="${completed}">${icon('check')}</button></div>
        ${item.notes && item.notes.length ? `<ul class="notes">${item.notes.map(note => `<li>${e(note)}</li>`).join('')}</ul>` : ''}
        ${links.filter(Boolean).length ? `<div class="stop-links">${links.join('')}</div>` : ''}
      </article></div>
    </div>`;
  }
  function renderDay(day) {
    const total = day.items.length;
    const done = day.items.filter(item => !!state.done[item.id]).length;
    const nextDay = trip.days[trip.days.indexOf(day) + 1];
    return `<header class="page-heading"><p class="eyebrow">DAY ${e(day.number)} · ${e(day.dateLabel)}</p><h1>${e(day.title)}</h1><p>${e(day.subtitle)}</p><div class="day-hero-bottom"><span class="day-label">Day ${e(day.number)}</span><span class="day-date">${e(day.weekday)} · ${e(day.date.slice(0,4))}</span></div></header>
      <div class="content-pad"><div class="tags">${day.highlights.map(tag => `<span class="tag"># ${e(tag)}</span>`).join('')}</div>
      <section class="section-block">${sectionHeading('TODAY’S ROUTE', '오늘의 여정', `${done} / ${total} 완료`)}<div class="timeline">${day.items.map(renderEvent).join('')}</div></section>
      <section class="memo-card"><div class="memo-heading"><strong>${icon('note')} 나의 여행 메모</strong><span>자동 저장 · 이 기기만</span></div><textarea rows="3" data-memo="${e(day.id)}" aria-label="${e(day.number)}일차 개인 메모" placeholder="기억하고 싶은 장소, 사고 싶은 것, 바뀐 일정 등을 적어봐요.">${e(state.memo[day.id] || '')}</textarea></section>
      ${nextDay ? `<button type="button" class="to-next" data-view="${e(nextDay.id)}"><span><small>NEXT JOURNEY · DAY ${e(nextDay.number)}</small><strong>${e(nextDay.title)}</strong></span>${icon('chevron')}</button>` : `<button type="button" class="to-next" data-view="home"><span><small>BACK TO OUR JOURNAL</small><strong>여행 노트 첫 화면으로</strong></span>${icon('chevron')}</button>`}
      ${notice()}</div>`;
  }
  function getViewFromHash() {
    const requested = decodeURIComponent(window.location.hash.slice(1));
    return validViews.includes(requested) ? requested : 'home';
  }
  function render(view = getViewFromHash(), moveTop = false) {
    if (!validViews.includes(view)) view = 'home';
    currentView = view;
    mount.innerHTML = view === 'home' ? renderHome() : view === 'prep' ? renderPrep() : renderDay(trip.days.find(d => d.id === view));
    navItems.forEach(item => {
      const active = item.dataset.view === view;
      item.classList.toggle('is-active', active);
      if (active) item.setAttribute('aria-current', 'page'); else item.removeAttribute('aria-current');
    });
    document.getElementById('day-counter').textContent = dateCounter();
    if (moveTop) window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function navigate(view) {
    if (!validViews.includes(view)) return;
    if (window.location.hash !== `#${view}`) history.pushState(null, '', `#${view}`);
    render(view, true);
  }
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }
  async function copyAddress() {
    try { await navigator.clipboard.writeText(trip.hotel.address); showToast('호텔 주소를 복사했어요!'); }
    catch (_) { showToast('주소를 길게 눌러 복사해 주세요.'); }
  }
  document.addEventListener('click', event => {
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) return navigate(viewButton.dataset.view);
    const checkButton = event.target.closest('[data-check]');
    if (checkButton) {
      const id = checkButton.dataset.check;
      state.checked[id] = !state.checked[id];
      saveState();
      render(currentView);
      return;
    }
    const stopButton = event.target.closest('[data-stop]');
    if (stopButton) {
      const id = stopButton.dataset.stop;
      state.done[id] = !state.done[id];
      saveState();
      render(currentView);
      return;
    }
    if (event.target.closest('[data-copy="address"]')) return void copyAddress();
    if (event.target.closest('[data-reset="checklist"]')) {
      if (window.confirm('출발 전 체크리스트를 모두 초기화할까요?')) {
        state.checked = {};
        saveState();
        render(currentView);
        showToast('체크리스트를 초기화했어요.');
      }
    }
  });
  document.addEventListener('input', event => {
    if (event.target.matches('[data-memo]')) {
      state.memo[event.target.dataset.memo] = event.target.value;
      saveState();
    }
  });
  window.addEventListener('popstate', () => render(getViewFromHash(), true));
  window.addEventListener('hashchange', () => render(getViewFromHash(), true));
  render();
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
