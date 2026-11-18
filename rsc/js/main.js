/* ===== DEVELOPERS: palitan ng totoong pangalan ===== */


/* ===== Placeholder kapag walang picture ===== */
const PH="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#FFD90F"/><text x="150" y="160" font-size="30" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#07070D">ADD PHOTO</text></svg>');
const fix=i=>{if(!i.dataset.x){i.dataset.x=1;i.src=PH}};
document.addEventListener("error",e=>{if(e.target.tagName=="IMG")fix(e.target)},true);
window.addEventListener("load",()=>document.querySelectorAll("img").forEach(i=>{if(i.complete&&!i.naturalWidth)fix(i)}));

const $=id=>document.getElementById(id);

/* ===== HEADER ===== */
$("site-header").innerHTML=`<nav class="navbar navbar-expand-lg navbar-dark nav-dm sticky-top"><div class="container">
<a class="navbar-brand d-flex align-items-center gap-2" href="index.html"><img src="media/img/media/img/despicable-me-3-2.jpg" class="logo" alt="Logo"><span>Despicable Me 3</span></a>
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nv"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="nv"><ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
<li class="nav-item"><a class="nav-link" href="index.html#cinema">Cinema</a></li>
<li class="nav-item"><a class="nav-link" href="characters.html">Characters</a></li>
<li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
<li class="nav-item"><button class="btn btn-y btn-sm" data-bs-toggle="offcanvas" data-bs-target="#cart"><i class="bi bi-cart3"></i> Cart <span id="cnt" class="badge bg-dark">0</span></button></li>
</ul></div></div></nav>`;

/* ===== FOOTER (3 columns) ===== */
const MENU=[["index.html","Feature Page"],["index.html#synopsis","Synopsis & Info"],["index.html#highlights","Highlights"],["index.html#trailer","Videos & Gallery"],["index.html#cast","Voice Artists"],["index.html#credits","Main Credits"],["index.html#cinema","Cinema Schedule"],["characters.html","Characters"],["products.html","Products"]];
$("site-footer").innerHTML=`<div class="container"><div class="row g-4">
<div class="col-md-4"><div class="d-flex align-items-center gap-2 mb-2"><img src="media/img/logo.png" class="logo" alt="Logo"><h4 class="m-0">Despicable Me 3</h4></div>
<p class="small">Fan-made movie promotion website.</p>
<div class="soc"><a href="https://facebook.com" target="_blank"><i class="bi bi-facebook"></i></a><a href="https://instagram.com" target="_blank"><i class="bi bi-instagram"></i></a><a href="https://x.com" target="_blank"><i class="bi bi-twitter-x"></i></a><a href="https://youtube.com" target="_blank"><i class="bi bi-youtube"></i></a><a href="https://tiktok.com" target="_blank"><i class="bi bi-tiktok"></i></a></div></div>
<div class="col-md-4"><h5>Developed by:</h5><ul>${DEV.map(d=>`<li class="dev"><img class="dav" src="${d[2]}" alt=""><div><b>${d[0]}</b><br><small>${d[1]}</small></div></li>`).join("")}</ul></div>
<div class="col-md-4"><h5>Menu</h5><ul>${MENU.map(m=>`<li><a href="${m[0]}">${m[1]}</a></li>`).join("")}</ul></div>
</div><p class="copy">© 2017 Despicable Me 3 Fan Project • Made for WD1</p></div>`;

/* ===== CART PANEL + TOAST ===== */
document.body.insertAdjacentHTML("beforeend",`<div class="offcanvas offcanvas-end" id="cart"><div class="offcanvas-header" style="background:var(--y)"><h4 class="m-0">🛒 YOUR CART</h4><button class="btn-close" data-bs-dismiss="offcanvas"></button></div>
<div class="offcanvas-body d-flex flex-column"><div id="cbody" class="flex-grow-1"></div><div class="d-flex justify-content-between fs-5 fw-bold mt-3"><span>Total</span><span id="ctotal">₱0</span></div><button id="co" class="btn btn-y mt-2">Checkout</button></div></div><div id="toast"></div>`);

/* ===== ADD TO CART ===== */
let C=JSON.parse(localStorage.getItem("dm3cart")||"[]");
const peso=n=>"₱"+n.toLocaleString("en-US");
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),1800)}
function draw(){
 localStorage.setItem("dm3cart",JSON.stringify(C));
 $("cnt").textContent=C.reduce((a,i)=>a+i.q,0);
 $("ctotal").textContent=peso(C.reduce((a,i)=>a+i.q*i.price,0));
 $("cbody").innerHTML=C.length?C.map((i,x)=>`<div class="ci"><img src="${i.img}" alt=""><div class="flex-grow-1"><b>${i.name}</b><div>${peso(i.price)}</div></div><div class="qty"><button data-m="${x}">-</button><span>${i.q}</span><button data-p="${x}">+</button></div></div>`).join(""):"<p class='text-center mt-4'>Empty pa ang cart 🛒</p>";
}
document.addEventListener("click",e=>{
 const a=e.target.closest(".add");
 if(a){const c=a.closest(".pcard"),n=c.querySelector("h5").textContent,m=C.find(i=>i.name==n);
  m?m.q++:C.push({name:n,price:+a.dataset.price,q:1,img:c.querySelector("img").getAttribute("src")});
  draw();toast(n+" added to cart 🛒");return}
 const d=e.target.closest("[data-p],[data-m]");
 if(d){const p=d.dataset.p!==undefined,x=+(p?d.dataset.p:d.dataset.m);C[x].q+=p?1:-1;if(C[x].q<1)C.splice(x,1);draw();return}
 if(e.target.id=="co"){if(!C.length)return toast("Empty ang cart");C=[];draw();toast("Thank you! (demo checkout) 🎉")}
});
draw();