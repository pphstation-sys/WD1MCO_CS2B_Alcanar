(function () {
  /* ===== PALITAN DITO ===== */
  const LOGO = 'media/img/despicable-me-3-2.jpg';
  const DEVS = [
    ['Aldrin Alcanar', 'Leader', ''],
    ['Member 2 Name', 'Role', ''],
    ['Member 3 Name', 'Role', ''],
    ['Member 4 Name', 'Role', '']
  ]; /* pangatlo = picture path (optional), halimbawa 'media/img/devs/aldrin.jpg' */

  /* ===== Placeholder kapag walang picture ===== */
  const PH = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#FFD90F"/><text x="150" y="160" font-size="30" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#07070D">ADD PHOTO</text></svg>'
  );
  document.addEventListener('error', function (e) {
    const t = e.target;
    if (t.tagName === 'IMG' && !t.dataset.f) { t.dataset.f = 1; t.src = PH; }
  }, true);

  /* ===== Style ng checkout at developers ===== */
  document.head.insertAdjacentHTML('beforeend', `<style>
  .dev{display:flex;align-items:center;gap:12px;margin-bottom:12px!important}
  #site-footer .dav{width:46px;height:46px;max-height:none;border-radius:50%;border:3px solid var(--y);object-fit:cover;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--y);color:#000;font-family:'Bangers';font-size:1.4rem}
  .dev b{color:#fff;display:block;line-height:1.1}
  .dev small{color:var(--y)}
  .ck{border:4px solid #000;border-radius:18px;box-shadow:8px 8px 0 #000;overflow:hidden}
  .ck .modal-header{background:var(--y);border-bottom:4px solid #000}
  .ck .modal-title{font-family:'Bangers';font-size:1.9rem;letter-spacing:1px}
  .ck h6{font-family:'Bangers';font-size:1.3rem;letter-spacing:1px;color:var(--r)}
  .ck .form-control{border:3px solid #000;border-radius:10px;font-weight:700}
  .ck .form-control:focus{box-shadow:4px 4px 0 var(--y);border-color:#000}
  .ck .form-label{font-weight:800;margin-bottom:2px}
  .pay{display:block;cursor:pointer;margin:0}
  .pay input{position:absolute;opacity:0}
  .pay span{display:block;text-align:center;padding:10px 4px;border:3px solid #000;border-radius:10px;font-family:'Bangers';letter-spacing:1px;font-size:1.1rem;background:#fff;transition:.15s}
  .pay span i{display:block;font-size:1.5rem}
  .pay input:checked+span{background:var(--y);box-shadow:4px 4px 0 #000;transform:translate(-2px,-2px)}
  .sum{background:var(--cream);border:3px solid #000;border-radius:14px;padding:14px;box-shadow:5px 5px 0 #000}
  .sum .si{display:flex;justify-content:space-between;gap:8px;font-size:.92rem;padding:4px 0;border-bottom:2px dashed #0003}
  .sum .row2{display:flex;justify-content:space-between;font-weight:700;padding-top:6px}
  .sum .tot{font-family:'Bangers';font-size:1.7rem;color:var(--r);border-top:3px solid #000;margin-top:8px;padding-top:6px}
  .done-ic{font-size:5rem;color:#198754;display:inline-block;animation:pop .5s}
  @keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:scale(1)}}
  .ono{display:inline-block;background:#000;color:var(--y);font-family:'Bangers';font-size:1.6rem;letter-spacing:2px;padding:4px 20px;border-radius:10px;box-shadow:4px 4px 0 var(--r)}
  .ci .rm{border:2px solid #000;background:var(--r);color:#fff;border-radius:8px;width:30px;height:30px;line-height:1}
  </style>`);

  const page = location.pathname.split('/').pop() || 'index.html';
  const act = f => (page === f ? 'active' : '');

  /* ===== HEADER ===== */
  const headerHTML = `
  <nav class="navbar navbar-expand-md nav-dm">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <img class="logo" src="${LOGO}" alt="Logo"> Despicable Me 3
      </a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nv"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="nv">
        <ul class="navbar-nav ms-auto align-items-md-center">
          <li class="nav-item"><a class="nav-link" href="index.html#cinema">Cinema</a></li>
          <li class="nav-item"><a class="nav-link ${act('characters.html')}" href="characters.html">Characters</a></li>
          <li class="nav-item"><a class="nav-link ${act('products.html')}" href="products.html">Products</a></li>
          <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="offcanvas" data-bs-target="#cart"><i class="bi bi-cart3"></i> Cart <span id="cnt">0</span></a></li>
        </ul>
      </div>
    </div>
  </nav>`;

  /* ===== FOOTER (3 columns) ===== */
  const devHTML = DEVS.map(d => `
    <li class="dev">
      ${d[2] ? `<img class="dav" src="${d[2]}" alt="${d[0]}">` : `<span class="dav">${d[0].trim().charAt(0).toUpperCase()}</span>`}
      <div><b>${d[0]}</b><small>${d[1]}</small></div>
    </li>`).join('');

  const footerHTML = `
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4">
        <img src="${LOGO}" alt="Logo">
        <h5 class="mt-2">Despicable Me 3</h5>
        <p>Fan-made movie promotion website.</p>
        <div>
          <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          <a href="https://x.com" target="_blank" aria-label="X"><i class="bi bi-twitter-x"></i></a>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <h5>Developed by:</h5>
        <ul>${devHTML}</ul>
      </div>
      <div class="col-6 col-md-4">
        <h5>Menu</h5>
        <ul>
          <li><a href="index.html">Feature Page</a></li>
          <li><a href="index.html#cinema">Cinema</a></li>
          <li><a href="characters.html">Characters</a></li>
          <li><a href="products.html">Products</a></li>
        </ul>
      </div>
    </div>
    <hr>
    <p class="text-center small mb-0">&copy; ${new Date().getFullYear()} Despicable Me 3 Fan Project &bull; Made for WD1 CS2B</p>
  </div>`;

  /* ===== CART PANEL + CHECKOUT MODAL + TOAST ===== */
  const cartHTML = `
  <div class="offcanvas offcanvas-end" id="cart" tabindex="-1">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">🛒 YOUR CART</h5>
      <button class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column">
      <div id="cbody" class="flex-grow-1"></div>
      <div class="d-flex justify-content-between align-items-center my-3"><b>Total:</b><span id="ctotal">₱0</span></div>
      <button id="co" class="btn btn-y w-100">Checkout</button>
    </div>
  </div>

  <div class="modal fade" id="ckm" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content ck">
        <div class="modal-header">
          <h5 class="modal-title">🛒 CHECKOUT</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body p-4">
          <div id="ckForm">
            <div class="row g-4">
              <div class="col-md-7">
                <form id="ckf" novalidate>
                  <h6>1. DELIVERY DETAILS</h6>
                  <div class="mb-2"><label class="form-label">Full Name</label><input id="ckName" class="form-control" required placeholder="Juan Dela Cruz"></div>
                  <div class="mb-2"><label class="form-label">Phone Number</label><input id="ckPhone" class="form-control" required pattern="[0-9+ ]{10,13}" placeholder="09123456789"></div>
                  <div class="mb-3"><label class="form-label">Address</label><textarea id="ckAddr" class="form-control" rows="2" required placeholder="House No., Street, Barangay, City"></textarea></div>
                  <h6>2. PAYMENT METHOD</h6>
                  <div class="row g-2">
                    <div class="col-4"><label class="pay"><input type="radio" name="pay" value="Cash on Delivery" checked><span><i class="bi bi-cash-coin"></i>COD</span></label></div>
                    <div class="col-4"><label class="pay"><input type="radio" name="pay" value="GCash"><span><i class="bi bi-phone"></i>GCash</span></label></div>
                    <div class="col-4"><label class="pay"><input type="radio" name="pay" value="Credit/Debit Card"><span><i class="bi bi-credit-card"></i>Card</span></label></div>
                  </div>
                  <small class="text-muted d-block mt-2">Demo lang ito. Walang totoong bayad.</small>
                </form>
              </div>
              <div class="col-md-5">
                <h6>ORDER SUMMARY</h6>
                <div class="sum" id="ckSum"></div>
                <button id="ckPlace" class="btn btn-y btn-lg w-100 mt-3">Place Order</button>
              </div>
            </div>
          </div>
          <div id="ckDone" class="text-center d-none py-3">
            <i class="bi bi-check-circle-fill done-ic"></i>
            <h2 class="mt-2" style="font-family:'Bangers'">ORDER PLACED!</h2>
            <p class="mb-2">Salamat, <b id="dName"></b>! Natanggap na namin ang order mo.</p>
            <div class="ono" id="dNo"></div>
            <p class="mt-3 mb-1">Payment: <b id="dPay"></b> &bull; Total: <b id="dTot"></b></p>
            <p class="text-muted">Estimated delivery: 3-5 days</p>
            <button class="btn btn-dark" data-bs-dismiss="modal">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="toast"></div>`;

  let h = document.getElementById('site-header');
  if (!h) { h = document.createElement('header'); h.id = 'site-header'; document.body.prepend(h); }
  h.innerHTML = headerHTML;

  let f = document.getElementById('site-footer');
  if (!f) { f = document.createElement('footer'); f.id = 'site-footer'; document.body.appendChild(f); }
  f.innerHTML = footerHTML;

  document.body.insertAdjacentHTML('beforeend', cartHTML);

  /* ===== CART ===== */
  const KEY = 'dm3cart2';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  const peso = n => '₱' + n.toLocaleString('en-PH');
  const save = () => localStorage.setItem(KEY, JSON.stringify(cart));
  const subtotal = () => cart.reduce((a, c) => a + c.p * c.q, 0);
  const shipping = () => (subtotal() >= 1500 || !cart.length ? 0 : 50);

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 1800);
  }

  function render() {
    const body = document.getElementById('cbody');
    let count = 0;
    if (!cart.length) {
      body.innerHTML = '<p class="text-center text-muted mt-4">Your cart is empty. 🛒</p>';
    } else {
      body.innerHTML = cart.map((c, i) => {
        count += c.q;
        return `<div class="ci">
          <img src="${c.i}" alt="">
          <div class="flex-grow-1">
            <b>${c.n}</b><br><small>${peso(c.p)}</small>
            <div class="qty mt-1">
              <button data-a="minus" data-i="${i}">-</button>
              <span class="mx-2">${c.q}</span>
              <button data-a="plus" data-i="${i}">+</button>
            </div>
          </div>
          <button class="rm" data-a="del" data-i="${i}">&times;</button>
        </div>`;
      }).join('');
    }
    document.getElementById('ctotal').textContent = peso(subtotal());
    document.getElementById('cnt').textContent = count;
    save();
  }

  function renderSummary() {
    const sub = subtotal(), ship = shipping();
    document.getElementById('ckSum').innerHTML =
      cart.map(c => `<div class="si"><span>${c.n} &times; ${c.q}</span><b>${peso(c.p * c.q)}</b></div>`).join('') +
      `<div class="row2"><span>Subtotal</span><span>${peso(sub)}</span></div>
       <div class="row2"><span>Shipping</span><span>${ship ? peso(ship) : 'FREE'}</span></div>
       <div class="row2 tot"><span>TOTAL</span><span>${peso(sub + ship)}</span></div>
       <small class="text-muted">Free shipping kapag ₱1,500 pataas.</small>`;
  }

  const ckEl = document.getElementById('ckm');
  const ckModal = new bootstrap.Modal(ckEl);
  const form = document.getElementById('ckf');

  ckEl.addEventListener('hidden.bs.modal', function () {
    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('ckForm').classList.remove('d-none');
    document.getElementById('ckDone').classList.add('d-none');
  });

  document.addEventListener('click', function (e) {
    /* ADD TO CART */
    const add = e.target.closest('.add');
    if (add) {
      const card = add.closest('.pcard');
      const name = card.querySelector('h5').textContent.trim();
      const price = Number(add.dataset.price) || 0;
      const img = card.querySelector('img') ? card.querySelector('img').getAttribute('src') : PH;
      const ex = cart.find(c => c.n === name);
      if (ex) ex.q++; else cart.push({ n: name, p: price, i: img, q: 1 });
      render();
      toast('Added to cart: ' + name);
      return;
    }

    /* + - x */
    const b = e.target.closest('[data-a]');
    if (b) {
      const i = Number(b.dataset.i);
      if (b.dataset.a === 'plus') cart[i].q++;
      if (b.dataset.a === 'minus') { cart[i].q--; if (cart[i].q <= 0) cart.splice(i, 1); }
      if (b.dataset.a === 'del') cart.splice(i, 1);
      render();
      return;
    }

    /* CHECKOUT BUTTON (sa cart) */
    if (e.target.closest('#co')) {
      if (!cart.length) { toast('Your cart is empty'); return; }
      const oc = bootstrap.Offcanvas.getInstance(document.getElementById('cart'));
      if (oc) oc.hide();
      renderSummary();
      setTimeout(() => ckModal.show(), 350);
      return;
    }

    /* PLACE ORDER */
    if (e.target.closest('#ckPlace')) {
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        form.reportValidity();
        return;
      }
      const total = subtotal() + shipping();
      const pay = form.querySelector('input[name=pay]:checked').value;
      document.getElementById('dName').textContent = document.getElementById('ckName').value.trim();
      document.getElementById('dNo').textContent = 'DM3-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('dPay').textContent = pay;
      document.getElementById('dTot').textContent = peso(total);
      document.getElementById('ckForm').classList.add('d-none');
      document.getElementById('ckDone').classList.remove('d-none');
      cart = [];
      render();
    }
  });

  render();
})();