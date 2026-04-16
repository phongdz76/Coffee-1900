const STORAGE_KEY = "coffee1900_cart";
const ORDER_STORAGE_KEY = "coffee1900_orders";
const AUTH_CURRENT_USER_KEY = "coffee1900_current_user";
const FREE_SHIPPING_THRESHOLD = 300000;
const SHIPPING_FEE = 15000;

const cartItemsContainer = document.getElementById("cartItems");
const emptyCartState = document.getElementById("emptyCartState");
const itemCountText = document.getElementById("itemCountText");
const subtotalElement = document.getElementById("subtotal");
const shippingFeeElement = document.getElementById("shippingFee");
const totalPriceElement = document.getElementById("totalPrice");
const shippingNoteElement = document.getElementById("shippingNote");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartAuthActions = document.getElementById("cartAuthActions");

let cart = loadCart();

function parseJson(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadCart() {
  const saved = parseJson(STORAGE_KEY, []);
  if (!Array.isArray(saved)) {
    return [];
  }

  return saved
    .map((item, index) => ({
      id: String(item.id || item.name || `item-${index}`),
      name: item.name || "Sản phẩm cà phê",
      price: item.price || "0đ",
      image: item.image || "../../assets/coffee.png",
      quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
    }))
    .filter((item) => item.quantity > 0);
}

function saveCart() {
  writeJson(STORAGE_KEY, cart);
}

function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem(AUTH_CURRENT_USER_KEY));
    return user && typeof user === "object" ? user : null;
  } catch (error) {
    return null;
  }
}

function getUserDisplayName(user) {
  if (user?.fullName) {
    const nameParts = user.fullName.trim().split(/\s+/);
    return nameParts[nameParts.length - 1];
  }

  return user?.username || "Bạn";
}

function renderCartAuthActions() {
  if (!cartAuthActions) {
    return;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    cartAuthActions.innerHTML =
      '<a href="../auth/login.html?redirect=../cart/cart.html" class="cart-link">Đăng Nhập</a>';
    return;
  }

  const displayName = getUserDisplayName(currentUser);
  cartAuthActions.innerHTML = `
    <span class="cart-user-name">Xin chào, ${displayName}</span>
    <a href="#" class="cart-link js-cart-logout">Đăng Xuất</a>
  `;

  const logoutButton = cartAuthActions.querySelector(".js-cart-logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem(AUTH_CURRENT_USER_KEY);
      renderCartAuthActions();
      window.alert("Bạn đã đăng xuất.");
    });
  }
}

function parsePrice(priceValue) {
  if (typeof priceValue === "number") {
    return priceValue;
  }

  const numeric = String(priceValue).replace(/[^\d]/g, "");
  return Number(numeric || 0);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateCartSummary() {
  const subtotal = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0,
  );
  const shippingFee =
    subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const total = subtotal + shippingFee;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    shippingFee,
    total,
    totalItems,
  };
}

function updateSummary() {
  const { subtotal, shippingFee, total, totalItems } = calculateCartSummary();

  subtotalElement.textContent = formatCurrency(subtotal);
  shippingFeeElement.textContent = formatCurrency(shippingFee);
  totalPriceElement.textContent = formatCurrency(total);
  itemCountText.textContent = `${totalItems} sản phẩm`;

  if (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) {
    shippingNoteElement.textContent = "Bạn đã được miễn phí vận chuyển.";
  } else {
    const remain = FREE_SHIPPING_THRESHOLD - subtotal;
    shippingNoteElement.textContent = `Mua thêm ${formatCurrency(remain)} để được miễn phí vận chuyển.`;
  }

  const isCartEmpty = cart.length === 0;
  clearCartBtn.disabled = isCartEmpty;
  checkoutBtn.disabled = isCartEmpty;
}

function createCartItemElement(item) {
  const article = document.createElement("article");
  article.className = "cart-item";

  const image = document.createElement("img");
  image.className = "item-image";
  image.src = item.image;
  image.alt = item.name;

  const details = document.createElement("div");

  const name = document.createElement("h3");
  name.className = "item-name";
  name.textContent = item.name;

  const unitPrice = document.createElement("p");
  unitPrice.className = "item-unit-price";
  unitPrice.textContent = `Giá: ${formatCurrency(parsePrice(item.price))}`;

  const itemActions = document.createElement("div");
  itemActions.className = "item-actions";

  const qtyBox = document.createElement("div");
  qtyBox.className = "qty-box";

  const decreaseBtn = document.createElement("button");
  decreaseBtn.type = "button";
  decreaseBtn.className = "qty-btn";
  decreaseBtn.dataset.action = "decrease";
  decreaseBtn.dataset.id = item.id;
  decreaseBtn.setAttribute("aria-label", `Giảm số lượng ${item.name}`);
  decreaseBtn.textContent = "-";

  const qtyValue = document.createElement("span");
  qtyValue.className = "qty-value";
  qtyValue.textContent = item.quantity;

  const increaseBtn = document.createElement("button");
  increaseBtn.type = "button";
  increaseBtn.className = "qty-btn";
  increaseBtn.dataset.action = "increase";
  increaseBtn.dataset.id = item.id;
  increaseBtn.setAttribute("aria-label", `Tăng số lượng ${item.name}`);
  increaseBtn.textContent = "+";

  qtyBox.append(decreaseBtn, qtyValue, increaseBtn);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-btn";
  removeBtn.dataset.action = "remove";
  removeBtn.dataset.id = item.id;
  removeBtn.textContent = "Xóa";

  itemActions.append(qtyBox, removeBtn);

  const lineTotal = document.createElement("p");
  lineTotal.className = "item-line-total";
  lineTotal.textContent = `Thành tiền: ${formatCurrency(parsePrice(item.price) * item.quantity)}`;

  details.append(name, unitPrice, itemActions, lineTotal);

  const priceBlock = document.createElement("div");
  priceBlock.className = "item-price-block";
  priceBlock.textContent = formatCurrency(
    parsePrice(item.price) * item.quantity,
  );

  article.append(image, details, priceBlock);

  return article;
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCartState.classList.remove("hidden");
    cartItemsContainer.classList.add("hidden");
  } else {
    emptyCartState.classList.add("hidden");
    cartItemsContainer.classList.remove("hidden");

    cart.forEach((item) => {
      cartItemsContainer.appendChild(createCartItemElement(item));
    });
  }

  updateSummary();
}

function updateItem(action, itemId) {
  const itemIndex = cart.findIndex(
    (item) => String(item.id) === String(itemId),
  );
  if (itemIndex === -1) {
    return;
  }

  if (action === "increase") {
    cart[itemIndex].quantity += 1;
  }

  if (action === "decrease") {
    cart[itemIndex].quantity -= 1;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }

  if (action === "remove") {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  renderCart();
}

cartItemsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  updateItem(button.dataset.action, button.dataset.id);
});

clearCartBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    return;
  }

  const shouldClear = window.confirm(
    "Bạn chắc chắn muốn xóa toàn bộ giỏ hàng?",
  );
  if (!shouldClear) {
    return;
  }

  cart = [];
  saveCart();
  renderCart();
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    return;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    const shouldGoToLogin = window.confirm(
      "Bạn cần đăng nhập để thanh toán. Chuyển đến trang đăng nhập ngay?",
    );

    if (shouldGoToLogin) {
      window.location.href = "../auth/login.html?redirect=../cart/cart.html";
    }
    return;
  }

  const { subtotal, shippingFee, total } = calculateCartSummary();
  const orders = parseJson(ORDER_STORAGE_KEY, []);

  const order = {
    id: `DH-${Date.now()}`,
    userId: currentUser.id,
    customerName: currentUser.fullName || currentUser.username,
    items: cart,
    subtotal,
    shippingFee,
    total,
    status: "created",
    createdAt: Date.now(),
  };

  orders.push(order);
  writeJson(ORDER_STORAGE_KEY, orders);

  cart = [];
  saveCart();
  renderCart();

  window.alert(
    `Đặt hàng thành công! Mã đơn của bạn là ${order.id}. Cảm ơn bạn đã mua hàng.`,
  );
});

renderCartAuthActions();
renderCart();
