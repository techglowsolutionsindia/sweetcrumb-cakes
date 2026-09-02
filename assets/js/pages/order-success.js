/* ==================================================
   ORDER SUCCESS PAGE STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const ORDER_STORAGE_KEY = "sweetcrumbLastOrder";
  const CART_COUNT_KEY = "sweetcrumbCartCount";

  const orderId = document.querySelector("[data-order-id]");
  const orderCustomer = document.querySelector("[data-order-customer]");
  const orderDelivery = document.querySelector("[data-order-delivery]");
  const orderPayment = document.querySelector("[data-order-payment]");
  const orderTotal = document.querySelector("[data-order-total]");
  const orderCount = document.querySelector("[data-order-count]");
  const orderItems = document.querySelector("[data-order-items]");
  const cartCount = document.querySelector("[data-cart-count]");

  /* ==================================================
     GET ORDER STARTED
  ================================================== */

  function getLastOrder() {
    try {
      const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);

      if (!storedOrder) {
        return null;
      }

      return JSON.parse(storedOrder);
    } catch (error) {
      return null;
    }
  }

  /* ==================================================
     GET ORDER ENDED
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
     FORMAT PAYMENT STARTED
  ================================================== */

  function formatPayment(payment) {
    if (payment === "upi") {
      return "UPI";
    }

    if (payment === "card") {
      return "Credit / Debit Card";
    }

    return "Cash on Delivery";
  }

  /* ==================================================
     FORMAT PAYMENT ENDED
  ================================================== */

  /* ==================================================
     FORMAT DELIVERY DATE STARTED
  ================================================== */

  function formatDeliveryDate(dateValue) {
    if (!dateValue) {
      return "";
    }

    const date = new Date(`${dateValue}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  /* ==================================================
     FORMAT DELIVERY DATE ENDED
  ================================================== */

  /* ==================================================
     FORMAT TIME SLOT STARTED
  ================================================== */

  function formatTimeSlot(slot) {
    const slots = {
      "10am-1pm": "10:00 AM – 1:00 PM",
      "1pm-4pm": "1:00 PM – 4:00 PM",
      "4pm-7pm": "4:00 PM – 7:00 PM",
      "7pm-9pm": "7:00 PM – 9:00 PM",
    };

    return slots[slot] || slot || "";
  }

  /* ==================================================
     FORMAT TIME SLOT ENDED
  ================================================== */

  /* ==================================================
     RENDER ITEMS STARTED
  ================================================== */

  function renderItems(items) {
    orderItems.innerHTML = "";

    items.forEach((item) => {
      const itemElement = document.createElement("article");

      itemElement.className = "order-success-item";

      const preference = item.preference === "eggless" ? "Eggless" : "Regular";

      const itemTotal = Number(item.unitPrice) * Number(item.quantity);

      itemElement.innerHTML = `
        <div class="order-success-item-image">
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

      orderItems.appendChild(itemElement);
    });
  }

  /* ==================================================
     RENDER ITEMS ENDED
  ================================================== */

  /* ==================================================
     INITIALIZE STARTED
  ================================================== */

  const order = getLastOrder();

  if (!order) {
    window.location.href = "cakes.html";

    return;
  }

  const customer = order.customer || {};
  const items = Array.isArray(order.items) ? order.items : [];

  orderId.textContent = order.orderId || "SweetCrumb Order";

  orderCustomer.textContent =
    `${customer.fullName || ""}, ${customer.address || ""}, ` +
    `${customer.city || ""}, ${customer.state || ""} - ` +
    `${customer.pincode || ""}`;

  orderDelivery.textContent =
    `${formatDeliveryDate(customer.deliveryDate)} · ` +
    `${formatTimeSlot(customer.deliveryTime)}`;

  orderPayment.textContent = formatPayment(customer.payment);

  orderTotal.textContent = formatPrice(order.total || 0);

  const totalQuantity = items.reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);

  orderCount.textContent = `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`;

  renderItems(items);

  localStorage.setItem(CART_COUNT_KEY, "0");

  if (cartCount) {
    cartCount.textContent = "0";
  }

  /* ==================================================
     INITIALIZE ENDED
  ================================================== */
});

/* ==================================================
   ORDER SUCCESS PAGE ENDED
================================================== */
