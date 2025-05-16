/* Documentation: Greeting */
function updateGreeting() {
    const hours = new Date().getHours();
    let greeting;
    let emoji;
    if (hours >= 5 && hours < 12) {
        greeting = "good morning!";
        emoji = "🌅";
    } else if (hours >= 12 && hours < 18) {
        greeting = "good afternoon!";
        emoji = "🌤️";
    } else {
        greeting = "good evening!";
        emoji = "🌆";
    }
    if (document.getElementById("js-greeting") && document.getElementById("js-emoji")) {
        document.getElementById("js-greeting").textContent = greeting;
        document.getElementById("js-emoji").textContent = emoji;
    }
}
updateGreeting();
/* Documentation: Sticky Tab */
document.addEventListener("scroll", function () {
    let target = document.querySelector("main #tab nav");
    if (target) {
        let rect = target.getBoundingClientRect();
        if (rect.top <= 12) {
            target.classList.add("scrolled");
        } else {
            target.classList.remove("scrolled");
        }
    }
});
/* Documentation: Anchor Scroll */
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("main #tab a");
    const offset = 80;
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            if (targetId === "about") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.getBoundingClientRect().top + window.scrollY - offset,
                        behavior: "smooth",
                    });
                }
            }
        });
    });
});
/* Documentation: Profile Card Scroll Effect */
window.addEventListener("scroll", function () {
    const profile = document.querySelector(".profile");
    const scrollY = window.scrollY;
    const startOffset = 140;
    const maxScrollEffect = 480;
    const effectiveScroll = Math.min(Math.max(scrollY - startOffset, 0), maxScrollEffect);
    const scrollPercent = effectiveScroll / maxScrollEffect;
    const scale = 1 + scrollPercent * -0.25;
    profile.style.transform = `scale(${scale})`;
});
/* Documentation: Scheme Handler */
function applyScheme(scheme) {
    document.body.classList.remove("scheme-light", "scheme-dark");
    document.body.classList.add(`scheme-${scheme}`);
    if (document.querySelector(".scheme-toggle")) {
        const iconLight = document.querySelector(".scheme-toggle .icon-light");
        const iconDark = document.querySelector(".scheme-toggle .icon-dark");
        if (scheme === "light") {
            iconLight.style.display = "inline";
            iconDark.style.display = "none";
        } else {
            iconLight.style.display = "none";
            iconDark.style.display = "inline";
        }
    }
}
function initScheme() {
    let savedScheme = localStorage.getItem("color-scheme");
    if (!savedScheme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        savedScheme = prefersDark ? "dark" : "light";
        localStorage.setItem("color-scheme", savedScheme);
    }
    applyScheme(savedScheme);
}
if (document.querySelector(".scheme-toggle")) {
    document.querySelector(".scheme-toggle").addEventListener("click", () => {
        const currentScheme = document.body.classList.contains("scheme-dark") ? "dark" : "light";
        const newScheme = currentScheme === "dark" ? "light" : "dark";
        localStorage.setItem("color-scheme", newScheme);
        applyScheme(newScheme);
    });
}
initScheme();
