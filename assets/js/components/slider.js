/* ==================================================
   SWEETCRUMB CAKES - CATEGORY SLIDER STARTED
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-category-slider]");

  if (!slider) return;

  const track = slider.querySelector("[data-category-track]");
  const cards = Array.from(track.querySelectorAll(".cake-category-card"));

  const prevButton = slider.querySelector("[data-category-prev]");
  const nextButton = slider.querySelector("[data-category-next]");

  let currentIndex = 0;
  let resizeTimer = null;

  /* ==================================================
     GET VISIBLE CARD COUNT
  ================================================== */

  const getVisibleCards = () => {
    if (window.innerWidth <= 767) return 1;
    if (window.innerWidth <= 899) return 2;
    if (window.innerWidth <= 1199) return 3;

    return 4;
  };

  /* ==================================================
     GET SLIDER GAP
  ================================================== */

  const getTrackGap = () => {
    const trackStyles = window.getComputedStyle(track);

    return parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
  };

  /* ==================================================
     UPDATE SLIDER POSITION
  ================================================== */

  const updateSlider = () => {
    if (!cards.length) return;

    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    currentIndex = Math.min(currentIndex, maxIndex);

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = getTrackGap();

    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
  };

  /* ==================================================
     PREVIOUS CATEGORY
  ================================================== */

  prevButton.addEventListener("click", () => {
    if (currentIndex <= 0) return;

    currentIndex -= 1;

    updateSlider();
  });

  /* ==================================================
     NEXT CATEGORY
  ================================================== */

  nextButton.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex >= maxIndex) return;

    currentIndex += 1;

    updateSlider();
  });

  /* ==================================================
     RESPONSIVE UPDATE
  ================================================== */

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      updateSlider();
    }, 150);
  });

  /* ==================================================
     INITIALIZE CATEGORY SLIDER
  ================================================== */

  updateSlider();
});

/* ==================================================
   SWEETCRUMB CAKES - CATEGORY SLIDER ENDED
================================================== */

/* ==================================================
   BEST SELLING CAKES SLIDER STARTED
================================================== */

(() => {
  const slider = document.querySelector("[data-best-sellers-slider]");

  if (!slider) return;

  const track = slider.querySelector("[data-best-sellers-track]");
  const cards = Array.from(track.querySelectorAll(".best-seller-card"));

  const previousButton = slider.querySelector("[data-best-sellers-prev]");
  const nextButton = slider.querySelector("[data-best-sellers-next]");

  let currentIndex = 0;
  let visibleCards = 4;
  let resizeTimer = null;

  /* ==================================================
     GET VISIBLE CARD COUNT
  ================================================== */

  const getVisibleCards = () => {
    if (window.innerWidth <= 767) {
      return 1;
    }

    if (window.innerWidth <= 1100) {
      return 2;
    }

    return 4;
  };

  /* ==================================================
     GET SLIDER GAP
  ================================================== */

  const getTrackGap = () => {
    const trackStyles = window.getComputedStyle(track);
    return parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
  };

  /* ==================================================
     UPDATE ARROW STATES
  ================================================== */

  const updateButtons = () => {
    const maximumIndex = Math.max(0, cards.length - visibleCards);

    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maximumIndex;
  };

  /* ==================================================
     UPDATE SLIDER POSITION
  ================================================== */

  const updateSlider = () => {
    if (!cards.length) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = getTrackGap();

    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    updateButtons();
  };

  /* ==================================================
     SET SLIDER LAYOUT
  ================================================== */

  const setLayout = () => {
    visibleCards = getVisibleCards();

    const maximumIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex > maximumIndex) {
      currentIndex = maximumIndex;
    }

    updateSlider();
  };

  /* ==================================================
     PREVIOUS BUTTON
  ================================================== */

  previousButton.addEventListener("click", () => {
    if (currentIndex <= 0) return;

    currentIndex -= 1;

    updateSlider();
  });

  /* ==================================================
     NEXT BUTTON
  ================================================== */

  nextButton.addEventListener("click", () => {
    const maximumIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex >= maximumIndex) return;

    currentIndex += 1;

    updateSlider();
  });

  /* ==================================================
     TOUCH / SWIPE SUPPORT
  ================================================== */

  let touchStartX = 0;

  slider.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    {
      passive: true,
    },
  );

  slider.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) < 45) return;

      if (swipeDistance < 0) {
        nextButton.click();
      } else {
        previousButton.click();
      }
    },
    {
      passive: true,
    },
  );

  /* ==================================================
     WINDOW RESIZE
  ================================================== */

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      setLayout();
    }, 150);
  });

  /* ==================================================
     INITIALIZE BEST SELLERS SLIDER
  ================================================== */

  setLayout();
})();

/* ==================================================
   BEST SELLING CAKES SLIDER ENDED
================================================== */

/* ==================================================
   CUSTOMER TESTIMONIALS SLIDER STARTED
================================================== */

(() => {
  const slider = document.querySelector("[data-testimonials-slider]");

  if (!slider) return;

  const track = slider.querySelector("[data-testimonials-track]");
  const cards = Array.from(
    track.querySelectorAll(".customer-testimonial-card"),
  );

  const previousButton = slider.querySelector("[data-testimonials-prev]");
  const nextButton = slider.querySelector("[data-testimonials-next]");

  let currentIndex = 0;
  let visibleCards = 3;
  let resizeTimer = null;

  /* ==================================================
     GET VISIBLE TESTIMONIAL CARDS
  ================================================== */

  const getVisibleCards = () => {
    if (window.innerWidth <= 767) return 1;
    if (window.innerWidth <= 1100) return 2;

    return 3;
  };

  /* ==================================================
     GET TESTIMONIAL TRACK GAP
  ================================================== */

  const getTrackGap = () => {
    const styles = window.getComputedStyle(track);

    return parseFloat(styles.columnGap || styles.gap) || 0;
  };

  /* ==================================================
     UPDATE TESTIMONIAL BUTTONS
  ================================================== */

  const updateButtons = () => {
    const maximumIndex = Math.max(0, cards.length - visibleCards);

    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maximumIndex;
  };

  /* ==================================================
     UPDATE TESTIMONIAL SLIDER
  ================================================== */

  const updateSlider = () => {
    if (!cards.length) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = getTrackGap();
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    updateButtons();
  };

  /* ==================================================
     SET TESTIMONIAL SLIDER LAYOUT
  ================================================== */

  const setLayout = () => {
    visibleCards = getVisibleCards();

    const maximumIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex > maximumIndex) {
      currentIndex = maximumIndex;
    }

    updateSlider();
  };

  /* ==================================================
     PREVIOUS TESTIMONIAL
  ================================================== */

  previousButton.addEventListener("click", () => {
    if (currentIndex <= 0) return;

    currentIndex -= 1;
    updateSlider();
  });

  /* ==================================================
     NEXT TESTIMONIAL
  ================================================== */

  nextButton.addEventListener("click", () => {
    const maximumIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex >= maximumIndex) return;

    currentIndex += 1;
    updateSlider();
  });

  /* ==================================================
     TESTIMONIAL MOBILE SWIPE
  ================================================== */

  let touchStartX = 0;

  slider.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true },
  );

  slider.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) < 45) return;

      if (swipeDistance < 0) {
        nextButton.click();
      } else {
        previousButton.click();
      }
    },
    { passive: true },
  );

  /* ==================================================
     TESTIMONIAL RESPONSIVE UPDATE
  ================================================== */

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      setLayout();
    }, 150);
  });

  setLayout();
})();

/* ==================================================
   CUSTOMER TESTIMONIALS SLIDER ENDED
================================================== */

/* ==================================================
   BLOG SLIDER STARTED
================================================== */

(() => {
  const slider = document.querySelector("[data-blog-slider]");

  if (!slider) return;

  const track = slider.querySelector("[data-blog-track]");

  const cards = Array.from(
    track.querySelectorAll(".blog-home-card"),
  );

  const previousButton = slider.querySelector("[data-blog-prev]");
  const nextButton = slider.querySelector("[data-blog-next]");

  let currentIndex = 0;
  let visibleCards = 3;
  let resizeTimer = null;

  /* ==================================================
     GET VISIBLE BLOG CARDS
  ================================================== */

  const getVisibleCards = () => {
    if (window.innerWidth <= 767) return 1;
    if (window.innerWidth <= 1100) return 2;

    return 3;
  };

  /* ==================================================
     GET BLOG TRACK GAP
  ================================================== */

  const getTrackGap = () => {
    const styles = window.getComputedStyle(track);

    return parseFloat(styles.columnGap || styles.gap) || 0;
  };

  /* ==================================================
     UPDATE BLOG BUTTONS
  ================================================== */

  const updateButtons = () => {
    const maximumIndex = Math.max(
      0,
      cards.length - visibleCards,
    );

    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maximumIndex;
  };

  /* ==================================================
     UPDATE BLOG SLIDER
  ================================================== */

  const updateSlider = () => {
    if (!cards.length) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = getTrackGap();

    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    updateButtons();
  };

  /* ==================================================
     SET BLOG SLIDER LAYOUT
  ================================================== */

  const setLayout = () => {
    visibleCards = getVisibleCards();

    const maximumIndex = Math.max(
      0,
      cards.length - visibleCards,
    );

    if (currentIndex > maximumIndex) {
      currentIndex = maximumIndex;
    }

    updateSlider();
  };

  /* ==================================================
     PREVIOUS BLOG
  ================================================== */

  previousButton.addEventListener("click", () => {
    if (currentIndex <= 0) return;

    currentIndex -= 1;

    updateSlider();
  });

  /* ==================================================
     NEXT BLOG
  ================================================== */

  nextButton.addEventListener("click", () => {
    const maximumIndex = Math.max(
      0,
      cards.length - visibleCards,
    );

    if (currentIndex >= maximumIndex) return;

    currentIndex += 1;

    updateSlider();
  });

  /* ==================================================
     BLOG MOBILE SWIPE
  ================================================== */

  let touchStartX = 0;

  slider.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true },
  );

  slider.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].clientX;

      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) < 45) return;

      if (swipeDistance < 0) {
        nextButton.click();
      } else {
        previousButton.click();
      }
    },
    { passive: true },
  );

  /* ==================================================
     BLOG RESPONSIVE UPDATE
  ================================================== */

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      setLayout();
    }, 150);
  });

  setLayout();
})();

/* ==================================================
   BLOG SLIDER ENDED
================================================== */