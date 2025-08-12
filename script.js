
(() => {
 
  const courses = [
    { id: 1, title: 'React for Beginners', category: 'Frontend', price: 25, duration: '6h', rating: 4.6, students: 1200, desc: 'Build modern UIs with React hooks and functional components.', tag: 'Popular', image: 'react.jpeg' },
    { id: 2, title: 'Advanced Node.js', category: 'Backend', price: 35, duration: '8h', rating: 4.7, students: 800, desc: 'Deep dive into Node, streams, clusters and performance.', tag: 'New', image: 'node.jpeg' },
    { id: 3, title: 'UI/UX Principles', category: 'Design', price: 18, duration: '4h', rating: 4.4, students: 600, desc: 'Design better interfaces and simple user flows.', tag: '', image: 'design.jpeg' },
    { id: 4, title: 'Python for Data Science', category: 'Data', price: 45, duration: '12h', rating: 4.8, students: 1500, desc: 'NumPy, pandas, visualization, intro to ML.', tag: 'Top Rated', image: 'DataScience.jpeg' },
    { id: 5, title: 'TypeScript Essentials', category: 'Frontend', price: 20, duration: '5h', rating: 4.5, students: 450, desc: 'Types, generics and safer JS at scale.', tag: '', image: 'type.png' },
    { id: 6, title: 'REST API Design', category: 'Backend', price: 15, duration: '3.5h', rating: 4.2, students: 320, desc: 'Designing clear RESTful APIs, versioning and security.', tag: '', image: 'restapi.jpeg' },
    { id: 7, title: 'Data Visualization with D3', category: 'Data', price: 29, duration: '7h', rating: 4.3, students: 210, desc: 'Create interactive visualizations for the web.', tag: '', image: 'data.png' },
    { id: 8, title: 'CSS Layout Mastery', category: 'Frontend', price: 12, duration: '3h', rating: 4.1, students: 730, desc: 'Grid, flexbox, and responsive strategies.', tag: 'Popular', image: 'css.png' },
    { id: 9, title: 'Next.js in Practice', category: 'Frontend', price: 30, duration: '7h', rating: 4.6, students: 540, desc: 'Build fast React apps with routing, data fetching, and deployment.', tag: 'New', image: 'react.jpeg' },
    { id: 10, title: 'GraphQL Fundamentals', category: 'Backend', price: 22, duration: '4.5h', rating: 4.3, students: 390, desc: 'Design schemas, resolvers and queries for modern APIs.', tag: '', image: 'RestApi.jpeg' },
    { id: 11, title: 'PostgreSQL for Developers', category: 'Backend', price: 18, duration: '5h', rating: 4.2, students: 610, desc: 'Indexes, joins, transactions and performance tips.', tag: '', image: 'data.png' },
    { id: 12, title: 'Machine Learning Basics', category: 'Data', price: 0, duration: '10h', rating: 4.7, students: 2400, desc: 'Core ML concepts with hands-on Python notebooks.', tag: 'Free', image: 'datascience.jpeg' },
    { id: 13, title: 'Tailwind CSS Crash Course', category: 'Frontend', price: 14, duration: '2.5h', rating: 4.4, students: 860, desc: 'Rapid UI building with utility-first CSS.', tag: '', image: 'css.png' },
    { id: 14, title: 'Clean Architecture for APIs', category: 'Backend', price: 28, duration: '6h', rating: 4.5, students: 330, desc: 'Layered design, DTOs, testing, and maintainability.', tag: 'Top Rated', image: 'restapi.jpeg' },
    { id: 15, title: 'Product Design Workflow', category: 'Design', price: 26, duration: '5.5h', rating: 4.3, students: 420, desc: 'From research to wireframes to high-fidelity handoff.', tag: '', image: 'design.jpeg' },
    { id: 16, title: 'Pandas Deep Dive', category: 'Data', price: 19, duration: '6h', rating: 4.4, students: 510, desc: 'Advanced data wrangling, grouping, merging and IO.', tag: '', image: 'data.png' },
    { id: 17, title: 'TypeScript + React Patterns', category: 'Frontend', price: 32, duration: '7h', rating: 4.6, students: 780, desc: 'Hooks with strong types, generics and common patterns.', tag: 'Popular', image: 'type.png' },
    { id: 18, title: 'Node.js Performance Tuning', category: 'Backend', price: 27, duration: '4h', rating: 4.5, students: 350, desc: 'Profiling, clustering, and memory management in Node.', tag: '', image: 'node.jpeg' }
  ];

  const grid = document.getElementById('coursesGrid');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const sortSelect = document.getElementById('sortSelect');
  const favToggle = document.getElementById('favToggle');
  const resultCount = document.getElementById('resultCount');
  const clearFiltersBtn = document.getElementById('clearFilters');
  const noResults = document.getElementById('noResults');

  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const yearEl = document.getElementById('year');

  const favoritesKey = 'cb:favorites';
  const favorites = new Set(loadFavorites());
  function loadFavorites(){ try{ const r = localStorage.getItem(favoritesKey); return r? JSON.parse(r): []; } catch { return []; } }
  
  const themeKey = 'cb:theme';
  const root = document.documentElement;
  function applyTheme(theme){ root.setAttribute('data-theme', theme); themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙'; }
  function initTheme(){ const saved = localStorage.getItem(themeKey) || 'light'; applyTheme(saved); }
  function toggleTheme(){ const curr = root.getAttribute('data-theme') || 'light'; const next = curr==='dark'?'light':'dark'; applyTheme(next); localStorage.setItem(themeKey, next); }

  const hintId = 'searchHint';
  let hintEl = document.getElementById(hintId);
  if (!hintEl){
    hintEl = document.createElement('div');
    hintEl.id = hintId;
    hintEl.className = 'field-hint';
    hintEl.setAttribute('role','status');
    hintEl.setAttribute('aria-live','polite');
    hintEl.hidden = true;
   
    searchInput.insertAdjacentElement('afterend', hintEl);
  }
  searchInput.setAttribute('aria-describedby', hintId);

  function setSearchInvalid(msg){
    searchInput.setAttribute('aria-invalid','true');
    hintEl.textContent = msg;
    hintEl.hidden = false;
  }
  function clearSearchInvalid(){
    searchInput.removeAttribute('aria-invalid');
    hintEl.hidden = true;
    hintEl.textContent = '';
  }
  function formatPrice(p){ return p === 0 ? 'Free' : `₹${p}`; }
  function escapeHtml(text){ const map={ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#039;' }; return String(text).replace(/[&<>"']/g,m=>map[m]); }

  function createCard(course){
    const el = document.createElement('article');
    el.className = 'card';
    el.tabIndex = 0;
    el.setAttribute('role','article');
    el.innerHTML = `
      ${course.tag ? `<span class="corner-tag">${escapeHtml(course.tag)}</span>` : ''}
      <button class="fav-btn" aria-label="Favorite" data-id="${course.id}" data-active="${favorites.has(course.id)}">❤</button>
      <div class="thumb"><img src="${course.image}" alt="${escapeHtml(course.title)} thumbnail"></div>
      <h3>${escapeHtml(course.title)}</h3>
      <p class="desc">${escapeHtml(course.desc)}</p>
      <div class="meta">
        <div>
          <div class="badge">${formatPrice(course.price)}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:6px">${course.duration} • ${course.rating} ★ • ${course.students} students</div>
        </div>
        <div class="actions">
          <button class="quick" data-id="${course.id}" title="Quick view">Quick view</button>
          <button class="enroll" data-id="${course.id}" title="Enroll">Enroll</button>
        </div>
      </div>`;
    el.querySelector('.quick').addEventListener('click', (e)=>{ e.stopPropagation(); openModal(course); });
    el.querySelector('.enroll').addEventListener('click', (e)=>{ e.stopPropagation(); alert(`Enrolled in "${course.title}" — demo action`); });
    el.querySelector('.fav-btn').addEventListener('click', (e)=>{ e.stopPropagation(); toggleFavorite(course.id, e.currentTarget); });
    el.addEventListener('keydown', (ev)=>{ if (ev.key==='Enter') openModal(course); });
    return el;
  }

  function toggleFavorite(id, btn){ if (favorites.has(id)) favorites.delete(id); else favorites.add(id); saveFavorites(); if (btn) btn.setAttribute('data-active', favorites.has(id)); if (favToggle.checked) applyFilters(); }

  function renderCourses(list){
    grid.innerHTML = '';
    if (!list.length){
      resultCount.textContent = '0 results';
      noResults.hidden = false;
      return;
    }
    noResults.hidden = true;
    resultCount.textContent = `${list.length} result${list.length>1?'s':''}`;
    const frag = document.createDocumentFragment();
    list.forEach(c => frag.appendChild(createCard(c)));
    grid.appendChild(frag);
  }

  function applyFilters(){
    const raw = searchInput.value || '';
    const q = raw.length >= 2 ? raw.trim().toLowerCase() : '';
    const cat = categorySelect.value;
    const sort = sortSelect.value;
    const favOnly = !!favToggle.checked;

    let out = courses.filter(c => {
      const matchesQ = !q || (c.title + ' ' + c.desc + ' ' + c.category).toLowerCase().includes(q);
      const matchesCat = !cat || c.category === cat;
      const matchesFav = !favOnly || favorites.has(c.id);
      return matchesQ && matchesCat && matchesFav;
    });

    switch (sort){
      case 'new': out = out.slice().sort((a,b)=> b.id - a.id); break;
      case 'price-asc': out = out.slice().sort((a,b)=> a.price - b.price); break;
      case 'price-desc': out = out.slice().sort((a,b)=> b.price - a.price); break;
      default: out = out.slice().sort((a,b)=> b.rating - a.rating);
    }

    renderCourses(out);
  }

  function openModal(course){
    modal.setAttribute('aria-hidden','false');
    modalContent.innerHTML = `
      <h3>${escapeHtml(course.title)}</h3>
      <p style="color:var(--muted)">${escapeHtml(course.category)} • ${course.duration} • ${course.rating} ★</p>
      <img src="${course.image}" alt="${escapeHtml(course.title)} image" style="width:100%;max-height:260px;object-fit:cover;border-radius:10px;margin:10px 0" />
      <p style="margin-top:12px">${escapeHtml(course.desc)}</p>
      <div style="margin-top:18px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <strong style="font-size:18px">${formatPrice(course.price)}</strong>
        <button id="enrollNow" style="padding:8px 12px;border-radius:10px;border:0;background:var(--accent);color:var(--accent-contrast);font-weight:600;cursor:pointer">Enroll</button>
        <button id="favNow" style="padding:8px 12px;border-radius:10px;border:1px solid rgba(226,61,108,.4);background:transparent;color:#e23d6c;font-weight:700;cursor:pointer">❤ Favorite</button>
      </div>`;
    document.getElementById('enrollNow').addEventListener('click', ()=>{ alert(`(Demo) Enrolled in "${course.title}"`); });
    document.getElementById('favNow').addEventListener('click', ()=>{ toggleFavorite(course.id); applyFilters(); });
    modalCloseBtn.focus();
  }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); modalContent.innerHTML = ''; }

  let searchTimeout = null;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const val = searchInput.value || '';
    if (val.length > 0 && val.length < 2){ setSearchInvalid('Type at least 2 characters to search'); }
    else { clearSearchInvalid(); }
    searchTimeout = setTimeout(applyFilters, 200);
  });
  categorySelect.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  favToggle.addEventListener('change', applyFilters);
  clearFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchInvalid();
    categorySelect.value = '';
    sortSelect.value = 'popular';
    favToggle.checked = false;
    applyFilters();
  });
  modalClose.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e)=>{ if (e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal(); });

  themeToggle.addEventListener('click', toggleTheme);
  if (menuToggle && mainNav){ menuToggle.addEventListener('click', ()=>{ const open = mainNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); }); }
  if (yearEl){ yearEl.textContent = String(new Date().getFullYear()); }

  initTheme();
  applyFilters();
})();


