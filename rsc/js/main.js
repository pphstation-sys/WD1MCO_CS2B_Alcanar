(function () {
  const LOGO = 'media/img/despicable-me-3-2.jpg';
  const DEVS = [                      
    'Dave Justin Alcanar',
    'Angel Mae Batin',
    'Jamilla Lucille Gagtan',
    'Kheryne Faith Gabor'
  ];
  const FREE = 1500;                   // free shipping kapag umabot dito
  const SHIP = 50;                     // shipping fee
  const PROMOS = { MINION10: { t: '%', v: 10 }, BANANA100: { t: '₱', v: 100 } };
  /* ============================================== */

  const KEY = 'dm3cart2', PKEY = 'dm3promo';
  const page = location.pathname.split('/').pop() || 'index.html';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const peso = n => '₱' + Number(n).toLocaleString('en-PH');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PH = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#FFD90F"/><text x="50%" y="50%" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="22" fill="#000">NO PHOTO</text></svg>');
  const BS = () => window.bootstrap;

  let cart = [], promo = '';
  const load = () => {
    try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
    promo = localStorage.getItem(PKEY) || '';
    if (!PROMOS[promo]) promo = '';
  };
  const save = () => { localStorage.setItem(KEY, JSON.stringify(cart)); localStorage.setItem(PKEY, promo); };
  load();

  /* ---------- STYLE (kasama na sa file) ---------- */
  const st = document.createElement('style');
  st.textContent = `
  html{scroll-behavior:smooth}
  #dmBar{position:fixed;top:0;left:0;height:6px;width:0;z-index:4000;background:linear-gradient(90deg,#D7263D,#FFD90F,#0072BB);border-bottom:2px solid #000;transition:width .1s}

  /* header layout */
  .nav-dm{transition:box-shadow .3s}
  .nav-dm.scrolled{box-shadow:0 6px 0 rgba(0,0,0,.35)}
  .nav-dm > .container{max-width:100% !important;padding-left:24px;padding-right:24px}
  .nav-dm .navbar-brand{display:flex !important;align-items:center;gap:10px;flex-shrink:0;white-space:nowrap;margin:0 auto 0 0}
  .nav-dm .navbar-brand span{font-size:1.6rem;line-height:1;white-space:nowrap}
  .nav-dm .logo{height:46px !important;width:auto !important;flex-shrink:0}
  .nav-dm .navbar-nav{align-items:center;gap:4px}
  .nav-dm .nav-link{display:flex !important;flex-direction:row !important;align-items:center;gap:6px;white-space:nowrap;padding:.4rem .9rem !important;font-size:1.1rem;margin:0}
  .nav-dm .nav-link .bi{font-size:1.2rem;line-height:1;display:inline-block}
  .nav-dm .nav-link .badge{position:static !important;transform:none}
  @media(max-width:767px){.nav-dm .navbar-nav{align-items:flex-start}.nav-dm .navbar-brand span{font-size:1.2rem}}
  #cnt.bump{animation:dmBump .5s}
  @keyframes dmBump{0%{transform:scale(1)}40%{transform:scale(1.8) rotate(-12deg)}100%{transform:scale(1)}}

  /* toast */
  #dmToast{position:fixed;bottom:24px;left:50%;transform:translate(-50%,120px);background:#000;color:#FFD90F;padding:8px 20px 8px 8px;border-radius:50px;font-weight:800;z-index:7000;display:flex;align-items:center;gap:10px;border:3px solid #FFD90F;box-shadow:5px 5px 0 rgba(0,0,0,.4);transition:transform .35s cubic-bezier(.3,1.6,.5,1);max-width:90vw}
  #dmToast.on{transform:translate(-50%,0)}
  #dmToast img{width:38px;height:38px;object-fit:contain;background:#fff;border-radius:50%;border:2px solid #FFD90F}
  #dmToast .ti{font-size:1.4rem;padding-left:8px}

  /* fly + confetti */
  .fly{position:fixed;z-index:5000;object-fit:contain;background:#fff;border:3px solid #000;border-radius:14px;pointer-events:none}
  .cf{position:fixed;top:0;width:10px;height:14px;z-index:9000;pointer-events:none;font-size:22px;font-style:normal;line-height:1}

  /* back to top */
  #dmTop{position:fixed;right:18px;bottom:18px;width:48px;height:48px;border-radius:50%;background:#FFD90F;border:3px solid #000;box-shadow:4px 4px 0 #000;z-index:2500;font-size:1.4rem;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transform:translateY(20px);transition:.3s;cursor:pointer;color:#000}
  #dmTop.on{opacity:1;pointer-events:auto;transform:none}
  #dmTop:hover{background:#D7263D;color:#fff;transform:translateY(-4px)}

  /* cart */
  #cart{width:min(410px,100vw) !important;border-left:5px solid #000 !important;background:#fff8d6}
  #cart .offcanvas-header{background:#FFD90F;border-bottom:4px solid #000}
  #cart .offcanvas-header h5{font-family:'Bangers',cursive;font-size:1.7rem;letter-spacing:1px}
  #cart .ci{background:#fff;border:3px solid #000;border-radius:14px;padding:8px;box-shadow:4px 4px 0 #000;animation:dmIn .35s both}
  @keyframes dmIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}
  #cart .ci img{width:62px;height:62px;object-fit:contain;border:2px solid #000;border-radius:10px;background:#fff;flex-shrink:0}
  #cart .qty button{width:28px;height:28px;padding:0;border-radius:50%;line-height:1;font-weight:900}
  #cart .rm{border-radius:50%;width:30px;height:30px;padding:0;font-weight:900}
  .cempty{text-align:center;padding:40px 10px}
  .cempty .em{font-size:4rem;display:block;animation:dmFloat 2s ease-in-out infinite}
  @keyframes dmFloat{50%{transform:translateY(-10px) rotate(8deg)}}
  .cfoot{padding:14px;border-top:4px solid #000;background:#fff}
  .sb{height:16px;border:3px solid #000;border-radius:20px;background:#eee;overflow:hidden}
  .sb i{display:block;height:100%;width:0;background:repeating-linear-gradient(45deg,#FFD90F 0 10px,#ffe95c 10px 20px);border-right:3px solid #000;transition:width .5s}
  .sbm{font-size:.8rem;font-weight:800;margin:4px 0 8px}
  .prow{display:flex;gap:6px}
  .prow input{border:3px solid #000;border-radius:10px;text-transform:uppercase;font-weight:700}
  .prow button{white-space:nowrap}
  .pm{font-size:.78rem;min-height:18px;font-weight:700}
  .tr{display:flex;justify-content:space-between;font-size:.9rem}
  .tt{display:flex;justify-content:space-between;font-family:'Bangers',cursive;font-size:1.7rem;color:#D7263D}

  /* checkout */
  #ckm .modal-content{border:4px solid #000;border-radius:20px;box-shadow:10px 10px 0 #000;overflow:hidden}
  #ckm .modal-header{background:#FFD90F;border-bottom:4px solid #000}
  #ckm .modal-title{font-family:'Bangers',cursive;font-size:1.8rem;letter-spacing:1px}
  #ckm .form-control{border:3px solid #000;border-radius:12px;font-weight:600}
  #ckm .form-control:focus{box-shadow:4px 4px 0 #0072BB;border-color:#000}
  .pays{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
  .pay input{display:none}
  .pay span{display:block;border:3px solid #000;border-radius:12px;padding:8px 4px;text-align:center;cursor:pointer;font-weight:800;background:#fff;transition:.2s;font-size:.9rem}
  .pay span i{display:block;font-size:1.5rem}
  .pay span:hover{transform:translateY(-3px)}
  .pay input:checked+span{background:#FFD90F;box-shadow:4px 4px 0 #000;transform:translateY(-3px)}
  .paynote{font-size:.8rem;background:#e8f4ff;border:2px dashed #0072BB;border-radius:10px;padding:6px 10px;margin-top:8px}
  .sum{background:#fff8d6;border:3px solid #000;border-radius:14px;padding:12px;box-shadow:4px 4px 0 #000}
  .rcp{background:#fff8d6;border:3px dashed #000;border-radius:14px;padding:14px;text-align:left;max-width:340px;margin:12px auto}
  .done-ic{font-size:4.5rem;animation:dmPop .6s cubic-bezier(.3,1.7,.5,1)}
  @keyframes dmPop{from{transform:scale(0) rotate(-90deg)}to{transform:none}}

  /* footer: developed by (names only) */
  .devs{list-style:none;padding:0;margin:0}
  .devs li{font-weight:800;font-size:1.05rem;padding:3px 0;transition:transform .2s}
  .devs li:hover{transform:translateX(8px)}

  /* products toolbar */
  .ptool{display:flex;flex-wrap:wrap;gap:10px;align-items:center;background:#fff;border:3px solid #000;border-radius:16px;box-shadow:6px 6px 0 #000;padding:10px 14px;margin-bottom:24px}
  .ptool input,.ptool select{border:3px solid #000;border-radius:12px;font-weight:700;padding:6px 12px;background:#fff;outline:0}
  .ptool input{flex:1;min-width:180px}
  .ptool input:focus,.ptool select:focus{box-shadow:4px 4px 0 #0072BB}
  .ptool .pc{font-weight:800;margin-left:auto}
  .pnone{display:none;text-align:center;background:#fff;border:3px dashed #000;border-radius:16px;padding:30px;font-weight:800;font-size:1.2rem;margin-top:10px}
  .pimg img{cursor:zoom-in}

  /* lightbox */
  #lb{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:8000;display:none;align-items:center;justify-content:center;padding:20px;cursor:zoom-out}
  #lb.on{display:flex}
  #lb img{max-width:min(92vw,820px);max-height:88vh;background:#fff;border:5px solid #FFD90F;border-radius:18px;box-shadow:10px 10px 0 #000;animation:dmPop .35s cubic-bezier(.3,1.5,.5,1)}
  #lb b{position:absolute;top:14px;right:22px;color:#FFD90F;font-size:2.4rem;line-height:1}`;
  document.head.appendChild(st);

  /* ---------- PROGRESS BAR + BACK TO TOP + LIGHTBOX ---------- */
  document.body.insertAdjacentHTML('afterbegin', '<div id="dmBar"></div>');
  document.body.insertAdjacentHTML('beforeend', '<button id="dmTop" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button><div id="dmToast"></div><div id="lb"><b>&times;</b><img alt=""></div>');

  /* ---------- HEADER ---------- */
  let hd = $('#site-header');
  if (!hd) { hd = document.createElement('header'); hd.id = 'site-header'; document.body.prepend(hd); }
  const act = p => (page === p ? ' active' : '');
  hd.innerHTML = `
  <nav class="navbar navbar-expand-md nav-dm sticky-top">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
        <img class="logo" src="${LOGO}" alt="Logo"><span>Despicable Me 3</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nv" aria-label="Menu"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="nv">
        <ul class="navbar-nav ms-auto align-items-md-center">
          <li class="nav-item"><a class="nav-link" href="index.html#cinema">Cinema</a></li>
          <li class="nav-item"><a class="nav-link${act('characters.html')}" href="characters.html">Characters</a></li>
          <li class="nav-item"><a class="nav-link${act('products.html')}" href="products.html">Products</a></li>
          <li class="nav-item"><a class="nav-link" href="#" id="openCart"><i class="bi bi-cart3"></i> Cart <span id="cnt" class="badge bg-danger">0</span></a></li>
        </ul>
      </div>
    </div>
  </nav>`;

  /* ---------- FOOTER ---------- */
  let ft = $('#site-footer');
  if (!ft) { ft = document.createElement('footer'); ft.id = 'site-footer'; document.body.appendChild(ft); }
  ft.innerHTML = `
  <div class="container py-4">
    <div class="row g-4">
      <div class="col-md-4">
        <div class="d-flex align-items-center gap-2 mb-2"><img class="logo" src="${LOGO}" alt="Logo"><h5 class="m-0">Despicable Me 3</h5></div>
        <p class="small">Fan-made movie promotion website. Light, laughs and lots of bananas! 🍌</p>
        <div class="fs-4 d-flex gap-3">
          <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          <a href="https://x.com" target="_blank" aria-label="X"><i class="bi bi-twitter-x"></i></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5>Developed by:</h5>
        <ul class="devs">${DEVS.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
      </div>
      <div class="col-md-4">
        <h5>Menu</h5>
        <ul class="list-unstyled m-0">
          <li><a href="index.html">Feature Page</a></li>
          <li><a href="index.html#cinema">Cinema</a></li>
          <li><a href="characters.html">Characters</a></li>
          <li><a href="products.html">Products</a></li>
        </ul>
      </div>
    </div>
    <hr><p class="text-center small m-0">© Despicable Me 3 • Made for WD1 CS2B</p>
  </div>`;

  /* ---------- CART + CHECKOUT (inject) ---------- */
  document.body.insertAdjacentHTML('beforeend', `
  <div class="offcanvas offcanvas-end" id="cart" tabindex="-1">
    <div class="offcanvas-header"><h5 class="m-0">🛒 YOUR CART</h5><button class="btn-close" data-bs-dismiss="offcanvas"></button></div>
    <div class="offcanvas-body d-flex flex-column gap-3" id="cbody"></div>
    <div class="cfoot">
      <div class="sbm" id="sbm"></div>
      <div class="sb"><i id="sbf"></i></div>
      <div class="prow mt-3">
        <input id="promoIn" class="form-control form-control-sm" placeholder="Promo code">
        <button id="promoBtn" class="btn btn-sm btn-dark">Apply</button>
      </div>
      <div class="pm" id="pm"></div>
      <div class="tr"><span>Subtotal</span><span id="cSub">₱0</span></div>
      <div class="tr text-success" id="cDiscRow" style="display:none"><span>Discount</span><span id="cDisc"></span></div>
      <div class="tr"><span>Shipping</span><span id="cShip">₱0</span></div>
      <div class="tt"><span>TOTAL</span><span id="ctotal">₱0</span></div>
      <button id="co" class="btn btn-y w-100 mt-2">Checkout <i class="bi bi-arrow-right"></i></button>
      <button id="clr" class="btn btn-link btn-sm w-100 text-danger mt-1">Clear cart</button>
    </div>
  </div>

  <div class="modal fade" id="ckm" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">🧾 CHECKOUT</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div id="ckForm" class="row g-3">
            <div class="col-md-7">
              <form id="ckf">
                <label class="small fw-bold">Full name</label>
                <input id="ckName" class="form-control mb-2" placeholder="Juan Dela Cruz" required>
                <label class="small fw-bold">Phone</label>
                <input id="ckPhone" class="form-control mb-2" placeholder="09xxxxxxxxx" pattern="[0-9+ ]{10,13}" required>
                <label class="small fw-bold">Complete address</label>
                <textarea id="ckAddr" class="form-control mb-3" rows="2" placeholder="House no., Street, Barangay, City" required></textarea>
                <label class="small fw-bold">Payment method</label>
                <div class="pays">
                  <label class="pay"><input type="radio" name="pay" value="COD" checked><span><i class="bi bi-cash-coin"></i>COD</span></label>
                  <label class="pay"><input type="radio" name="pay" value="GCash"><span><i class="bi bi-phone"></i>GCash</span></label>
                  <label class="pay"><input type="radio" name="pay" value="Card"><span><i class="bi bi-credit-card"></i>Card</span></label>
                </div>
                <div class="paynote" id="payNote"></div>
                <button id="ckPlace" class="btn btn-y w-100 mt-3" type="submit">Place Order 🍌</button>
              </form>
            </div>
            <div class="col-md-5"><div class="sum" id="ckSum"></div></div>
          </div>
          <div id="ckDone" class="text-center py-3 d-none">
            <div class="done-ic">🎉</div>
            <h3 style="font-family:'Bangers',cursive">ORDER PLACED!</h3>
            <p class="m-0">Salamat sa pag-order! Bello! 🍌</p>
            <div class="rcp" id="rcp"></div>
            <button class="btn btn-y" data-bs-dismiss="modal">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  </div>`);

  /* ---------- helpers ---------- */
  let tt;
  function toast(msg, img) {
    const t = $('#dmToast');
    t.innerHTML = (img ? `<img src="${esc(img)}" onerror="this.style.display='none'">` : '<span class="ti">✅</span>') + `<span>${esc(msg)}</span>`;
    t.classList.add('on');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200);
  }

  function totals() {
    const s = cart.reduce((a, i) => a + i.price * i.qty, 0);
    let d = 0;
    if (promo) { const p = PROMOS[promo]; d = p.t === '%' ? Math.round(s * p.v / 100) : Math.min(p.v, s); }
    const after = s - d;
    const sh = !s || after >= FREE ? 0 : SHIP;
    return { s, d, after, sh, t: after + sh };
  }

  function render() {
    const n = cart.reduce((a, i) => a + i.qty, 0);
    const c = $('#cnt');
    if (c) { if (c.textContent != n) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); } c.textContent = n; }

    $('#cbody').innerHTML = cart.length ? cart.map((i, k) => `
      <div class="ci d-flex gap-2 align-items-center">
        <img src="${esc(i.img)}" alt="" onerror="this.src='${PH}'">
        <div class="flex-grow-1">
          <div class="fw-bold small">${esc(i.name)}</div>
          <div class="small text-danger fw-bold">${peso(i.price)}</div>
          <div class="qty d-flex align-items-center gap-2 mt-1">
            <button class="btn btn-sm btn-dark" data-a="-" data-i="${k}">−</button>
            <b>${i.qty}</b>
            <button class="btn btn-sm btn-dark" data-a="+" data-i="${k}">+</button>
          </div>
        </div>
        <div class="text-end">
          <button class="btn btn-sm btn-danger rm" data-a="x" data-i="${k}">×</button>
          <div class="small fw-bold mt-1">${peso(i.price * i.qty)}</div>
        </div>
      </div>`).join('') : '<div class="cempty"><span class="em">🍌</span><h5>Walang laman ang cart</h5><p class="small text-muted m-0">Mag-add ng Minion merch!</p></div>';

    const T = totals();
    $('#cSub').textContent = peso(T.s);
    $('#cDiscRow').style.display = T.d ? 'flex' : 'none';
    $('#cDisc').textContent = '−' + peso(T.d);
    $('#cShip').textContent = T.sh ? peso(T.sh) : 'FREE';
    $('#ctotal').textContent = peso(T.t);
    $('#sbf').style.width = Math.min(100, T.after / FREE * 100) + '%';
    $('#sbm').textContent = T.after >= FREE ? '🎉 FREE shipping unlocked!' : `🚚 Add ${peso(FREE - T.after)} more for FREE shipping`;
    $('#pm').innerHTML = promo ? `<span class="text-success">✓ ${promo} applied</span> <a href="#" id="promoX" class="text-danger">remove</a>` : '';
    $('#co').disabled = !cart.length;
    save();
  }

  function fly(btn) {
    const im = (btn.closest('.pcard') || btn.closest('.card') || btn.parentElement).querySelector('img');
    const tg = $('#cnt');
    if (!im || !tg || !im.animate) return;
    const a = im.getBoundingClientRect(), b = tg.getBoundingClientRect();
    if (!b.width) return;
    const f = document.createElement('img');
    f.src = im.src; f.className = 'fly';
    f.style.cssText = `left:${a.left + a.width / 2 - 60}px;top:${a.top + a.height / 2 - 60}px;width:120px;height:120px`;
    document.body.appendChild(f);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    f.animate([{ transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) scale(.08) rotate(360deg)`, opacity: .4 }],
      { duration: 750, easing: 'cubic-bezier(.5,-.3,.8,.6)' }).onfinish = () => f.remove();
  }

  function confetti() {
    const cols = ['#FFD90F', '#0072BB', '#D7263D', '#07070D'];
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('i');
      s.className = 'cf';
      if (i % 6 === 0) s.textContent = '🍌'; else s.style.background = cols[i % 4];
      s.style.left = Math.random() * 100 + 'vw';
      document.body.appendChild(s);
      s.animate([{ transform: 'translateY(-20px) rotate(0)' }, { transform: `translateY(105vh) translateX(${Math.random() * 160 - 80}px) rotate(${Math.random() * 720}deg)` }],
        { duration: 1800 + Math.random() * 1800, easing: 'ease-in' }).onfinish = () => s.remove();
    }
  }

  function sumHTML() {
    const T = totals();
    return '<h6 class="fw-bold mb-2">Order Summary</h6>' +
      cart.map(i => `<div class="d-flex justify-content-between small mb-1"><span>${esc(i.name)} ×${i.qty}</span><b>${peso(i.price * i.qty)}</b></div>`).join('') +
      `<hr><div class="tr"><span>Subtotal</span><span>${peso(T.s)}</span></div>` +
      (T.d ? `<div class="tr text-success"><span>Discount (${promo})</span><span>−${peso(T.d)}</span></div>` : '') +
      `<div class="tr"><span>Shipping</span><span>${T.sh ? peso(T.sh) : 'FREE'}</span></div>
       <div class="tt"><span>TOTAL</span><span>${peso(T.t)}</span></div>`;
  }

  const NOTES = {
    COD: '💵 Magbabayad ka pagdating ng order.',
    GCash: '📱 Magpapadala kami ng GCash number pagkatapos mag-order.',
    Card: '💳 Demo lang ito, walang totoong card na kukunin.'
  };
  const setNote = () => { const r = $('input[name=pay]:checked'); $('#payNote').textContent = NOTES[r ? r.value : 'COD']; };

  function applyPromo() {
    const code = $('#promoIn').value.trim().toUpperCase();
    if (!code) return;
    if (PROMOS[code]) { promo = code; $('#promoIn').value = ''; render(); toast('Promo ' + code + ' applied!'); }
    else $('#pm').innerHTML = '<span class="text-danger">✗ Invalid promo code</span>';
  }

  /* ---------- PRODUCTS: SEARCH + SORT ---------- */
  const grid = page === 'products.html' ? $('.row-cols-lg-4') : null;
  if (grid) {
    const cols = $$(':scope > .col', grid);
    const priceOf = c => { const b = $('.add', c); return b ? parseFloat(b.dataset.price) || 0 : 0; };
    const nameOf = c => { const h = $('h5,h4,h3', c); return h ? h.textContent.trim().toLowerCase() : ''; };
    grid.insertAdjacentHTML('beforebegin', `
      <div class="ptool">
        <input id="pq" type="search" placeholder="🔍 Search merch...">
        <select id="ps">
          <option value="d">Sort: Default</option>
          <option value="lo">Price: Low to High</option>
          <option value="hi">Price: High to Low</option>
          <option value="az">Name: A to Z</option>
        </select>
        <span class="pc" id="pc"></span>
      </div>`);
    grid.insertAdjacentHTML('afterend', '<div class="pnone" id="pnone">😢 Walang nahanap na product.</div>');
    const run = () => {
      const q = $('#pq').value.trim().toLowerCase(), s = $('#ps').value;
      let list = cols.slice();
      if (s === 'lo') list.sort((a, b) => priceOf(a) - priceOf(b));
      if (s === 'hi') list.sort((a, b) => priceOf(b) - priceOf(a));
      if (s === 'az') list.sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
      let shown = 0;
      list.forEach(c => {
        grid.appendChild(c);
        const ok = !q || nameOf(c).includes(q) || c.textContent.toLowerCase().includes(q);
        c.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      $('#pc').textContent = shown + ' / ' + cols.length + ' items';
      $('#pnone').style.display = shown ? 'none' : 'block';
    };
    $('#pq').addEventListener('input', run);
    $('#ps').addEventListener('change', run);
    run();
  }

  /* ---------- EVENTS (delegation) ---------- */
  document.addEventListener('click', e => {
    /* zoom picture */
    const zi = e.target.closest('.pimg img');
    if (zi) { const lb = $('#lb'); $('img', lb).src = zi.src; lb.classList.add('on'); return; }
    if (e.target.closest('#lb')) { $('#lb').classList.remove('on'); return; }

    /* add to cart */
    const b = e.target.closest('.add');
    if (b) {
      const card = b.closest('.pcard') || b.closest('.card') || b.parentElement;
      const te = card.querySelector('h5,h4,h3,.card-title');
      const name = te ? te.textContent.trim() : 'Item';
      let price = parseFloat(b.dataset.price);
      if (isNaN(price)) {
        const p = card.querySelector('.price');
        price = parseFloat((p ? p.textContent : '0').replace(/[^\d.]/g, '')) || 0;
      }
      const im = card.querySelector('img');
      const img = im ? im.getAttribute('src') : PH;
      const f = cart.find(i => i.name === name);
      if (f) f.qty++; else cart.push({ name, price, img, qty: 1 });
      fly(b); render(); toast('Added: ' + name, img);
      return;
    }

    const q = e.target.closest('[data-a]');
    if (q) {
      const i = +q.dataset.i, a = q.dataset.a;
      if (!cart[i]) return;
      if (a === '+') cart[i].qty++;
      if (a === '-') cart[i].qty = Math.max(1, cart[i].qty - 1);
      if (a === 'x') cart.splice(i, 1);
      render(); return;
    }

    if (e.target.closest('#openCart')) {
      e.preventDefault();
      if (BS()) BS().Offcanvas.getOrCreateInstance($('#cart')).show();
      else toast('Hindi naka-load ang bootstrap.bundle.min.js');
      return;
    }

    if (e.target.closest('#promoBtn')) { applyPromo(); return; }
    if (e.target.closest('#promoX')) { e.preventDefault(); promo = ''; render(); return; }
    if (e.target.closest('#clr')) { if (cart.length && confirm('Alisin lahat ng laman ng cart?')) { cart = []; render(); } return; }
    if (e.target.closest('#dmTop')) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }

    if (e.target.closest('#co')) {
      if (!cart.length) { toast('Empty ang cart!'); return; }
      if (!BS()) { toast('Hindi naka-load ang bootstrap.bundle.min.js'); return; }
      const oc = BS().Offcanvas.getInstance($('#cart')); if (oc) oc.hide();
      $('#ckForm').classList.remove('d-none'); $('#ckDone').classList.add('d-none');
      $('#ckSum').innerHTML = sumHTML(); setNote();
      BS().Modal.getOrCreateInstance($('#ckm')).show();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') $('#lb').classList.remove('on');
    if (e.key === 'Enter' && e.target.id === 'promoIn') { e.preventDefault(); applyPromo(); }
  });
  document.addEventListener('change', e => { if (e.target.name === 'pay') setNote(); });

  $('#ckf').addEventListener('submit', e => {
    e.preventDefault();
    const T = totals();
    const pay = $('input[name=pay]:checked').value;
    const no = 'DM3-' + Math.floor(100000 + Math.random() * 900000);
    $('#rcp').innerHTML = `
      <div class="tr"><span>Order No.</span><b>${no}</b></div>
      <div class="tr"><span>Name</span><b>${esc($('#ckName').value)}</b></div>
      <div class="tr"><span>Payment</span><b>${pay}</b></div>
      <div class="tr"><span>Items</span><b>${cart.reduce((a, i) => a + i.qty, 0)}</b></div>
      <div class="tr"><span>Delivery</span><b>3-5 days</b></div>
      <hr class="my-2"><div class="tt"><span>TOTAL</span><span>${peso(T.t)}</span></div>`;
    cart = []; promo = ''; render();
    $('#ckForm').classList.add('d-none'); $('#ckDone').classList.remove('d-none');
    e.target.reset(); setNote(); confetti();
  });

  /* ---------- SCROLL EFFECTS ---------- */
  const nav = $('.nav-dm'), bar = $('#dmBar'), top = $('#dmTop');
  function onScroll() {
    const h = document.documentElement, y = h.scrollTop || document.body.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
    nav.classList.toggle('scrolled', y > 10);
    top.classList.toggle('on', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  window.addEventListener('storage', e => { if (e.key === KEY || e.key === PKEY) { load(); render(); } });

  render();
})();