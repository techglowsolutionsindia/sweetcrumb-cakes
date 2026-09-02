/* ==================================================
   CART PAGE STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const CART_STORAGE_KEY = "sweetcrumbCart";
  const CART_COUNT_KEY = "sweetcrumbCartCount";

  const cartLayout = document.querySelector("[data-cart-layout]");
  const cartItemsContainer = document.querySelector("[data-cart-items]");
  const emptyCart = document.querySelector("[data-empty-cart]");

  const cartItemCount = document.querySelector("[data-cart-item-count]");
  const cartCount = document.querySelector("[data-cart-count]");

  const subtotalElement = document.querySelector("[data-cart-subtotal]");
  const deliveryElement = document.querySelector("[data-cart-delivery]");
  const totalElement = document.querySelector("[data-cart-total]");

  const deliveryMessage = document.querySelector("[data-delivery-message]");

  const clearCartButton = document.querySelector("[data-clear-cart]");
  const checkoutButton = document.querySelector("[data-checkout]");

  const toast = document.querySelector("[data-cart-toast]");
  const toastMessage = document.querySelector("[data-cart-toast-message]");

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

  function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

    renderCart();
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
     CART TOTALS STARTED
  ================================================== */

  function getTotalQuantity(cart) {
    return cart.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);
  }

  function getSubtotal(cart) {
    return cart.reduce((total, item) => {
      return total + Number(item.unitPrice || 0) * Number(item.quantity || 0);
    }, 0);
  }

  function getDeliveryCharge(subtotal) {
    if (subtotal === 0) {
      return 0;
    }

    return subtotal >= 999 ? 0 : 99;
  }

  /* ==================================================
     CART TOTALS ENDED
  ================================================== */

  /* ==================================================
     UPDATE CART COUNT STARTED
  ================================================== */

  function updateCartCount(cart) {
    const quantity = getTotalQuantity(cart);

    localStorage.setItem(CART_COUNT_KEY, String(quantity));

    if (cartCount) {
      cartCount.textContent = quantity;
    }

    if (cartItemCount) {
      cartItemCount.textContent = quantity;
    }
  }

  /* ==================================================
     UPDATE CART COUNT ENDED
  ================================================== */

  /* ==================================================
     TOAST STARTED
  ================================================== */

  function showToast(message) {
    if (!toast || !toastMessage) {
      return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  /* ==================================================
     TOAST ENDED
  ================================================== */

  /* ==================================================
     UPDATE ITEM QUANTITY STARTED
  ================================================== */

  function changeQuantity(itemId, change) {
    const cart = getCart();

    const item = cart.find((cartItem) => {
      return cartItem.id === itemId;
    });

    if (!item) {
      return;
    }

    item.quantity += change;

    if (item.quantity < 1) {
      item.quantity = 1;
    }

    if (item.quantity > 10) {
      item.quantity = 10;
    }

    item.totalPrice = Number(item.unitPrice) * Number(item.quantity);

    saveCart(cart);
  }

  /* ==================================================
     UPDATE ITEM QUANTITY ENDED
  ================================================== */

  /* ==================================================
     REMOVE CART ITEM STARTED
  ================================================== */

  function removeCartItem(itemId) {
    const cart = getCart();

    const updatedCart = cart.filter((item) => {
      return item.id !== itemId;
    });

    saveCart(updatedCart);

    showToast("Cake removed from your cart.");
  }

  /* ==================================================
     REMOVE CART ITEM ENDED
  ================================================== */

  /* ==================================================
     CREATE CART ITEM STARTED
  ================================================== */

  function createCartItem(item) {
    const article = document.createElement("article");

    article.className = "cart-item";

    const preferenceText =
      item.preference === "eggless" ? "Eggless" : "Regular";

    article.innerHTML = `
      <a
        href="cake-details.html?cake=${item.productKey}"
        class="cart-item-image"
        aria-label="View ${item.name}"
      >
        <img
          src="${item.image}"
          alt="${item.alt || item.name}"
        />
      </a>

      <div class="cart-item-info">
        <span class="cart-item-badge">
          Freshly Baked
        </span>

        <h3>${item.name}</h3>

        <div class="cart-item-meta">
          <span>${item.weight}</span>
          <span>${preferenceText}</span>
          <span>★ ${item.rating}</span>
        </div>

        <div class="cart-item-bottom">
          <div class="cart-item-quantity">
            <button
              type="button"
              aria-label="Decrease ${item.name} quantity"
              data-cart-minus
            >
              −
            </button>

            <strong>${item.quantity}</strong>

            <button
              type="button"
              aria-label="Increase ${item.name} quantity"
              data-cart-plus
            >
              +
            </button>
          </div>

          <button
            class="cart-item-remove"
            type="button"
            data-cart-remove
          >
            Remove
          </button>
        </div>
      </div>

      <div class="cart-item-price">
        <strong>
          ${formatPrice(Number(item.unitPrice) * Number(item.quantity))}
        </strong>

        <small>
          ${formatPrice(item.unitPrice)} each
        </small>
      </div>
    `;

    article.querySelector("[data-cart-minus]").addEventListener("click", () => {
      changeQuantity(item.id, -1);
    });

    article.querySelector("[data-cart-plus]").addEventListener("click", () => {
      changeQuantity(item.id, 1);
    });

    article
      .querySelector("[data-cart-remove]")
      .addEventListener("click", () => {
        removeCartItem(item.id);
      });

    return article;
  }

  /* ==================================================
     CREATE CART ITEM ENDED
  ================================================== */

  /* ==================================================
     RENDER ORDER SUMMARY STARTED
  ================================================== */

  function renderSummary(cart) {
    const subtotal = getSubtotal(cart);

    const delivery = getDeliveryCharge(subtotal);

    const total = subtotal + delivery;

    subtotalElement.textContent = formatPrice(subtotal);

    deliveryElement.textContent =
      delivery === 0 && subtotal > 0 ? "FREE" : formatPrice(delivery);

    totalElement.textContent = formatPrice(total);

    if (subtotal === 0) {
      deliveryMessage.textContent = "Add cakes to begin your order.";

      return;
    }

    if (subtotal >= 999) {
      deliveryMessage.textContent = "✓ You have unlocked FREE delivery.";

      return;
    }

    const amountNeeded = 999 - subtotal;

    deliveryMessage.textContent = `Add ${formatPrice(amountNeeded)} more for FREE delivery.`;
  }

  /* ==================================================
     RENDER ORDER SUMMARY ENDED
  ================================================== */

  /* ==================================================
     RENDER CART STARTED
  ================================================== */

  function renderCart() {
    const cart = getCart();

    updateCartCount(cart);

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartLayout.hidden = true;
      emptyCart.hidden = false;

      renderSummary([]);

      return;
    }

    cartLayout.hidden = false;
    emptyCart.hidden = true;

    cart.forEach((item) => {
      cartItemsContainer.appendChild(createCartItem(item));
    });

    renderSummary(cart);
  }

  /* ==================================================
     RENDER CART ENDED
  ================================================== */

  /* ==================================================
     CLEAR CART STARTED
  ================================================== */

  clearCartButton.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
      return;
    }

    const confirmed = window.confirm("Remove all cakes from your cart?");

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(CART_STORAGE_KEY);

    localStorage.setItem(CART_COUNT_KEY, "0");

    renderCart();

    showToast("Your cart has been cleared.");
  });

  /* ==================================================
     CLEAR CART ENDED
  ================================================== */

  /* ==================================================
   CHECKOUT STARTED
================================================== */

  checkoutButton.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
      return;
    }

    window.location.href = "checkout.html";
  });

  /* ==================================================
   CHECKOUT ENDED
================================================== */

  /* ==================================================
     INITIALIZE CART STARTED
  ================================================== */

  renderCart();

  /* ==================================================
     INITIALIZE CART ENDED
  ================================================== */
});

/* ==================================================
   CART PAGE ENDED
================================================== */
