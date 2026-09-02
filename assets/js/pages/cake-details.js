/* ==================================================
   CAKE DETAILS PAGE STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     CAKE PRODUCT DATA STARTED
  ================================================== */

  const cakeProducts = {
    "belgian-chocolate-truffle": {
      name: "Belgian Chocolate Truffle",
      image: "assets/images/cakes/products/belgian-chocolate-truffle.webp",
      alt: "Belgian Chocolate Truffle Cake",
      badge: "Best Seller",
      rating: "4.8",
      reviews: "236",
      basePrice: 749,
      description:
        "A decadent chocolate celebration layered with rich Belgian chocolate, silky truffle cream and luxurious dark chocolate ganache.",
      ingredients:
        "Belgian chocolate, fresh cream, cocoa, chocolate sponge and premium chocolate truffle.",
    },

    "fresh-strawberry-delight": {
      name: "Fresh Strawberry Delight",
      image: "assets/images/cakes/products/fresh-strawberry-delight.webp",
      alt: "Fresh Strawberry Delight Cake",
      badge: "Fresh Favourite",
      rating: "4.7",
      reviews: "182",
      basePrice: 699,
      description:
        "A light and refreshing celebration cake layered with soft vanilla sponge, silky cream and beautifully fresh strawberry flavours.",
      ingredients:
        "Fresh strawberries, whipped cream, vanilla sponge, strawberry compote and premium dairy cream.",
    },

    "red-velvet-celebration": {
      name: "Red Velvet Celebration",
      image: "assets/images/cakes/products/red-velvet-celebration.webp",
      alt: "Red Velvet Celebration Cake",
      badge: "Popular",
      rating: "4.8",
      reviews: "205",
      basePrice: 799,
      description:
        "A luxurious red velvet favourite featuring soft moist layers, velvety cream-cheese frosting and delicate red velvet crumb detailing.",
      ingredients:
        "Red velvet sponge, cream-cheese frosting, premium cocoa, fresh cream and velvet crumbs.",
    },

    "chocolate-ganache-cake": {
      name: "Chocolate Ganache Cake",
      image: "assets/images/cakes/products/chocolate-ganache-cake.webp",
      alt: "Chocolate Ganache Cake",
      badge: "Chocolate Favourite",
      rating: "4.6",
      reviews: "164",
      basePrice: 699,
      description:
        "An indulgent chocolate cake finished with silky chocolate frosting and a rich glossy ganache drip for pure chocolate satisfaction.",
      ingredients:
        "Dark chocolate ganache, chocolate sponge, fresh cream, cocoa and premium chocolate.",
    },

    "mango-bliss-cake": {
      name: "Mango Bliss Cake",
      image: "assets/images/cakes/products/mango-bliss-cake.webp",
      alt: "Mango Bliss Cake",
      badge: "Tropical Favourite",
      rating: "4.7",
      reviews: "118",
      basePrice: 649,
      description:
        "A bright tropical delight with fluffy vanilla sponge, smooth whipped cream and luscious ripe mango flavours in every bite.",
      ingredients:
        "Ripe mango, mango glaze, vanilla sponge, whipped cream and white chocolate.",
    },

    "black-forest-cake": {
      name: "Black Forest Cake",
      image: "assets/images/cakes/products/black-forest-cake.webp",
      alt: "Black Forest Cake",
      badge: "Classic Favourite",
      rating: "4.6",
      reviews: "187",
      basePrice: 699,
      description:
        "A timeless bakery favourite combining rich chocolate sponge, smooth whipped cream, cherries and generous dark chocolate shavings.",
      ingredients:
        "Chocolate sponge, whipped cream, cherries, dark chocolate and cocoa.",
    },

    "hazelnut-crunch-cake": {
      name: "Hazelnut Crunch Cake",
      image: "assets/images/cakes/products/hazelnut-crunch-cake.webp",
      alt: "Hazelnut Crunch Cake",
      badge: "Premium Pick",
      rating: "4.8",
      reviews: "133",
      basePrice: 899,
      description:
        "A luxurious chocolate-hazelnut creation combining smooth milk-chocolate cream, roasted hazelnuts and irresistible crunchy textures.",
      ingredients:
        "Roasted hazelnuts, milk chocolate, chocolate sponge, praline cream and hazelnut crunch.",
    },

    "blueberry-cheesecake": {
      name: "Blueberry Cheesecake",
      image: "assets/images/cakes/products/blueberry-cheesecake.webp",
      alt: "Blueberry Cheesecake",
      badge: "Cheesecake Favourite",
      rating: "4.7",
      reviews: "96",
      basePrice: 749,
      description:
        "A smooth creamy cheesecake with a delicate biscuit base, premium blueberry finish and refreshing bursts of real blueberries.",
      ingredients:
        "Cream cheese, blueberries, biscuit crumb, fresh cream and blueberry glaze.",
    },
  };

  /* ==================================================
     CAKE PRODUCT DATA ENDED
  ================================================== */

  /* ==================================================
     SELECT CURRENT PRODUCT STARTED
  ================================================== */

  const params = new URLSearchParams(window.location.search);

  const productKey = params.get("cake") || "belgian-chocolate-truffle";

  const product =
    cakeProducts[productKey] || cakeProducts["belgian-chocolate-truffle"];

  /* ==================================================
     SELECT CURRENT PRODUCT ENDED
  ================================================== */

  /* ==================================================
     DOM ELEMENTS STARTED
  ================================================== */

  const productName = document.querySelector("[data-product-name]");
  const productBreadcrumb = document.querySelector("[data-product-breadcrumb]");
  const productImage = document.querySelector("[data-product-image]");
  const productBadge = document.querySelector("[data-product-badge]");
  const productRating = document.querySelector("[data-product-rating]");
  const productReviews = document.querySelector("[data-product-reviews]");
  const productPrice = document.querySelector("[data-product-price]");
  const productDescription = document.querySelector(
    "[data-product-description]",
  );
  const productIngredients = document.querySelector(
    "[data-product-ingredients]",
  );

  const weightOptions = document.querySelector("[data-weight-options]");

  const quantityText = document.querySelector("[data-product-quantity]");
  const quantityMinus = document.querySelector("[data-qty-minus]");
  const quantityPlus = document.querySelector("[data-qty-plus]");

  const addToCartButton = document.querySelector("[data-add-to-cart]");
  const buyNowButton = document.querySelector("[data-buy-now]");

  const wishlistButton = document.querySelector("[data-product-wishlist]");

  const cartCount = document.querySelector("[data-cart-count]");

  const toast = document.querySelector("[data-cake-toast]");
  const toastProduct = document.querySelector("[data-toast-product]");

  /* ==================================================
     DOM ELEMENTS ENDED
  ================================================== */

  /* ==================================================
     PRODUCT STATE STARTED
  ================================================== */

  let selectedWeight = "0.5 kg";
  let selectedPrice = product.basePrice;
  let quantity = 1;

  /* ==================================================
     PRODUCT STATE ENDED
  ================================================== */

  /* ==================================================
     RENDER PRODUCT STARTED
  ================================================== */

  function renderProduct() {
    document.title = `${product.name} | SweetCrumb Cakes`;

    productName.textContent = product.name;
    productBreadcrumb.textContent = product.name;

    productImage.src = product.image;
    productImage.alt = product.alt;

    productBadge.textContent = product.badge;

    productRating.textContent = product.rating;
    productReviews.textContent = product.reviews;

    productDescription.textContent = product.description;
    productIngredients.textContent = product.ingredients;

    renderWeightOptions();

    updatePrice();
  }

  /* ==================================================
     RENDER PRODUCT ENDED
  ================================================== */

  /* ==================================================
     WEIGHT OPTIONS STARTED
  ================================================== */

  function getWeightPrices() {
    return [
      {
        weight: "0.5 kg",
        price: product.basePrice,
      },

      {
        weight: "1 kg",
        price: product.basePrice + 450,
      },

      {
        weight: "1.5 kg",
        price: product.basePrice + 850,
      },
    ];
  }

  /* ==================================================
   WEIGHT OPTIONS STARTED
================================================== */

  function renderWeightOptions() {
    const prices = getWeightPrices();

    weightOptions.innerHTML = "";

    prices.forEach((option, index) => {
      const button = document.createElement("button");

      button.type = "button";

      button.className = "cake-weight-btn";

      if (index === 0) {
        button.classList.add("active");
      }

      button.innerHTML = `
      <strong>${option.weight}</strong>
      <small>₹${option.price}</small>
    `;

      button.addEventListener("click", () => {
        document
          .querySelectorAll(".cake-weight-btn")
          .forEach((item) => item.classList.remove("active"));

        button.classList.add("active");

        selectedWeight = option.weight;
        selectedPrice = option.price;

        /* RESET QUANTITY WHEN WEIGHT CHANGES */
        quantity = 1;
        quantityText.textContent = quantity;

        updatePrice();
      });

      weightOptions.appendChild(button);
    });
  }

  /* ==================================================
   WEIGHT OPTIONS ENDED
================================================== */

  /* ==================================================
     WEIGHT OPTIONS ENDED
  ================================================== */

  /* ==================================================
     PRICE STARTED
  ================================================== */

  function updatePrice() {
    const totalPrice = selectedPrice * quantity;

    productPrice.textContent = `₹${totalPrice}`;
  }

  /* ==================================================
     PRICE ENDED
  ================================================== */

  /* ==================================================
     QUANTITY STARTED
  ================================================== */

  quantityMinus.addEventListener("click", () => {
    if (quantity <= 1) {
      return;
    }

    quantity -= 1;

    quantityText.textContent = quantity;

    updatePrice();
  });

  quantityPlus.addEventListener("click", () => {
    if (quantity >= 10) {
      return;
    }

    quantity += 1;

    quantityText.textContent = quantity;

    updatePrice();
  });

  /* ==================================================
     QUANTITY ENDED
  ================================================== */

  /* ==================================================
   PREFERENCE STARTED
================================================== */

  document
    .querySelectorAll('input[name="cake-preference"]')
    .forEach((input) => {
      input.addEventListener("change", () => {
        document.querySelectorAll(".cake-choice").forEach((choice) => {
          choice.classList.remove("active");
        });

        input.closest(".cake-choice").classList.add("active");

        /* RESET QUANTITY WHEN PREFERENCE CHANGES */
        quantity = 1;
        quantityText.textContent = quantity;

        updatePrice();
      });
    });

  /* ==================================================
   PREFERENCE ENDED
================================================== */

  /* ==================================================
     WISHLIST STARTED
  ================================================== */

  wishlistButton.addEventListener("click", () => {
    wishlistButton.classList.toggle("active");

    wishlistButton.textContent = wishlistButton.classList.contains("active")
      ? "♥"
      : "♡";
  });

  /* ==================================================
     WISHLIST ENDED
  ================================================== */

  /* ==================================================
     CART STORAGE STARTED
  ================================================== */

  const CART_STORAGE_KEY = "sweetcrumbCart";
  const CART_COUNT_KEY = "sweetcrumbCartCount";

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

    updateCartCount(cart);
  }

  /* ==================================================
     CART STORAGE ENDED
  ================================================== */

  /* ==================================================
     CART COUNT STARTED
  ================================================== */

  function getCartCount(cart = getCart()) {
    return cart.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);
  }

  function updateCartCount(cart = getCart()) {
    const totalItems = getCartCount(cart);

    localStorage.setItem(CART_COUNT_KEY, String(totalItems));

    if (!cartCount) {
      return;
    }

    cartCount.textContent = totalItems;
  }

  /* ==================================================
     CART COUNT ENDED
  ================================================== */

  /* ==================================================
     SELECTED PREFERENCE STARTED
  ================================================== */

  function getSelectedPreference() {
    const selectedPreference = document.querySelector(
      'input[name="cake-preference"]:checked',
    );

    return selectedPreference ? selectedPreference.value : "eggless";
  }

  /* ==================================================
     SELECTED PREFERENCE ENDED
  ================================================== */

  /* ==================================================
     CREATE CART ITEM STARTED
  ================================================== */

  function createCartItem() {
    const preference = getSelectedPreference();

    return {
      id: `${productKey}-${selectedWeight}-${preference}`
        .toLowerCase()
        .replace(/\s+/g, "-"),

      productKey: productKey,

      name: product.name,

      image: product.image,

      alt: product.alt,

      weight: selectedWeight,

      preference: preference,

      quantity: quantity,

      unitPrice: selectedPrice,

      totalPrice: selectedPrice * quantity,

      rating: product.rating,

      reviews: product.reviews,
    };
  }

  /* ==================================================
     CREATE CART ITEM ENDED
  ================================================== */

  /* ==================================================
     TOAST STARTED
  ================================================== */

  function showToast() {
    toastProduct.textContent = `${product.name} (${selectedWeight}) added successfully.`;

    toast.classList.add("show");

    window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  /* ==================================================
     TOAST ENDED
  ================================================== */

  /* ==================================================
     ADD PRODUCT TO CART STARTED
  ================================================== */

  function addProductToCart(showSuccessMessage = true) {
    const cart = getCart();

    const newItem = createCartItem();

    const existingItemIndex = cart.findIndex((item) => {
      return item.id === newItem.id;
    });

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += newItem.quantity;

      cart[existingItemIndex].unitPrice = newItem.unitPrice;

      cart[existingItemIndex].totalPrice =
        cart[existingItemIndex].unitPrice * cart[existingItemIndex].quantity;
    } else {
      cart.push(newItem);
    }

    saveCart(cart);

    if (showSuccessMessage) {
      showToast();
    }

    return newItem;
  }

  /* ==================================================
     ADD PRODUCT TO CART ENDED
  ================================================== */

  /* ==================================================
     ADD TO CART BUTTON STARTED
  ================================================== */

  addToCartButton.addEventListener("click", () => {
    addProductToCart(true);
  });

  /* ==================================================
     ADD TO CART BUTTON ENDED
  ================================================== */

  /* ==================================================
     BUY NOW STARTED
  ================================================== */

  buyNowButton.addEventListener("click", () => {
    addProductToCart(false);

    window.location.href = "cart.html";
  });

  /* ==================================================
     BUY NOW ENDED
  ================================================== */

  /* ==================================================
     INITIALIZE PAGE STARTED
  ================================================== */

  renderProduct();
  updateCartCount();

  /* ==================================================
     INITIALIZE PAGE ENDED
  ================================================== */
});

/* ==================================================
   CAKE DETAILS PAGE ENDED
================================================== */
