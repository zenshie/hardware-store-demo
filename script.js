// Demo Business Hardware - interactive catalog and contact helpers.
// Replace the demo Messenger URL and email address before publishing for a real client.
const MESSENGER_URL = "https://m.me/"; // Replace with the client's Facebook Page username, e.g. https://m.me/YourPage
const CONTACT_EMAIL = "hello@demobusiness.example"; // Replace with a real monitored email address.

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const filterButtons = [...document.querySelectorAll(".filter-btn")];
const productCards = [...document.querySelectorAll(".product-card")];
const searchInput = document.querySelector("#product-search");
const emptyState = document.querySelector("#empty-state");
let activeFilter = "all";

function updateCatalog() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const searchableText = `${card.dataset.name} ${card.textContent}`.toLowerCase();
    const matchesSearch = searchableText.includes(query);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    updateCatalog();
  });
});

searchInput?.addEventListener("input", updateCatalog);

function openProductInquiry(productName) {
  const message = `Hello! I'd like to ask about the ${productName}. Could you please share its availability and details?`;
  if (MESSENGER_URL === "https://m.me/") {
    const contactSection = document.querySelector("#contact");
    const messageField = document.querySelector("#customer-message");
    if (messageField) messageField.value = message;
    contactSection?.scrollIntoView({ behavior: "smooth" });
    messageField?.focus({ preventScroll: true });
    return;
  }
  const url = `${MESSENGER_URL}?ref=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".inquire-btn").forEach((button) => {
  button.addEventListener("click", () => {
    openProductInquiry(button.dataset.product || "a product");
  });
});

const messengerLink = document.querySelector("#messenger-link");
if (messengerLink) {
  if (MESSENGER_URL !== "https://m.me/") {
    messengerLink.href = MESSENGER_URL;
  } else {
    messengerLink.href = "#contact";
    messengerLink.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const status = document.querySelector("#form-status");

  if (!name || !contact || !message) {
    if (status) status.textContent = "Please complete all fields before preparing your inquiry.";
    return;
  }

  if (CONTACT_EMAIL === "hello@demobusiness.example") {
    if (status) status.textContent = "Demo mode: your inquiry is ready. Replace CONTACT_EMAIL in script.js with a real address to send it by email.";
    const subject = encodeURIComponent("Website inquiry from " + name);
    const body = encodeURIComponent(`Name: ${name}\nContact: ${contact}\n\nMessage:\n${message}`);
    // Opens a draft in the visitor's email application for the demo address.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return;
  }

  const subject = encodeURIComponent("Website inquiry from " + name);
  const body = encodeURIComponent(`Name: ${name}\nContact: ${contact}\n\nMessage:\n${message}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  if (status) status.textContent = "Your email application should open with the inquiry prepared.";
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
