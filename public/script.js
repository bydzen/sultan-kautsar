// cookie-helper
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
document.addEventListener("DOMContentLoaded", function () {
    const consentStatus = getCookie("user_consent");
    const banner = document.getElementById("consent-banner");
    // show-banner-if-no-consent
    if (!consentStatus) {
        banner.classList.remove("hidden");
    }
    document.getElementById("accept-consent").addEventListener("click", function () {
        const d = new Date();
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        document.cookie = "user_consent=granted; expires=" + d.toUTCString() + "; path=/";
        banner.classList.add("hidden");
        gtag("consent", "update", {
            ad_storage: "granted",
            analytics_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
            functionality_storage: "granted",
        });
        window.dataLayer.push({ event: "consent_updated", consent_status: "granted" });
    });
    document.getElementById("decline-consent").addEventListener("click", function () {
        const d = new Date();
        d.setTime(d.getTime() + 31 * 24 * 60 * 60 * 1000);
        document.cookie = "user_consent=denied; expires=" + d.toUTCString() + "; path=/";
        banner.classList.add("hidden");
        gtag("consent", "update", {
            ad_storage: "denied",
            analytics_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            functionality_storage: "denied",
        });
        window.dataLayer.push({ event: "consent_denied", consent_status: "denied" });
    });
});
// toast-notification
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
    const icon = type === "success" ? "check_circle" : "error";
    toast.className = `${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 pointer-events-auto transform transition-all duration-300 translate-x-[400px] opacity-0`;
    toast.innerHTML = `
                    <span class="material-symbols-outlined text-xl">${icon}</span>
                    <span class="font-medium">${message}</span>
                `;
    container.appendChild(toast);
    // trigger-animation
    setTimeout(() => {
        toast.classList.remove("translate-x-[400px]", "opacity-0");
    }, 10);
    // 4s-dismissal
    setTimeout(() => {
        toast.classList.add("translate-x-[400px]", "opacity-0");
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 4000);
}
// dark-mode
const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;
// theme-load
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
    html.classList.add("dark");
    updateDarkModeIcon(true);
} else {
    html.classList.remove("dark");
    updateDarkModeIcon(false);
}
// icon-update
function updateDarkModeIcon(isDark) {
    const icon = darkModeToggle.querySelector(".material-symbols-outlined");
    icon.textContent = isDark ? "light_mode" : "dark_mode";
}
// toggle-functionality
darkModeToggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateDarkModeIcon(isDark);
});
// modal-functionality
const modal = document.getElementById("hireModal");
const closeModalBtn = document.getElementById("closeModal");
const cancelModalBtn = document.getElementById("cancelModal");
// buttons-open
const hireMeHeaderBtn = document.getElementById("hireMeHeaderBtn");
const hireMeHeroBtn = document.getElementById("hireMeHeroBtn");
const bookSessionBtn = document.getElementById("bookSessionBtn");
const startProjectBtn = document.getElementById("startProjectBtn");
// open-modal
function openModal() {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}
// close-modal
function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
}
// click-listeners
hireMeHeaderBtn.addEventListener("click", openModal);
hireMeHeroBtn.addEventListener("click", openModal);
bookSessionBtn.addEventListener("click", openModal);
startProjectBtn.addEventListener("click", openModal);
// close-listeners
closeModalBtn.addEventListener("click", closeModal);
cancelModalBtn.addEventListener("click", closeModal);
// outside-click
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
// escape-key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});
// form-submission
const form = document.getElementById("hireForm");
const submitBtn = document.getElementById("submitFormBtn");
const submitBtnOriginalHTML = submitBtn.innerHTML;
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // loading-state
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");
    submitBtn.innerHTML = `
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                `;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
        const response = await fetch("https://email.sultankautsar.workers.dev/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (response.ok && result.status === "ok") {
            showToast("Thank you for your interest! I'll get back to you within 24 hours.", "success");
            closeModal();
            form.reset();
            setTimeout(() => {
                window.location.href = "./thank-you.html";
            }, 1500);
        } else {
            showToast("Oops! There was a problem submitting your form. Please try again.", "error");
        }
    } catch (error) {
        showToast("Oops! There was a problem submitting your form. Please try again.", "error");
    } finally {
        // reset-button
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
        submitBtn.innerHTML = submitBtnOriginalHTML;
    }
});
// copytight-year-update
const copyright = document.querySelector("footer p");
if (copyright) {
    const currentYear = new Date().getFullYear();
    copyright.textContent = copyright.textContent.replace("2025", currentYear);
}
// custom-select-dropdown
const customSelectBtn = document.getElementById("customSelectBtn");
const customSelectValue = document.getElementById("customSelectValue");
const customSelectIcon = document.getElementById("customSelectIcon");
const customSelectDropdown = document.getElementById("customSelectDropdown");
const customOptions = document.querySelectorAll(".custom-option");
const hiddenSelect = document.getElementById("service");
// toggle-dropdown
customSelectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = customSelectDropdown.classList.contains("hidden");
    customSelectDropdown.classList.toggle("hidden");
    customSelectIcon.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
});
// option-selection
customOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const value = option.getAttribute("data-value");
        const text = option.querySelector("span:nth-child(2)").textContent;
        // update-display
        customSelectValue.textContent = text;
        customSelectValue.classList.remove("text-slate-400");
        customSelectValue.classList.add("text-slate-900", "dark:text-slate-100");
        // update-hidden-select
        hiddenSelect.value = value;
        // remove-selected-state
        customOptions.forEach((opt) => {
            opt.classList.remove("bg-slate-50", "dark:bg-slate-800");
            opt.querySelector(".material-symbols-outlined:last-child").classList.add("opacity-0");
            opt.querySelector(".material-symbols-outlined:last-child").classList.remove("opacity-100");
        });
        // add-selected-state
        option.classList.add("bg-slate-50", "dark:bg-slate-800");
        option.querySelector(".material-symbols-outlined:last-child").classList.remove("opacity-0");
        option.querySelector(".material-symbols-outlined:last-child").classList.add("opacity-100");
        // close-dropdown
        customSelectDropdown.classList.add("hidden");
        customSelectIcon.style.transform = "rotate(0deg)";
    });
});
// close-on-outside-click
document.addEventListener("click", (e) => {
    if (!customSelectBtn.contains(e.target) && !customSelectDropdown.contains(e.target)) {
        customSelectDropdown.classList.add("hidden");
        customSelectIcon.style.transform = "rotate(0deg)";
    }
});
// reset-on-form-reset
form.addEventListener("reset", () => {
    customSelectValue.textContent = "Select a service";
    customSelectValue.classList.add("text-slate-400");
    customSelectValue.classList.remove("text-slate-900", "dark:text-slate-100");
    customOptions.forEach((opt) => {
        opt.classList.remove("bg-slate-50", "dark:bg-slate-800");
        opt.querySelector(".material-symbols-outlined:last-child").classList.add("opacity-0");
        opt.querySelector(".material-symbols-outlined:last-child").classList.remove("opacity-100");
    });
});
