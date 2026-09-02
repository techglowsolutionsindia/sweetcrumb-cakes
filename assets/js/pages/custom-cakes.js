/* ==================================================
   CUSTOM CAKES PAGE STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     CART COUNT STARTED
  ================================================== */

  const CART_STORAGE_KEY = "sweetcrumbCart";

  const cartCount = document.querySelector("[data-custom-cart-count]");

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

  function updateCartCount() {
    const cart = getCart();

    const totalQuantity = cart.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);

    if (cartCount) {
      cartCount.textContent = totalQuantity;
    }
  }

  updateCartCount();

  /* ==================================================
     CART COUNT ENDED
  ================================================== */

  /* ==================================================
     CUSTOMIZATION OPTIONS INTERACTION STARTED
  ================================================== */

  const customOptionCards = document.querySelectorAll(".custom-option-card");

  const customPreviewNumber = document.getElementById("custom-preview-number");

  const customPreviewTitle = document.getElementById("custom-preview-title");

  const customPreviewDescription = document.getElementById(
    "custom-preview-description",
  );

  const customPreviewTags = document.getElementById("custom-preview-tags");

  const customOptionsImage = document.getElementById("custom-options-image");

  const customOptionData = {
    style: {
      number: "01",

      title: "Choose Your Cake Style",

      description:
        "Begin with a design direction that reflects your celebration and personality.",

      tags: ["Elegant", "Floral", "Minimal", "Themed"],

      image:
        "assets/images/custom-cakes/customization-options/custom-options.webp",

      alt: "Elegant personalised custom cake style",
    },

    flavour: {
      number: "02",

      title: "Pick Your Favourite Flavour",

      description:
        "Pair delicious sponge flavours with rich fillings and creams for the perfect celebration bite.",

      tags: ["Chocolate", "Vanilla", "Red Velvet", "Fruit"],

      image:
        "assets/images/custom-cakes/customization-options/custom-flavour.webp",

      alt: "Custom cake flavour selection with premium ingredients",
    },

    size: {
      number: "03",

      title: "Choose the Perfect Size",

      description:
        "Select a cake size and tier arrangement designed around your celebration and guest count.",

      tags: ["1 Tier", "2 Tier", "3 Tier", "Grand"],

      image:
        "assets/images/custom-cakes/customization-options/custom-size.webp",

      alt: "Three tier custom celebration cake",
    },

    theme: {
      number: "04",

      title: "Set Your Colour & Theme",

      description:
        "Bring your celebration palette to life with beautifully coordinated colours and creative themes.",

      tags: ["Pastel", "Romantic", "Luxury", "Colourful"],

      image:
        "assets/images/custom-cakes/customization-options/custom-theme.webp",

      alt: "Personalised custom cake colour and theme",
    },

    decoration: {
      number: "05",

      title: "Add Beautiful Decorations",

      description:
        "Complete your cake with handcrafted flowers, toppers, chocolates and elegant finishing details.",

      tags: ["Flowers", "Toppers", "Chocolate", "Gold"],

      image:
        "assets/images/custom-cakes/customization-options/custom-decoration.webp",

      alt: "Handcrafted custom cake decorations",
    },

    message: {
      number: "06",

      title: "Add Your Personal Message",

      description:
        "Make the cake unmistakably theirs with a personalised name, greeting or heartfelt celebration message.",

      tags: ["Name", "Wish", "Greeting", "Message"],

      image:
        "assets/images/custom-cakes/customization-options/custom-message.webp",

      alt: "Personalised celebration cake with blank message plaque",
    },
  };

  /* ==================================================
     UPDATE CUSTOM OPTION STARTED
  ================================================== */

  function updateCustomOption(optionKey) {
    const option = customOptionData[optionKey];

    if (
      !option ||
      !customPreviewNumber ||
      !customPreviewTitle ||
      !customPreviewDescription ||
      !customPreviewTags ||
      !customOptionsImage
    ) {
      return;
    }

    customPreviewNumber.textContent = option.number;

    customPreviewTitle.textContent = option.title;

    customPreviewDescription.textContent = option.description;

    customPreviewTags.innerHTML = option.tags
      .map((tag) => {
        return `<span>${tag}</span>`;
      })
      .join("");

    customOptionsImage.style.opacity = "0";

    window.setTimeout(() => {
      customOptionsImage.src = option.image;

      customOptionsImage.alt = option.alt;

      customOptionsImage.style.opacity = "1";
    }, 180);
  }

  /* ==================================================
     UPDATE CUSTOM OPTION ENDED
  ================================================== */

  /* ==================================================
     CUSTOM OPTION CARD CLICK STARTED
  ================================================== */

  customOptionCards.forEach((card) => {
    card.addEventListener("click", () => {
      customOptionCards.forEach((item) => {
        item.classList.remove("active");
      });

      card.classList.add("active");

      const optionKey = card.dataset.customOption;

      updateCustomOption(optionKey);
    });
  });

  /* ==================================================
     CUSTOM OPTION CARD CLICK ENDED
  ================================================== */

  /* ==================================================
     INITIAL CUSTOM OPTION STARTED
  ================================================== */

  if (customOptionCards.length > 0) {
    updateCustomOption("style");
  }

  /* ==================================================
     INITIAL CUSTOM OPTION ENDED
  ================================================== */

  /* ==================================================
     CUSTOMIZATION OPTIONS INTERACTION ENDED
  ================================================== */

  /* ==================================================
     CHOOSE YOUR CAKE INTERACTION STARTED
  ================================================== */

  const chooseCakeCards = document.querySelectorAll(".choose-cake-card");

  const selectedCakeName = document.querySelector("[data-selected-cake-name]");

  const selectedCakeDescription = document.querySelector(
    "[data-selected-cake-description]",
  );

  const chooseCakeData = {
    "classic-round": {
      name: "Classic Round",

      description: "10–20 servings · Starting from ₹899",
    },

    "tall-celebration": {
      name: "Tall Celebration",

      description: "15–25 servings · Starting from ₹1,199",
    },

    "two-tier": {
      name: "Two-Tier Cake",

      description: "30–45 servings · Starting from ₹2,499",
    },

    "three-tier": {
      name: "Three-Tier Cake",

      description: "50–80 servings · Starting from ₹4,499",
    },

    "designer-shape": {
      name: "Designer Shape",

      description: "Custom servings · Starting from ₹1,499",
    },

    "cupcake-set": {
      name: "Cupcake Set",

      description: "12+ pieces · Starting from ₹799",
    },
  };

  chooseCakeCards.forEach((card) => {
    const selectButton = card.querySelector("[data-select-cake]");

    if (!selectButton) {
      return;
    }

    selectButton.addEventListener("click", () => {
      chooseCakeCards.forEach((item) => {
        item.classList.remove("active");

        const button = item.querySelector("[data-select-cake]");

        if (button) {
          button.innerHTML = `
            Select Style
            <span>→</span>
          `;
        }
      });

      card.classList.add("active");

      selectButton.innerHTML = `
        Selected
        <span>✓</span>
      `;

      const cakeKey = card.dataset.cakeStyle;

      const selectedCake = chooseCakeData[cakeKey];

      if (!selectedCake) {
        return;
      }

      if (selectedCakeName) {
        selectedCakeName.textContent = selectedCake.name;
      }

      if (selectedCakeDescription) {
        selectedCakeDescription.textContent = selectedCake.description;
      }
    });
  });

  /* ==================================================
     CHOOSE YOUR CAKE INTERACTION ENDED
  ================================================== */

  /* ==================================================
     FLAVOURS & FILLINGS INTERACTION STARTED
  ================================================== */

  const flavourCards = document.querySelectorAll(".flavour-card");

  const flavourNumber = document.querySelector("[data-flavour-number]");

  const flavourName = document.querySelector("[data-flavour-name]");

  const flavourDescription = document.querySelector(
    "[data-flavour-description]",
  );

  const flavourFilling = document.querySelector("[data-flavour-filling]");

  const flavourProfile = document.querySelector("[data-flavour-profile]");

  const flavourData = {
    "belgian-chocolate": {
      number: "01",

      name: "Belgian Chocolate",

      description:
        "Rich Belgian chocolate sponge layered with silky chocolate ganache for a deeply indulgent celebration favourite.",

      filling: "Chocolate Ganache",

      profile: "Rich · Smooth · Indulgent",
    },

    "vanilla-berry": {
      number: "02",

      name: "Vanilla Berry",

      description:
        "Light vanilla sponge paired with smooth vanilla cream and bright berry flavours for a fresh, elegant finish.",

      filling: "Vanilla Cream & Berry",

      profile: "Light · Fruity · Creamy",
    },

    "red-velvet": {
      number: "03",

      name: "Red Velvet",

      description:
        "Velvety cocoa sponge layered with smooth cream-cheese filling for a timeless flavour with a romantic touch.",

      filling: "Cream Cheese",

      profile: "Velvety · Creamy · Classic",
    },

    "mango-passion": {
      number: "04",

      name: "Mango Passion",

      description:
        "Fresh tropical mango flavour balanced with bright passion-fruit notes for a vibrant and refreshing celebration cake.",

      filling: "Mango & Passion Fruit",

      profile: "Tropical · Fresh · Bright",
    },
  };

  flavourCards.forEach((card) => {
    const button = card.querySelector(".flavour-card-button");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const flavourKey = card.dataset.flavour;

      const selectedFlavour = flavourData[flavourKey];

      if (!selectedFlavour) {
        return;
      }

      flavourCards.forEach((item) => {
        item.classList.remove("active");
      });

      card.classList.add("active");

      if (flavourNumber) {
        flavourNumber.textContent = selectedFlavour.number;
      }

      if (flavourName) {
        flavourName.textContent = selectedFlavour.name;
      }

      if (flavourDescription) {
        flavourDescription.textContent = selectedFlavour.description;
      }

      if (flavourFilling) {
        flavourFilling.textContent = selectedFlavour.filling;
      }

      if (flavourProfile) {
        flavourProfile.textContent = selectedFlavour.profile;
      }
    });
  });

  /* ==================================================
     FLAVOURS & FILLINGS INTERACTION ENDED
  ================================================== */

  /* ==================================================
     CUSTOM ENQUIRY INTERACTION STARTED
  ================================================== */

  const customEnquiryForm = document.getElementById("custom-enquiry-form");

  const customEnquiryToast = document.getElementById("custom-enquiry-toast");

  const customDateInput = document.getElementById("custom-date");

  /* ==================================================
     MINIMUM CELEBRATION DATE STARTED
  ================================================== */

  if (customDateInput) {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    customDateInput.min = `${year}-${month}-${day}`;
  }

  /* ==================================================
     MINIMUM CELEBRATION DATE ENDED
  ================================================== */

  /* ==================================================
     CUSTOM ENQUIRY SUBMIT STARTED
  ================================================== */

  if (customEnquiryForm) {
    customEnquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!customEnquiryForm.checkValidity()) {
        customEnquiryForm.reportValidity();

        return;
      }

      if (customEnquiryToast) {
        customEnquiryToast.classList.add("show");

        window.setTimeout(() => {
          customEnquiryToast.classList.remove("show");
        }, 3500);
      }

      customEnquiryForm.reset();
    });
  }

  /* ==================================================
     CUSTOM ENQUIRY SUBMIT ENDED
  ================================================== */

  /* ==================================================
     CUSTOM ENQUIRY INTERACTION ENDED
  ================================================== */
});

/* ==================================================
   CUSTOM CAKES PAGE ENDED
================================================== */
