/* ==================================================
   CONTACT ENQUIRY FORM STARTED
================================================== */

const contactEnquiryForm = document.querySelector("#contact-enquiry-form");

const CONTACT_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxxF8nWFOsrCOrudlw9w72lYZWxQRkPaMAaInxmN7qzvw3S6xFAmtyeqscH3M5RmpKxWg/exec";

if (contactEnquiryForm) {
  const submitButton = contactEnquiryForm.querySelector(".contact-form-submit");

  const successMessage = contactEnquiryForm.querySelector(
    ".contact-form-success-message",
  );

  let isSubmitting = false;
  let messageTimeout;

  /* Auto Hide Form Message Started */
  function showFormMessage(message) {
    clearTimeout(messageTimeout);

    successMessage.textContent = message;
    successMessage.classList.add("is-visible");

    messageTimeout = setTimeout(() => {
      successMessage.classList.remove("is-visible");
    }, 3000);
  }
  /* Auto Hide Form Message Ended */

  /* FORM SUBMISSION STARTED */
  contactEnquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting || !submitButton || !successMessage) return;

    if (!contactEnquiryForm.reportValidity()) return;

    const formData = new FormData(contactEnquiryForm);

    const phone = String(formData.get("phone") || "").trim();

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      const phoneInput = contactEnquiryForm.querySelector("#contact-phone");

      if (phoneInput) {
        phoneInput.setCustomValidity(
          "Enter a valid 10-digit Indian mobile number.",
        );

        phoneInput.reportValidity();

        phoneInput.addEventListener(
          "input",
          () => phoneInput.setCustomValidity(""),
          { once: true },
        );
      }

      return;
    }

    /* SUBMIT BUTTON LOADING STATE */
    isSubmitting = true;
    submitButton.disabled = true;

    const originalButtonHTML = submitButton.innerHTML;

    submitButton.textContent = "Sending Enquiry...";

    successMessage.classList.remove("is-visible");

    try {
      /*
       * Google Apps Script receives URL-encoded form data.
       * The browser cannot read this no-cors response.
       */
      await fetch(CONTACT_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(formData),
      });

      /*
       * A completed no-cors request does not confirm
       * Google Sheets storage or email delivery.
       */
      showFormMessage(
        "Enquiry submitted. Please check your email for confirmation.",
      );

      contactEnquiryForm.reset();
    } catch (error) {
      console.error("Contact enquiry submission failed:", error);

      showFormMessage("Unable to submit your enquiry. Please try again.");
    } finally {
      isSubmitting = false;

      submitButton.disabled = false;

      submitButton.innerHTML = originalButtonHTML;
    }
  });
  /* FORM SUBMISSION ENDED */
}

/* ==================================================
   CONTACT ENQUIRY FORM ENDED
================================================== */
