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
