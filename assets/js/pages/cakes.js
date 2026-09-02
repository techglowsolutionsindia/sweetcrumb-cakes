/* ==================================================
   CAKES PAGE STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-cake-filter]");

  const cakeGrid = document.querySelector("[data-cake-grid]");

  const resultCount = document.querySelector("[data-cake-result-count]");

  const sortSelect = document.querySelector("[data-cake-sort]");

  if (!cakeGrid) return;

  const cakeCards = [...cakeGrid.querySelectorAll(".cake-product-card")];

  /* ==================================================
     CATEGORY FILTER
  ================================================== */

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.cakeFilter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      let visibleCount = 0;

      cakeCards.forEach((card) => {
        const categories = card.dataset.category.split(" ").filter(Boolean);

        const shouldShow =
          selectedCategory === "all" || categories.includes(selectedCategory);

        card.hidden = !shouldShow;

        if (shouldShow) {
          visibleCount += 1;
        }
      });

      if (resultCount) {
        resultCount.textContent = visibleCount;
      }
    });
  });

  /* ==================================================
     PRODUCT SORTING
  ================================================== */

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const sortValue = sortSelect.value;

      const sortedCards = [...cakeCards];

      if (sortValue === "price-low") {
        sortedCards.sort(
          (a, b) => Number(a.dataset.price) - Number(b.dataset.price),
        );
      }

      if (sortValue === "price-high") {
        sortedCards.sort(
          (a, b) => Number(b.dataset.price) - Number(a.dataset.price),
        );
      }

      if (sortValue === "rating") {
        sortedCards.sort(
          (a, b) => Number(b.dataset.rating) - Number(a.dataset.rating),
        );
      }

      sortedCards.forEach((card) => {
        cakeGrid.appendChild(card);
      });
    });
  }

  /* ==================================================
     WISHLIST BUTTON
  ================================================== */

  document.querySelectorAll(".cake-wishlist-btn").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");

      button.textContent = button.classList.contains("active") ? "♥" : "♡";
    });
  });
});

/* ==================================================
   CAKES PAGE ENDED
================================================== */
