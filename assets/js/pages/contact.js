/* ==================================================
   CONTACT ENQUIRY FORM STARTED
================================================== */

const contactEnquiryForm = document.querySelector("#contact-enquiry-form");

if (contactEnquiryForm) {
  const submitButton = contactEnquiryForm.querySelector(".contact-form-submit");

  const successMessage = contactEnquiryForm.querySelector(
    ".contact-form-success-message",
  );

  contactEnquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!submitButton || !successMessage) return;

    /* RESET FORM FIELDS */
    contactEnquiryForm.reset();

    /* SHOW SUCCESS MESSAGE */
    successMessage.classList.add("is-visible");

    /* TEMPORARY BUTTON SUCCESS STATE */
    submitButton.disabled = true;

    submitButton.innerHTML = `
      Enquiry Sent
      <span aria-hidden="true">✓</span>
    `;

    submitButton.classList.add("is-success");

    /* RESTORE BUTTON */
    setTimeout(() => {
      submitButton.disabled = false;

      submitButton.innerHTML = `
        Send Enquiry
        <span aria-hidden="true">→</span>
      `;

      submitButton.classList.remove("is-success");
    }, 3000);

    /* HIDE SUCCESS MESSAGE */
    setTimeout(() => {
      successMessage.classList.remove("is-visible");
    }, 5000);
  });
}

/* ==================================================
   CONTACT ENQUIRY FORM ENDED
================================================== */
