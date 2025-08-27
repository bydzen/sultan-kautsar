/* Documentation: Theme JS */
const root = document.documentElement;
const themeToggle = document.querySelector("footer img");
const THEME_KEY = "theme";
const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
};
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
const updateThemeIcon = (theme) => {
    if (!themeToggle) return;
    themeToggle.src = theme === "dark"
        ? "/asset/resource/img/icon-sun.svg"
        : "/asset/resource/img/icon-moon.svg";
};
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    });
}
setTheme(getPreferredTheme());
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    setTheme(e.matches ? "dark" : "light");
});

/* Documentation: Copyright Year JS */
const copyright = document.querySelector("footer p");
if (copyright) {
    const currentYear = new Date().getFullYear();
    copyright.textContent = copyright.textContent.replace("2025", currentYear);
}
