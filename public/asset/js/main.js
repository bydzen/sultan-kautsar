/* Documentation: Copyright Year JS */
const copyright = document.querySelector("footer p");
if (copyright) {
    const currentYear = new Date().getFullYear();
    copyright.textContent = copyright.textContent.replace("2025", currentYear);
}
