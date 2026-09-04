let cart = [];

const categoryNames = {
  vegetables: "الخضروات والفاكهة",
  meat: "اللحوم والدواجن",
  dairy: "الألبان والجبن",
  bakery: "المخبوزات والحلويات",
  cleaning: "العناية والمنظفات",
  home: "الأدوات المنزلية"
};

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  alert(`تمت إضافة ${name} إلى السلة`);
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;

  const itemsContainer = document.getElementById("cartItems");
  const totalElement = document.getElementById("cartTotal");

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p>السلة فارغة حالياً.</p>";
    totalElement.textContent = "0";
    return;
  }

  itemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <span>${item.name}</span>
      <strong>
        ${item.price} جنيه
        <button onclick="removeFromCart(${index})">❌</button>
      </strong>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalElement.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function openCart() {
  document.getElementById("cartModal").style.display = "flex";
  updateCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function showCategory(category) {
  const products = document.querySelectorAll(".product-card");
  const title = document.getElementById("productsTitle");

  products.forEach(product => {
    product.style.display =
      product.dataset.category === category ? "block" : "none";
  });

  title.textContent = `منتجات ${categoryNames[category] || ""}`;

  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function showAllProducts() {
  document.querySelectorAll(".product-card").forEach(product => {
    product.style.display = "block";
  });

  document.getElementById("productsTitle").textContent = "منتجات مميزة";
}

function searchProducts() {
  const searchValue = document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const productName = product.dataset.name.toLowerCase();
    product.style.display = productName.includes(searchValue) ? "block" : "none";
  });

  document.getElementById("productsTitle").textContent =
    searchValue ? `نتائج البحث عن: ${searchValue}` : "منتجات مميزة";

  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("السلة فارغة، أضف بعض المنتجات أولاً.");
    return;
  }

  alert("تم استلام طلبك بنجاح، سنتواصل معك قريباً.");
  cart = [];
  updateCart();
  closeCart();
}

document.querySelectorAll(".category-card").forEach(categoryCard => {
  categoryCard.addEventListener("click", () => {
    showCategory(categoryCard.dataset.category);
  });
});

document.getElementById("searchInput").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    searchProducts();
  }
});

document.getElementById("cartModal").addEventListener("click", event => {
  if (event.target.id === "cartModal") {
    closeCart();
  }
});

updateCart();