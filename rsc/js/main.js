(function () {
  
  const LOGO = 'media/img/despicable-me-3-2.jpg';
  const DEVS = [
    ['Alcanar Dave Justin', 'Leader - Feature page'],
    ['Angel Mae Batin', 'Character page'],
    ['Jamilla Lucille Gagtan', 'Product and add to cart page'],
    ['Kheryne Faith Gabor', 'Header, footer and design']
  ];
  /* ============================ */

  const KEY = 'dm3cart2';
  const page = location.pathname.split('/').pop() || 'index.html';
  const $ = (s, r = document) => r.querySelector(s);
  const peso = n => '₱' + Number(n).toLocaleString('en-PH');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PH = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#FFD90F"/><text x="50%" y="50%" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="22" fill="#000">ADD PHOTO</text></svg>');

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  const save = () => localStorage.setItem(KEY, JSON.stringify(cart));
  const BS = () => window.bootstrap;

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
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nv"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="nv">
        <ul class="navbar-nav ms-auto align-items-md-center">
          <li class="nav-item"><a class="nav-link${act('index.html')}" href="index.html#cinema">Cinema</a></li>
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
        <p class="small">Fan-made movie promotion website.</p>
        <div class="fs-4 d-flex gap-3">
          <a href="https://facebook.com" target="_blank"><i class="bi bi-facebook"></i></a>
          <a href="https://instagram.com" target="_blank"><i class="bi bi-instagram"></i></a>
          <a href="https://youtube.com" target="_blank"><i class="bi bi-youtube"></i></a>
          <a href="https://x.com" target="_blank"><i class="bi bi-twitter-x"></i></a>
        </div>
      </div>
      <div class="col-md-4">
        <h5>Developed by:</h5>
        <ul class="list-unstyled m-0">
          ${DEVS.map(d => `<li class="mb-1"><b>${esc(d[0])}</b> <span class="small">– ${esc(d[1])}</span></li>`).join('')}
        </ul>
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
    <div class="offcanvas-header"><h5 class="m-0">🛒 Your Cart</h5><button class="btn-close" data-bs-dismiss="offcanvas"></button></div>
    <div class="offcanvas-body" id="cbody"></div>
    <div class="p-3 border-top">
      <div class="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span id="ctotal">₱0</span></div>
      <button id="co" class="btn btn-y w-100 mt-2">Checkout</button>
    </div>
  </div>

  <div class="modal fade" id="ckm" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">Checkout</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div id="ckForm" class="row g-3">
            <div class="col-md-7">
              <form id="ckf">
                <input id="ckName" class="form-control mb-2" placeholder="Full name" required>
                <input id="ckPhone" class="form-control mb-2" placeholder="Phone (09xxxxxxxxx)" pattern="[0-9+ ]{10,13}" required>
                <textarea id="ckAddr" class="form-control mb-2" rows="2" placeholder="Complete address" required></textarea>
                <div class="mb-2">
                  <label class="me-3"><input type="radio" name="pay" value="COD" checked> COD</label>
                  <label class="me-3"><input type="radio" name="pay" value="GCash"> GCash</label>
                  <label><input type="radio" name="pay" value="Card"> Card</label>
                </div>
                <button id="ckPlace" class="btn btn-y w-100" type="submit">Place Order</button>
              </form>
            </div>
            <div class="col-md-5"><div class="p-3 border rounded" id="ckSum"></div></div>
          </div>
          <div id="ckDone" class="text-center py-4 d-none">
            <div style="font-size:4rem">✅</div>
            <h4>Order placed!</h4>
            <p>Order No: <b id="ono"></b></p>
            <p class="small">Salamat sa pag-order! 🍌</p>
            <button class="btn btn-y" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="toast" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#000;color:#FFD90F;padding:10px 20px;border-radius:30px;font-weight:700;z-index:3000;display:none"></div>`);

  /* ---------- helpers ---------- */
  let tt;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.style.display = 'block';
    clearTimeout(tt); tt = setTimeout(() => t.style.display = 'none', 1800);
  }
  const sub = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = () => (sub() === 0 || sub() >= 1500 ? 0 : 50);

  function render() {
    const n = cart.reduce((s, i) => s + i.qty, 0);
    const c = $('#cnt'); if (c) c.textContent = n;
    const body = $('#cbody');
    body.innerHTML = cart.length ? cart.map((i, k) => `
      <div class="ci d-flex gap-2 align-items-center mb-3">
        <img src="${esc(i.img)}" width="60" height="60" style="object-fit:contain;border:2px solid #000;border-radius:8px;background:#fff" onerror="this.src='${PH}'">
        <div class="flex-grow-1">
          <div class="fw-bold small">${esc(i.name)}</div>
          <div class="small">${peso(i.price)}</div>
          <div class="qty d-flex align-items-center gap-2 mt-1">
            <button class="btn btn-sm btn-dark" data-a="-" data-i="${k}">−</button>
            <b>${i.qty}</b>
            <button class="btn btn-sm btn-dark" data-a="+" data-i="${k}">+</button>
          </div>
        </div>
        <button class="btn btn-sm btn-danger" data-a="x" data-i="${k}">×</button>
      </div>`).join('') : '<p class="text-center text-muted mt-4">Walang laman ang cart 🛒</p>';
    $('#ctotal').textContent = peso(sub());
    save();
  }

  /* ---------- EVENTS (delegation = laging gumagana) ---------- */
  document.addEventListener('click', e => {
    /* ADD TO CART */
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
      render(); toast('Added: ' + name);
      return;
    }
    /* + - x */
    const q = e.target.closest('[data-a]');
    if (q) {
      const i = +q.dataset.i, a = q.dataset.a;
      if (!cart[i]) return;
      if (a === '+') cart[i].qty++;
      if (a === '-') cart[i].qty = Math.max(1, cart[i].qty - 1);
      if (a === 'x') cart.splice(i, 1);
      render(); return;
    }
    /* OPEN CART */
    if (e.target.closest('#openCart')) {
      e.preventDefault();
      if (BS()) BS().Offcanvas.getOrCreateInstance($('#cart')).show();
      else alert('Hindi naka-load ang bootstrap.bundle.min.js');
      return;
    }
    /* CHECKOUT */
    if (e.target.closest('#co')) {
      if (!cart.length) { toast('Empty ang cart!'); return; }
      if (!BS()) { alert('Hindi naka-load ang bootstrap.bundle.min.js'); return; }
      const oc = BS().Offcanvas.getInstance($('#cart')); if (oc) oc.hide();
      $('#ckForm').classList.remove('d-none'); $('#ckDone').classList.add('d-none');
      const s = sub(), sh = ship();
      $('#ckSum').innerHTML = cart.map(i => `<div class="d-flex justify-content-between small"><span>${esc(i.name)} ×${i.qty}</span><span>${peso(i.price * i.qty)}</span></div>`).join('') +
        `<hr><div class="d-flex justify-content-between small"><span>Subtotal</span><span>${peso(s)}</span></div>
         <div class="d-flex justify-content-between small"><span>Shipping</span><span>${sh ? peso(sh) : 'FREE'}</span></div>
         <div class="d-flex justify-content-between fw-bold mt-1"><span>Total</span><span>${peso(s + sh)}</span></div>`;
      BS().Modal.getOrCreateInstance($('#ckm')).show();
    }
  });

  $('#ckf').addEventListener('submit', e => {
    e.preventDefault();
    $('#ono').textContent = 'DM3-' + Math.floor(100000 + Math.random() * 900000);
    cart = []; render();
    $('#ckForm').classList.add('d-none'); $('#ckDone').classList.remove('d-none');
    e.target.reset();
  });

  render();
})();