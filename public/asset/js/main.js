/* Documentation: Greeting */
function getGreetingByHour(hour) {
    if (hour >= 5 && hour < 12) return { greeting: "good morning!", emoji: "🌅" };
    if (hour >= 12 && hour < 18) return { greeting: "good afternoon!", emoji: "🌤️" };
    return { greeting: "good evening!", emoji: "🌆" };
}
function updateGreeting() {
    const { greeting, emoji } = getGreetingByHour(new Date().getHours());
    const greetingEl = document.getElementById("js-greeting");
    const emojiEl = document.getElementById("js-emoji");
    if (greetingEl) greetingEl.textContent = greeting;
    if (emojiEl) emojiEl.textContent = emoji;
}
updateGreeting();

/* Documentation: Sticky Tab */
function handleScroll() {
    const target = document.querySelector("main #tab nav");
    if (!target) return;
    const isScrolled = target.getBoundingClientRect().top <= 12;
    target.classList.toggle("scrolled", isScrolled);
}
document.addEventListener("scroll", handleScroll);

/* Documentation: Anchor Scroll */
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("main #tab a");
    const offset = 80;
    const scrollToTarget = (targetId) => {
        if (targetId === "about") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const target = document.getElementById(targetId);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            scrollToTarget(targetId);
        });
    });
});

/* Documentation: Scheme Handler */
function applyScheme(scheme) {
    document.body.classList.remove("scheme-light", "scheme-dark");
    document.body.classList.add(`scheme-${scheme}`);
    const toggle = document.querySelector(".scheme-toggle");
    if (!toggle) return;
    const iconLight = toggle.querySelector(".icon-light");
    const iconDark = toggle.querySelector(".icon-dark");
    const isLight = scheme === "light";
    if (iconLight) iconLight.style.display = isLight ? "inline" : "none";
    if (iconDark) iconDark.style.display = isLight ? "none" : "inline";
}
function initScheme() {
    let scheme = localStorage.getItem("color-scheme");
    if (!scheme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        scheme = prefersDark ? "dark" : "light";
        localStorage.setItem("color-scheme", scheme);
    }
    applyScheme(scheme);
}
function setupToggle() {
    const toggle = document.querySelector(".scheme-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
        const current = document.body.classList.contains("scheme-dark") ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem("color-scheme", next);
        applyScheme(next);
    });
}
initScheme();
setupToggle();
