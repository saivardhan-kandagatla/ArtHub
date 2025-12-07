const productGrid = document.getElementById('product-grid');
const cartCountEl = document.getElementById('cart-count');
const yearEl = document.getElementById('year');

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '{}');
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount(){
  const cart = getCart();
  const total = Object.values(cart).reduce((s,q)=>s+q,0);
  cartCountEl.textContent = total;
}

function addToCart(productId){
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  alert('Added to cart');
}

function renderProducts(filterCategory){
  productGrid.innerHTML = '';
  const filtered =
    filterCategory ? PRODUCTS.filter(p => p.category === filterCategory) : PRODUCTS;

  filtered.forEach(p => {
    const el = document.createElement('article');
    el.className = 'product';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.title}" onerror="this.src='placeholder.png'">
      <h3>${p.title}</h3>
      <div class="meta">
        <div class="price">$${p.price}</div>
        <button class="btn-add" data-id="${p.id}">Add to Cart</button>
      </div>`;
    productGrid.appendChild(el);
  });
}

document.querySelectorAll('nav a[data-page]').forEach(a => {
  a.addEventListener('click', e=>{
    e.preventDefault();
    const page = a.getAttribute('data-page');
    renderProducts(page);
  });
});

productGrid.addEventListener('click', e=>{
  const btn = e.target.closest('button[data-id]');
  if(!btn) return;
  addToCart(btn.dataset.id);
});

yearEl.textContent = new Date().getFullYear();
renderProducts();
updateCartCount();
