/* ==================================================
   CHECKOUT PAGE STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const CART_STORAGE_KEY = "sweetcrumbCart";
  const CART_COUNT_KEY = "sweetcrumbCartCount";

  const checkoutForm = document.querySelector("[data-checkout-form]");
  const checkoutItems = document.querySelector("[data-checkout-items]");

  const subtotalElement = document.querySelector("[data-checkout-subtotal]");

  const deliveryElement = document.querySelector("[data-checkout-delivery]");

  const totalElement = document.querySelector("[data-checkout-total]");

  const placeOrderButton = document.querySelector("[data-place-order]");

  const cartCount = document.querySelector("[data-cart-count]");

  const deliveryDateInput = document.querySelector("[data-delivery-date]");

  const toast = document.querySelector("[data-checkout-toast]");

  const toastMessage = document.querySelector("[data-checkout-toast-message]");

  /* ==================================================
     CART STORAGE STARTED
  ================================================== */

  function getCart() {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (!storedCart) {
        return [];
      }

      const parsedCart = JSON.parse(storedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      return [];
    }
  }

  /* ==================================================
     CART STORAGE ENDED
  ================================================== */

  /* ==================================================
     FORMAT PRICE STARTED
  ================================================== */

  function formatPrice(price) {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  }

  /* ==================================================
     FORMAT PRICE ENDED
  ================================================== */

  /* ==================================================
     TOTALS STARTED
  ================================================== */

  function getSubtotal(cart) {
    return cart.reduce((total, item) => {
      return total + Number(item.unitPrice || 0) * Number(item.quantity || 0);
    }, 0);
  }

  function getTotalQuantity(cart) {
    return cart.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);
  }

  function getDeliveryCharge(subtotal) {
    if (subtotal === 0) {
      return 0;
    }

    return subtotal >= 999 ? 0 : 99;
  }

  /* ==================================================
     TOTALS ENDED
  ================================================== */

  /* ==================================================
     CART COUNT STARTED
  ================================================== */

  function updateCartCount(cart) {
    const quantity = getTotalQuantity(cart);

    localStorage.setItem(CART_COUNT_KEY, String(quantity));

    if (cartCount) {
      cartCount.textContent = quantity;
    }
  }

  /* ==================================================
     CART COUNT ENDED
  ================================================== */

  /* ==================================================
     RENDER ITEMS STARTED
  ================================================== */

  function renderItems(cart) {
    checkoutItems.innerHTML = "";

    cart.forEach((item) => {
      const itemElement = document.createElement("article");

      itemElement.className = "checkout-summary-item";

      const preference = item.preference === "eggless" ? "Eggless" : "Regular";

      const itemTotal = Number(item.unitPrice) * Number(item.quantity);

      itemElement.innerHTML = `
        <div class="checkout-summary-item-image">
          <img
            src="${item.image}"
            alt="${item.alt || item.name}"
          />
        </div>

        <div>
          <h3>${item.name}</h3>

          <p>
            ${item.weight} · ${preference} · Qty ${item.quantity}
          </p>
        </div>

        <strong>
          ${formatPrice(itemTotal)}
        </strong>
      `;

      checkoutItems.appendChild(itemElement);
    });
  }

  /* ==================================================
     RENDER ITEMS ENDED
  ================================================== */

  /* ==================================================
     RENDER SUMMARY STARTED
  ================================================== */

  function renderSummary(cart) {
    const subtotal = getSubtotal(cart);

    const delivery = getDeliveryCharge(subtotal);

    const total = subtotal + delivery;

    subtotalElement.textContent = formatPrice(subtotal);

    deliveryElement.textContent =
      delivery === 0 && subtotal > 0 ? "FREE" : formatPrice(delivery);

    totalElement.textContent = formatPrice(total);
  }

  /* ==================================================
     RENDER SUMMARY ENDED
  ================================================== */

  /* ==================================================
     PAYMENT OPTION STARTED
  ================================================== */

  document.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener("change", () => {
      document
        .querySelectorAll(".checkout-payment-option")
        .forEach((option) => {
          option.classList.remove("active");
        });

      input.closest(".checkout-payment-option").classList.add("active");
    });
  });

  /* ==================================================
     PAYMENT OPTION ENDED
  ================================================== */

  /* ==================================================
     DELIVERY DATE STARTED
  ================================================== */

  function setMinimumDeliveryDate() {
    const today = new Date();

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const year = tomorrow.getFullYear();

    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");

    const day = String(tomorrow.getDate()).padStart(2, "0");

    deliveryDateInput.min = `${year}-${month}-${day}`;
  }

  /* ==================================================
     DELIVERY DATE ENDED
  ================================================== */

  /* ==================================================
     TOAST STARTED
  ================================================== */

  function showToast(message) {
    toastMessage.textContent = message;

    toast.classList.add("show");

    window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  /* ==================================================
     TOAST ENDED
  ================================================== */

  /* ==================================================
     PLACE ORDER STARTED
  ================================================== */

  placeOrderButton.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
      window.location.href = "cart.html";

      return;
    }

    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();

      showToast("Please complete all required details.");

      return;
    }

    const formData = new FormData(checkoutForm);

    const customerDetails = Object.fromEntries(formData.entries());

    const subtotal = getSubtotal(cart);

    const delivery = getDeliveryCharge(subtotal);

    const order = {
      orderId: `SC${Date.now()}`,
      customer: customerDetails,
      items: cart,
      subtotal: subtotal,
      delivery: delivery,
      total: subtotal + delivery,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("sweetcrumbLastOrder", JSON.stringify(order));

    localStorage.removeItem(CART_STORAGE_KEY);

    localStorage.setItem(CART_COUNT_KEY, "0");

    if (cartCount) {
      cartCount.textContent = "0";
    }

    showToast("Your SweetCrumb order has been placed successfully.");

    window.setTimeout(() => {
      window.location.href = "order-success.html";
    }, 900);
  });

  /* ==================================================
     PLACE ORDER ENDED
  ================================================== */

  /* ==================================================
     INITIALIZE STARTED
  ================================================== */

  const cart = getCart();

  if (cart.length === 0) {
    window.location.href = "cart.html";

    return;
  }

  renderItems(cart);
  renderSummary(cart);
  updateCartCount(cart);
  setMinimumDeliveryDate();

  /* ==================================================
     INITIALIZE ENDED
  ================================================== */
});

/* ==================================================
   CHECKOUT PAGE ENDED
================================================== */
