window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

const currentConsent = getCookie("user_consent");
if (currentConsent === "granted") {
    gtag("consent", "default", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        functionality_storage: "granted",
        security_storage: "granted",
    });
} else {
    gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "denied",
        security_storage: "granted",
        wait_for_update: 500,
    });
}

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

document.addEventListener("DOMContentLoaded", function () {
    const copyright = document.querySelector("footer p");
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace("2025", currentYear);
    }

    const consentStatus = getCookie("user_consent");
    if (consentStatus) return;

    const banner = document.createElement("div");
    banner.id = "consent-banner";
    banner.className = "consent";
    banner.innerHTML = `
        <div class="consent-content">
            <p>We use cookies to enhance your experience. Do you agree to our data usage?</p>
            <div class="consent-button">
                <button id="accept-consent" class="btn-accept">Accept</button>
                <button id="decline-consent" class="btn-decline">Decline</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    document.getElementById("accept-consent").addEventListener("click", function () {
        const d = new Date();
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        document.cookie = "user_consent=granted; expires=" + d.toUTCString() + "; path=/";
        banner.style.display = "none";
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
        banner.style.display = "none";
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
