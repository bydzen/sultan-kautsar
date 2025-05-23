/* Documentation: async gtag */
let script = document.createElement("script");
script.src = "https://www.googletagmanager.com/gtag/js?id=G-67321R6THH";
script.async = true;
script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-67321R6THH");
};
document.head.appendChild(script);

/* Documentation: Google Analytics */
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-67321R6THH");

/* Documentation: Google Tag Manager */
(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-MWNWFH7Z");

/* Documentation: noscript GTM */
document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-MWNWFH7Z";
    iframe.height = 0;
    iframe.width = 0;
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);
});
