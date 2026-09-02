/* ==================================================
   SWEETCRUMB CAKES - GLOBAL JAVASCRIPT STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("[data-header]");
  const navbar = document.querySelector("[data-navbar]");
  const menuToggle = document.querySelector("[data-menu-toggle]");

  const dropdownTriggers = document.querySelectorAll("[data-dropdown-trigger]");

  /* ==================================================
     STICKY HEADER STATE
  ================================================== */

  const updateHeaderState = () => {
    if (!header) return;

    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeaderState();

  window.addEventListener("scroll", updateHeaderState, {
    passive: true,
  });

  /* ==================================================
     MOBILE MENU
  ================================================== */

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-active");

      menuToggle.classList.toggle("is-active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
    });
  }

  /* ==================================================
   NAVBAR DROPDOWNS STARTED
================================================== */

  const dropdownItems = document.querySelectorAll(".navbar-dropdown");

  const closeAllDropdowns = (exceptDropdown = null) => {
    dropdownItems.forEach((dropdown) => {
      if (dropdown === exceptDropdown) {
        return;
      }

      dropdown.classList.remove("is-open");

      const dropdownTrigger = dropdown.querySelector("[data-dropdown-trigger]");

      dropdownTrigger?.setAttribute("aria-expanded", "false");
    });
  };

  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const parent = trigger.closest(".navbar-dropdown");

      if (!parent) {
        return;
      }

      const wasOpen = parent.classList.contains("is-open");

      closeAllDropdowns(parent);

      if (wasOpen) {
        parent.classList.remove("is-open");

        trigger.setAttribute("aria-expanded", "false");
      } else {
        parent.classList.add("is-open");

        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ==================================================
   CLOSE DROPDOWN ON OUTSIDE CLICK STARTED
================================================== */

  document.addEventListener("click", (event) => {
    if (event.target.closest(".navbar-dropdown")) {
      return;
    }

    closeAllDropdowns();
  });

  /* ==================================================
   CLOSE DROPDOWN ON OUTSIDE CLICK ENDED
================================================== */

  /* ==================================================
   CLOSE DROPDOWN WITH ESCAPE KEY STARTED
================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeAllDropdowns();
  });

  /* ==================================================
   NAVBAR DROPDOWNS ENDED
================================================== */

  /* ==================================================
     CLOSE MOBILE MENU AFTER LINK CLICK
  ================================================== */

  if (navbar && menuToggle) {
    navbar.addEventListener("click", (event) => {
      const clickedLink = event.target.closest("a");

      if (!clickedLink || window.innerWidth > 991) return;

      navbar.classList.remove("is-active");
      menuToggle.classList.remove("is-active");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  }

  /* ==================================================
     EXACT HOMEPAGE SECTION NAVIGATION
  ================================================== */

  const sectionLinks = document.querySelectorAll('a[href^="#"]');

  sectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);

      if (!targetSection) return;

      event.preventDefault();

      const stickyHeaderHeight = header?.getBoundingClientRect().height || 0;

      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        stickyHeaderHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      history.replaceState(null, "", targetId);
    });
  });

  /* ==================================================
     RESET MOBILE STATES ON DESKTOP
  ================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 991) return;

    navbar?.classList.remove("is-active");
    menuToggle?.classList.remove("is-active");

    menuToggle?.setAttribute("aria-expanded", "false");

    document
      .querySelectorAll(".navbar-dropdown.is-open")
      .forEach((dropdown) => {
        dropdown.classList.remove("is-open");

        const trigger = dropdown.querySelector("[data-dropdown-trigger]");

        trigger?.setAttribute("aria-expanded", "false");
      });
  });
});

/* ==================================================
   SWEETCRUMB CAKES - GLOBAL JAVASCRIPT ENDED
================================================== */

/* ==================================================
   ACTIVE NAVBAR LINK ON SECTION SCROLL STARTED
================================================== */

(() => {
  const navbarLinks = document.querySelectorAll(".navbar-link");

  const sectionNavMap = {
    about: document.querySelector('.navbar-link[href="#about"]'),

    cakes: document.querySelector(".navbar-dropdown .dropdown-trigger"),

    "best-sellers": document.querySelector(
      ".navbar-dropdown .dropdown-trigger",
    ),

    /* ==================================================
   WHY CHOOSE + OCCASIONS NAVBAR MAPPING
================================================== */

    "why-sweetcrumb": document.querySelector(
      '.navbar-link[href="#why-sweetcrumb"]',
    ),

    "special-occasions": document.querySelectorAll(
      ".navbar-dropdown .dropdown-trigger",
    )[1],
  };

  const pageSections = Array.from(
    document.querySelectorAll("main section[id]"),
  );

  /* ==================================================
     REMOVE ALL ACTIVE NAVBAR STATES
  ================================================== */

  const clearActiveNavbarLinks = () => {
    navbarLinks.forEach((link) => {
      link.classList.remove("active");
    });
  };

  /* ==================================================
     UPDATE ACTIVE NAVBAR LINK
  ================================================== */

  const updateActiveNavbarLink = () => {
    const header = document.querySelector(".site-header");

    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    const activationPoint =
      headerHeight + (window.innerHeight - headerHeight) * 0.32;

    let currentSection = null;

    pageSections.forEach((section) => {
      const sectionRect = section.getBoundingClientRect();

      if (
        sectionRect.top <= activationPoint &&
        sectionRect.bottom > activationPoint
      ) {
        currentSection = section;
      }
    });

    clearActiveNavbarLinks();

    if (!currentSection) return;

    const relatedNavbarLink = sectionNavMap[currentSection.id];

    if (!relatedNavbarLink) return;

    relatedNavbarLink.classList.add("active");
  };

  /* ==================================================
     SCROLL AND RESIZE EVENTS
  ================================================== */

  window.addEventListener("scroll", updateActiveNavbarLink, { passive: true });

  window.addEventListener("resize", updateActiveNavbarLink);

  window.addEventListener("load", updateActiveNavbarLink);

  updateActiveNavbarLink();
})();

/* ==================================================
   ACTIVE NAVBAR LINK ON SECTION SCROLL ENDED
================================================== */

/* ==================================================
   WHY SWEETCRUMB SCROLL REVEAL STARTED
================================================== */

(() => {
  const whySweetCrumbSection = document.querySelector("#why-sweetcrumb");

  if (!whySweetCrumbSection) return;

  const observer = new IntersectionObserver(
    (entries, sectionObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        sectionObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(whySweetCrumbSection);
})();

/* ==================================================
   WHY SWEETCRUMB SCROLL REVEAL ENDED
================================================== */

/* ==================================================
   FAQ SMOOTH SINGLE OPEN ACCORDION STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-home-item");

  faqItems.forEach((item) => {
    const summary = item.querySelector("summary");

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      const isOpen = item.hasAttribute("open");

      faqItems.forEach((otherItem) => {
        otherItem.removeAttribute("open");
      });

      if (!isOpen) {
        item.setAttribute("open", "");
      }
    });
  });
});

/* ==================================================
   FAQ SMOOTH SINGLE OPEN ACCORDION ENDED
================================================== */

/* ==================================================
   GLOBAL CROSS-PAGE ANCHOR SCROLL FIX STARTED
================================================== */

(() => {
  const scrollToCurrentHash = () => {
    const hash = window.location.hash;

    if (!hash || hash === "#") return;

    let targetSection = null;

    try {
      targetSection = document.querySelector(hash);
    } catch (error) {
      return;
    }

    if (!targetSection) return;

    const header = document.querySelector("[data-header]");

    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    const targetPosition =
      targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "auto",
    });
  };

  window.addEventListener("load", () => {
    /*
     * Allow the browser to finish its native hash jump first,
     * then correct the final position below the sticky navbar.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToCurrentHash);
    });
  });
})();

/* ==================================================
   GLOBAL CROSS-PAGE ANCHOR SCROLL FIX ENDED
================================================== */

/* ==================================================
   GLOBAL SWEETCRUMB SEARCH STARTED
================================================== */

(() => {
  const searchButtons = document.querySelectorAll("[data-search-open]");

  if (!searchButtons.length) return;

  /* ==================================================
     SEARCH DATA STARTED
  ================================================== */

  const searchItems = [
    {
      title: "About SweetCrumb",
      category: "Our Story",
      description: "Learn about our bakery, ingredients and craftsmanship.",
      keywords: "about bakery story sweetcrumb fresh baked",
      url: "index.html#about",
    },

    {
      title: "Cake Collection",
      category: "Cakes",
      description:
        "Browse cakes for birthdays, anniversaries and celebrations.",
      keywords: "cakes cake collection birthday anniversary chocolate",
      url: "index.html#cakes",
    },

    {
      title: "Best Selling Cakes",
      category: "Customer Favourites",
      description: "Discover SweetCrumb's most-loved celebration cakes.",
      keywords: "best sellers popular cakes chocolate strawberry red velvet",
      url: "index.html#best-sellers",
    },

    {
      title: "Why Choose SweetCrumb",
      category: "Why SweetCrumb",
      description:
        "Fresh ingredients, careful preparation and reliable service.",
      keywords: "why choose fresh ingredients delivery quality",
      url: "index.html#why-sweetcrumb",
    },

    {
      title: "All Cakes",
      category: "Cake Shop",
      description: "Explore the complete SweetCrumb cake collection.",
      keywords: "all cakes shop collection flavours order",
      url: "cakes.html",
    },

    {
      title: "Belgian Chocolate Truffle",
      category: "Chocolate Cake",
      description: "Rich Belgian chocolate cake with silky ganache.",
      keywords: "belgian chocolate truffle chocolate cake",
      url: "cake-details.html",
    },

    {
      title: "Custom Cakes",
      category: "Personalised Cakes",
      description: "Create a cake designed especially for your celebration.",
      keywords: "custom personalised cake design dream cake",
      url: "custom-cakes.html",
    },

    {
      title: "Birthday Cakes",
      category: "Occasions",
      description: "Joyful cakes created for unforgettable birthday moments.",
      keywords: "birthday cakes birthday occasion celebration",
      url: "occasions.html#birthday",
    },

    {
      title: "Anniversary Cakes",
      category: "Occasions",
      description: "Romantic cake designs for meaningful milestones.",
      keywords: "anniversary romantic cakes celebration",
      url: "occasions.html#anniversary",
    },

    {
      title: "Wedding Cakes",
      category: "Occasions",
      description: "Elegant tiered cakes for unforgettable weddings.",
      keywords: "wedding bridal cake tiers marriage",
      url: "occasions.html#wedding",
    },

    {
      title: "Engagement Cakes",
      category: "Occasions",
      description: "Beautiful cakes for engagement celebrations.",
      keywords: "engagement ring celebration cakes",
      url: "occasions.html#engagement",
    },

    {
      title: "Baby Shower Cakes",
      category: "Occasions",
      description: "Sweet designs created for beautiful new beginnings.",
      keywords: "baby shower cakes baby celebration",
      url: "occasions.html#baby-shower",
    },

    {
      title: "Corporate Event Cakes",
      category: "Occasions",
      description: "Premium cakes for corporate events and milestones.",
      keywords: "corporate business event office cakes",
      url: "occasions.html#corporate",
    },

    {
      title: "Bakery Journal",
      category: "Blog",
      description: "Cake inspiration, celebration ideas and helpful guides.",
      keywords: "blog journal articles cake guides inspiration",
      url: "blog.html",
    },

    {
      title: "How to Choose the Perfect Birthday Cake",
      category: "Blog Article",
      description: "A helpful SweetCrumb guide to choosing a birthday cake.",
      keywords: "birthday cake guide blog article",
      url: "blog-details.html",
    },

    {
      title: "Contact SweetCrumb",
      category: "Contact",
      description: "Send us your cake enquiry or visit our bakery.",
      keywords: "contact enquiry call email bakery visit",
      url: "contact.html",
    },

    {
      title: "Shopping Cart",
      category: "Your Order",
      description: "Review cakes currently added to your cart.",
      keywords: "cart shopping basket order",
      url: "cart.html",
    },
  ];

  /* ==================================================
     SEARCH DATA ENDED
  ================================================== */

  /* ==================================================
     CREATE SEARCH OVERLAY STARTED
  ================================================== */

  const searchOverlay = document.createElement("div");

  searchOverlay.className = "search-overlay";

  searchOverlay.setAttribute("data-search-overlay", "");
  searchOverlay.setAttribute("aria-hidden", "true");

  searchOverlay.innerHTML = `
    <div
      class="search-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sweetcrumb-search-title"
    >
      <div class="search-panel-header">
        <div class="search-panel-heading">
          <span>✦ FIND SOMETHING SWEET</span>

          <h2 id="sweetcrumb-search-title">
            Search SweetCrumb
          </h2>
        </div>

        <button
          class="search-close-btn"
          type="button"
          aria-label="Close search"
          data-search-close
        >
          ×
        </button>
      </div>

      <div class="search-form">
        <div class="search-input-wrap">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-4-4"></path>
          </svg>

          <input
            class="search-input"
            type="search"
            placeholder="Search cakes, occasions, guides..."
            aria-label="Search SweetCrumb Cakes"
            autocomplete="off"
            data-search-input
          />
        </div>
      </div>

      <div
        class="search-results"
        aria-live="polite"
        data-search-results
      ></div>
    </div>
  `;

  document.body.appendChild(searchOverlay);

  const searchInput = searchOverlay.querySelector("[data-search-input]");

  const searchResults = searchOverlay.querySelector("[data-search-results]");

  const searchCloseButton = searchOverlay.querySelector("[data-search-close]");

  /* ==================================================
     CREATE SEARCH OVERLAY ENDED
  ================================================== */

  /* ==================================================
     RENDER SEARCH RESULTS STARTED
  ================================================== */

  const renderResults = (query = "") => {
    const cleanQuery = query.trim().toLowerCase();

    let filteredItems = searchItems;

    if (cleanQuery) {
      filteredItems = searchItems.filter((item) => {
        const searchableText = `
          ${item.title}
          ${item.category}
          ${item.description}
          ${item.keywords}
        `.toLowerCase();

        return searchableText.includes(cleanQuery);
      });
    }

    if (!filteredItems.length) {
      searchResults.innerHTML = `
        <div class="search-empty">
          <strong>No sweet matches found</strong>

          <p>
            Try searching for birthday, chocolate, wedding,
            custom cakes or blog.
          </p>
        </div>
      `;

      return;
    }

    searchResults.innerHTML = filteredItems
      .slice(0, 8)
      .map(
        (item) => `
          <a
            class="search-result-item"
            href="${item.url}"
          >
            <span class="search-result-copy">
              <small>${item.category}</small>

              <strong>${item.title}</strong>

              <p>${item.description}</p>
            </span>

            <span
              class="search-result-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        `,
      )
      .join("");
  };

  /* ==================================================
     RENDER SEARCH RESULTS ENDED
  ================================================== */

  /* ==================================================
     OPEN SEARCH STARTED
  ================================================== */

  const openSearch = () => {
    searchOverlay.classList.add("is-open");

    searchOverlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    renderResults("");

    requestAnimationFrame(() => {
      searchInput.focus();
    });
  };

  /* ==================================================
     OPEN SEARCH ENDED
  ================================================== */

  /* ==================================================
     CLOSE SEARCH STARTED
  ================================================== */

  const closeSearch = () => {
    searchOverlay.classList.remove("is-open");

    searchOverlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    searchInput.value = "";
  };

  /* ==================================================
     CLOSE SEARCH ENDED
  ================================================== */

  /* ==================================================
     SEARCH EVENTS STARTED
  ================================================== */

  searchButtons.forEach((button) => {
    button.addEventListener("click", openSearch);
  });

  searchCloseButton.addEventListener("click", closeSearch);

  searchInput.addEventListener("input", () => {
    renderResults(searchInput.value);
  });

  searchOverlay.addEventListener("click", (event) => {
    if (event.target === searchOverlay) {
      closeSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchOverlay.classList.contains("is-open")) {
      closeSearch();
    }
  });

  /* ==================================================
     SEARCH EVENTS ENDED
  ================================================== */
})();

/* ==================================================
   GLOBAL SWEETCRUMB SEARCH ENDED
================================================== */

/* ==================================================
   GLOBAL SWEETCRUMB ACCOUNT STARTED
================================================== */

(() => {
  const accountButtons = document.querySelectorAll(
    '.header-action-btn[aria-label="My account"]',
  );

  if (!accountButtons.length) return;

  /* ==================================================
     CREATE ACCOUNT MODAL STARTED
  ================================================== */

  const accountOverlay = document.createElement("div");

  accountOverlay.className = "account-overlay";

  accountOverlay.setAttribute("aria-hidden", "true");

  accountOverlay.innerHTML = `
    <div
      class="account-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sweetcrumb-account-title"
    >
      <div class="account-modal-header">
        <div class="account-modal-heading">
          <span>✦ SWEETCRUMB ACCOUNT</span>

          <h2 id="sweetcrumb-account-title">
            Welcome Back
          </h2>
        </div>

        <button
          class="account-close-btn"
          type="button"
          aria-label="Close account"
          data-account-close
        >
          ×
        </button>
      </div>

      <p class="account-modal-description">
        Sign in to continue with your SweetCrumb account.
      </p>

      <form class="account-form" data-account-form>
        <div class="account-field">
          <label for="account-email">Email Address</label>

          <input
            id="account-email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div class="account-field">
          <label for="account-password">Password</label>

          <input
            id="account-password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          class="account-submit-btn"
          type="submit"
        >
          Sign In
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p class="account-footer-text">
        New to SweetCrumb?
        <button type="button" data-create-account>
          Create Account
        </button>
      </p>

      <div
        class="account-success-message"
        role="status"
        aria-live="polite"
        data-account-success
      >
        ✓ Sign in successful
      </div>
    </div>
  `;

  document.body.appendChild(accountOverlay);

  const accountCloseButton = accountOverlay.querySelector(
    "[data-account-close]",
  );

  const accountForm = accountOverlay.querySelector("[data-account-form]");

  const accountSuccessMessage = accountOverlay.querySelector(
    "[data-account-success]",
  );

  const createAccountButton = accountOverlay.querySelector(
    "[data-create-account]",
  );

  /* ==================================================
     CREATE ACCOUNT MODAL ENDED
  ================================================== */

  /* ==================================================
     ACCOUNT OPEN / CLOSE STARTED
  ================================================== */

  const openAccount = (event) => {
    event?.preventDefault();

    accountOverlay.classList.add("is-open");

    accountOverlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      accountOverlay.querySelector("#account-email")?.focus();
    });
  };

  const closeAccount = () => {
    accountOverlay.classList.remove("is-open");

    accountOverlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    accountSuccessMessage.classList.remove("is-visible");
  };

  /* ==================================================
     ACCOUNT OPEN / CLOSE ENDED
  ================================================== */

  /* ==================================================
     ACCOUNT EVENTS STARTED
  ================================================== */

  accountButtons.forEach((button) => {
    button.addEventListener("click", openAccount);
  });

  accountCloseButton.addEventListener("click", closeAccount);

  accountOverlay.addEventListener("click", (event) => {
    if (event.target === accountOverlay) {
      closeAccount();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      accountOverlay.classList.contains("is-open")
    ) {
      closeAccount();
    }
  });

  /* ==================================================
   ACCOUNT SIGN IN STARTED
================================================== */

  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();

    accountSuccessMessage.textContent = "✓ Sign in successful";

    accountSuccessMessage.classList.add("is-visible");

    accountForm.reset();

    setTimeout(() => {
      accountSuccessMessage.classList.remove("is-visible");

      closeAccount();
    }, 2000);
  });

  /* ==================================================
   ACCOUNT SIGN IN ENDED
================================================== */

  /* ==================================================
     ACCOUNT EVENTS ENDED
  ================================================== */
})();

/* ==================================================
   GLOBAL SWEETCRUMB ACCOUNT ENDED
================================================== */
