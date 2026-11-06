/* BACK TO TOP BUTTON STARTED */
document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.querySelector(".back-to-top");

  if (!backToTopButton) return;

  const toggleBackToTop = () => {
    const isVisible = window.scrollY > 300;

    backToTopButton.classList.toggle("is-visible", isVisible);

    if (isVisible) {
      backToTopButton.removeAttribute("tabindex");
    } else {
      backToTopButton.setAttribute("tabindex", "-1");
    }
  };

  toggleBackToTop();

  window.addEventListener("scroll", toggleBackToTop, {
    passive: true,
  });

  backToTopButton.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  });
});

/* BACK TO TOP BUTTON ENDED */
