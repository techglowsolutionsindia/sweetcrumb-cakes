# SweetCrumb Cakes — Project Documentation

## 1. Project Overview

- **Project Name:** SweetCrumb Cakes
- **Website Type:** Bakery and Cake Catalogue / Demonstration E-commerce Website
- **Developer:** TechGlow Solutions
- **Local Project Folder:** `D:\web-projects\sweetcrumb-cakes\`
- **Frontend Technologies:** HTML5, CSS3, Vanilla JavaScript
- **Frontend Hosting:** GitHub Pages
- **Contact Form Integration:** Google Apps Script web app (configured in frontend JavaScript)
- **Contact Data Storage / Email:** Google Apps Script implementation and actual delivery require separate verification; the backend source is not included in this ZIP.
- **Checkout / Orders:** Browser-local demonstration workflow, not real payment processing or server-side order fulfilment.
- **Project Status:** Local audit and responsive checks reported completed; latest GitHub deployment and Google Drive backup pending verification.
- **Final Completion Date:** Not yet confirmed.

## 2. GitHub and Hosting

**GitHub Repository:** https://github.com/techglowsolutionsindia/sweetcrumb-cakes

**Expected Live Website:** https://techglowsolutionsindia.github.io/sweetcrumb-cakes/

**Frontend Hosting:** GitHub Pages. The ZIP includes an existing `.git` directory. The latest remote push and deployed version were not independently verified.

**Contact Service:** Google Apps Script web app. Its deployment URL is configured in `assets/js/pages/contact.js`; consult that file for the current endpoint rather than copying a deployment-specific URL into documentation.

**Render / Brevo:** No Render backend or Brevo API integration was found in the supplied project ZIP. Do not copy FitCore Fitness's backend configuration into this project.

## 3. Project Structure

Project root: `D:\web-projects\sweetcrumb-cakes\`

**HTML pages (16):**

- `index.html` — Homepage
- `cakes.html` — Cake catalogue
- `cake-details.html` — Cake details and selection
- `occasions.html` — Occasion cake collections
- `custom-cakes.html` — Custom cake presentation and enquiry UI
- `cart.html` — Shopping cart
- `checkout.html` — Demonstration checkout
- `order-success.html` — Locally stored order summary
- `blog.html` — Blog listing
- `blog-details.html` — Blog article detail
- `contact.html` — Contact/enquiry form
- `privacy-policy.html` — Privacy policy
- `terms-and-conditions.html` — Terms and conditions
- `delivery-policy.html` — Delivery policy
- `refund-policy.html` — Refund policy
- `sitemap.html` — Visitor-facing HTML sitemap

**Other important files:**

- `sitemap.xml` — XML sitemap
- `robots.txt` — Search engine crawler directives
- `.gitignore` — Git exclusions
- `.gitattributes` — Git attributes
- `PROJECT-DOCUMENTATION.md` — This document
- `assets/css/variables.css`, `base.css`, `layout.css`, `header.css`, `footer.css` — Shared styles
- `assets/css/components/` — Reusable component styles
- `assets/css/pages/` — Page-specific styles
- `assets/js/main.js` — Shared JavaScript
- `assets/js/back-to-top.js` — Back-to-top behavior
- `assets/js/components/` — Accordion, product filter, search and slider scripts
- `assets/js/pages/` — Page-specific scripts
- `assets/images/` — Website image assets, primarily WebP
- `assets/images/logo/sweetcrumb-logo.svg` — Branded SVG logo

There is no `backend/` directory or `package.json` in the supplied ZIP.

## 4. Website Pages and SEO

The supplied `sitemap.xml` lists the homepage, cakes, occasions, custom cakes, blog, contact, privacy policy, terms and conditions, delivery policy, refund policy, and HTML sitemap.

`robots.txt` allows general crawling and disallows `/cart.html`, `/checkout.html`, and `/order-success.html`. Its sitemap directive points to the project's GitHub Pages XML sitemap.

**User-reported audit status:** SEO configuration, SVG favicon/navbar/footer branding, HTML/XML sitemaps, robots configuration and `.gitignore` completed.

**Latest live verification:** Pending after deployment.

## 5. Application Architecture

The website is a static HTML/CSS/JavaScript application hosted on GitHub Pages. Shared and page-specific scripts provide navigation, catalogue interactions, cake selection, cart updates, checkout UI, and order-summary rendering.

Shopping cart and demonstration order information are stored in browser `localStorage`. This is **not** a database or a secure production order system.

The contact page posts enquiry data to a Google Apps Script endpoint. The Apps Script source and its connected spreadsheet/mail configuration are not present in this ZIP.

## 6. Contact Form Integration

**Frontend file:** `assets/js/pages/contact.js`

**HTML page:** `contact.html`

**Form selector:** `#contact-enquiry-form`

**Transport:** `fetch()` with `POST`, `mode: "no-cors"`, and URL-encoded `FormData` via `URLSearchParams`.

The script checks HTML form validity, validates the phone field, prevents duplicate submissions while a request is in progress, shows a status message, and resets the form after a completed fetch.

**Important limitation:** A completed `no-cors` fetch cannot confirm whether Google Apps Script actually saved the enquiry or sent emails. Verify the Google Sheets row and both owner/customer emails independently.

**User-reported status:** Contact form email integration completed. The actual Apps Script implementation and latest live deliveries were not independently inspected in this documentation pass.

## 7. Cake Catalogue, Cart and Checkout

- `assets/js/pages/cakes.js` and `assets/js/components/product-filter.js` support catalogue controls.
- `assets/js/pages/cake-details.js` supports cake selection and local cart state.
- `assets/js/pages/cart.js` reads and updates the local cart.
- `assets/js/pages/checkout.js` reads cart items, calculates subtotal/delivery/total, validates checkout form fields and writes a demonstration order to `localStorage`.
- `assets/js/pages/order-success.js` reads the locally stored order and displays its summary.

**Local storage keys identified:** `sweetcrumbCart`, `sweetcrumbCartCount`, and `sweetcrumbLastOrder`.

The checkout script uses a delivery-charge rule of ₹99 below ₹999 subtotal and free delivery at or above ₹999. These are demonstration rules embedded in JavaScript, not verified commercial terms.

**Important:** The checkout flow does not submit a real order to a server or process real payment. The website itself identifies the experience as a demonstration.

**User-reported status:** Checkout page and local website testing completed.

## 8. Form Validation and Security Considerations

- The contact JavaScript validates a ten-digit Indian mobile number beginning with 6–9 using `/^[6-9][0-9]{9}$/`.
- The contact form also uses native browser validity checks.
- The custom cake enquiry form uses browser-side validation and displays a toast, but the supplied `custom-cakes.js` does **not** submit that enquiry to an external service.
- Checkout data and order details remain in browser-local storage and must not be treated as authenticated records.
- The contact Apps Script's server-side validation, access restrictions, abuse prevention, and storage permissions cannot be confirmed without its source/configuration.
- Do not store credentials, API secrets, or real customer records in Git.

**User-reported status:** Contact form phone validation completed.

## 9. Google Sheets and Google Apps Script

The contact frontend references a deployed Google Apps Script web-app URL.

**Potential responsibilities of the external Apps Script:** Receive contact enquiries, optionally append rows to Google Sheets, and send owner/customer emails. These backend actions are **not verifiable from the ZIP alone**.

To confirm the integration, inspect the actual Apps Script deployment and run a controlled submission, checking the resulting spreadsheet record and email inboxes.

The custom cake enquiry form is separate and currently only provides a frontend confirmation toast in the supplied code.

## 10. Newsletter and Other Integrations

No active newsletter backend, Brevo integration, Render service, or standalone Node.js backend was identified in the supplied project ZIP.

Do not assume third-party integrations are active unless their corresponding code and configuration are verified.

## 11. Configuration and Secrets

**Frontend contact endpoint:** `CONTACT_WEB_APP_URL` constant in `assets/js/pages/contact.js`.

**Browser storage:** `sweetcrumbCart`, `sweetcrumbCartCount`, `sweetcrumbLastOrder`.

**External Apps Script settings:** Not supplied; configuration names and deployment permissions are unverified.

**`.gitignore` exclusions include:** `.env`, `.env.*` (except `.env.example`), `*.pem`, `*.key`, `node_modules/`, logs, temporary files, editor folders, and build/coverage directories.

Never commit passwords, private keys, API tokens, or confidential customer data. Do not document secret values.

## 12. Local Website Setup

1. Open `D:\web-projects\sweetcrumb-cakes\` in VS Code.
2. Open `index.html` with Live Server (for example `http://127.0.0.1:5500/index.html`).
3. Check navigation across all HTML pages.
4. Test the catalogue, cake details, cart, demonstration checkout and order-success display.
5. Test the contact form with controlled test data and verify the external Apps Script results separately.
6. Check the browser console and responsive layouts.

The static frontend does not require an `npm install` step based on the supplied ZIP.

## 13. Frontend Deployment — GitHub Pages

1. Complete the local audit and confirm approved changes.
2. Review `git status` and the files staged for commit.
3. Confirm `.gitignore` exclusions and review any unused files before deleting anything; obtain approval before deletion.
4. Commit from the existing `D:\web-projects\sweetcrumb-cakes\` Git repository; do not create a duplicate project folder.
5. Push to the configured remote branch after verifying the remote URL.
6. Verify GitHub Pages publishes the latest commit.
7. Open all important live pages and check links, assets, layout, and console errors.
8. Test the live contact form and independently verify Google Sheets/email results.
9. Confirm `robots.txt` and `sitemap.xml` are reachable at their live URLs.

**Latest GitHub Pages deployment:** Pending verification.

## 14. Contact Backend Deployment — Google Apps Script

1. Open the Google Apps Script project associated with the endpoint in `assets/js/pages/contact.js`.
2. Review its current deployment and authorized execution/access settings.
3. Confirm its target spreadsheet, owner notification, and customer confirmation logic.
4. Confirm any script properties/secrets are stored securely and not copied into frontend files.
5. Test a controlled enquiry and inspect Apps Script execution history, the spreadsheet and both mail destinations.
6. Update the frontend endpoint only if a new deployment URL is intentionally created.

**Backend source/deployment verification:** Not available from the supplied ZIP. Do not create a Render service for this static-site contact integration without a separate requirement.

## 15. Testing History

**Reported completed by project owner:**

- SEO audit
- SVG favicon, navbar and footer logos
- HTML/XML sitemap and robots configuration
- `.gitignore` audit
- Mobile responsiveness across the reviewed pages
- Local website testing
- Contact form email integration
- Contact form phone validation

**Confirmed by supplied source inspection:**

- Sixteen HTML pages exist
- Contact form posts to Google Apps Script
- Contact JavaScript includes Indian mobile-number validation
- Cart and demonstration checkout use browser local storage
- XML sitemap and robots file exist

**Still requires verification after deployment:** Live GitHub Pages content, external Apps Script outcomes, and final backup status.

## 16. Maintenance and Known Limitations

- The site is a demonstration, not a live commercial ordering system.
- Cart and order state may disappear when browser storage is cleared or a different device/browser is used.
- Checkout and order-success pages do not constitute a real payment or fulfilment service.
- The custom cake enquiry form in the supplied code shows a frontend toast without an external submission.
- The contact form's `no-cors` request cannot verify server-side storage or email delivery.
- Any future domain change may require updating Apps Script access/origin-related settings and website canonical/sitemap URLs.
- Update demonstration business details before adapting the website for a real bakery.
- Review dependency references before deleting unused assets.

## 17. GitHub and Google Drive Backup

**Repository:** https://github.com/techglowsolutionsindia/sweetcrumb-cakes

**Latest GitHub push:** Pending verification.

**Latest Google Drive backup:** Pending.

**Project documentation committed to GitHub:** Pending.

**Project documentation included in Google Drive:** Pending.

Do not mark the project fully closed until the final GitHub Pages deployment and Google Drive backup are verified.

## 18. Common Service Details — TechGlow Solutions

### GitHub

**Repository:** https://github.com/techglowsolutionsindia/sweetcrumb-cakes

**Hosting:** GitHub Pages.

### Google Apps Script / Google Sheets

**Apps Script dashboard:** https://script.google.com/home

**Google Sheets:** https://sheets.google.com/

**Project-specific account and spreadsheet ID:** Not verified from supplied files.

**Contact endpoint:** See `assets/js/pages/contact.js`.

### Render and Brevo (reference only)

**Render dashboard:** https://dashboard.render.com/

**Brevo dashboard:** https://app.brevo.com/

**Common TechGlow Solutions account reference supplied in FitCore documentation:** `websphereindia7@gmail.com`.

**Used by SweetCrumb Cakes:** Not identified in supplied ZIP. Do not confuse these shared account references with SweetCrumb's contact integration or sender/recipient addresses.

Never document passwords, API keys, authentication tokens, or customer records.

## 19. Final Project Closure Checklist

- [x] Frontend website developed
- [x] Sixteen HTML pages included
- [x] Contact Google Apps Script endpoint configured in frontend
- [x] Contact phone validation implemented in frontend
- [x] SEO, branding, sitemap, robots and Git exclusions reported completed
- [x] Mobile responsiveness reported completed
- [x] Local website testing reported completed
- [x] Contact email integration reported completed by project owner
- [x] Project documentation drafted
- [ ] Review and save final `PROJECT-DOCUMENTATION.md` in project root
- [ ] Verify final GitHub push and GitHub Pages deployment
- [ ] Verify live contact submission, spreadsheet entry and email delivery after deployment
- [ ] Update Google Drive backup with final files and documentation
- [ ] Confirm final project closure

---

**Documentation Status:** Prepared from the supplied SweetCrumb Cakes ZIP, FitCore documentation format, and the owner's reported audit status.

**Last Updated:** 6 November 2026

**Final Project Status:** Local audit reported completed; final deployment and backup verification pending.
