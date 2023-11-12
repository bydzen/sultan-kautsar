// Dynamic main height to minimum height 100vh
const main = document.querySelector("main");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
main.style.minHeight = `calc(100vh - ${header.offsetHeight}px - ${footer.offsetHeight}px)`;
window.addEventListener("resize", () => {
  main.style.minHeight = `calc(100vh - ${header.offsetHeight}px - ${footer.offsetHeight}px)`;
});

// Popover trigger
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
popoverTriggerList.forEach((popoverTriggerEl) => {
  popoverTriggerEl.style.cursor = "pointer";
});

// Tooltip trigger
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// Form validation
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Navigation
const navigation = document.getElementById("navigation");
navigation.outerHTML = `
<li class="nav-item">
<a class="nav-link ${document.querySelector("section#index") ? "active" : ""}" href="/">Home</a>
</li>
<li class="nav-item">
<a class="nav-link ${document.querySelector("section#about") ? "active" : ""}" href="/about.html">About</a>
</li>
<li class="nav-item dropdown">
<a class="nav-link dropdown-toggle ${document.querySelector("section#resource") ? "active" : ""}"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Resource</a>
<ul class="dropdown-menu">
<li><a class="dropdown-item" href="/resource.html">All Resources</a></li>
<li><hr class="dropdown-divider" /></li>
<li><a class="dropdown-item" href="/resource.html#achievement">Achievement</a></li>
<li><a class="dropdown-item" href="/resource.html#uiux">U/UX Project</a></li>
<li><a class="dropdown-item" href="/resource.html#website">Website Project</a></li>
<li><a class="dropdown-item" href="/resource.html#resume">Personal Resume</a></li>
</ul>
</li>
<li class="nav-item">
<a class="nav-link ${document.querySelector("section#contact") ? "active" : ""}" href="/contact.html">Contact</a>
</li>
`;
let activeNav = document.querySelector(".nav-item .active");
if (activeNav) {
  activeNav.setAttribute("aria-current", "page");
}

// Scheme toggle
const schemeToggle = document.getElementById("scheme-toggle");
schemeToggle.outerHTML = `
<li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
<div class="vr d-none d-lg-flex h-100 mx-lg-2 text-dark-50"></div>
<hr class="d-lg-none my-2 text-dark-50" />
</li>
<li class="nav-item dropdown">
<button class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex w-100 align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" aria-label="Toggle theme (auto)">
<svg class="bi my-1 theme-icon-active"><use href="#circle-half"></use></svg>
<span class="d-lg-none ms-2" id="bd-theme-text">Toggle theme</span>
</button>
<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
<li>
<button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
<svg class="bi me-2 opacity-50 theme-icon"><use href="#sun-fill"></use></svg>
Light
<svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
</button>
</li>
<li>
<button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
<svg class="bi me-2 opacity-50 theme-icon"><use href="#moon-stars-fill"></use></svg>
Dark
<svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
</button>
</li>
<li>
<button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
<svg class="bi me-2 opacity-50 theme-icon"><use href="#circle-half"></use></svg>
Auto
<svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
</button>
</li>
</ul>
</li>
`;

// Scheme utility
const schemeUtility = document.getElementById("scheme-utility");
schemeUtility.outerHTML = `
<style>
.bi {
width: 1em;
height: 1em;
fill: currentcolor;
vertical-align: -0.125em;
}
.navbar .dropdown-menu .active .bi {
display: block !important;
}
</style>
<svg xmlns="http://www.w3.org/2000/svg" class="d-none">
<symbol id="check2" viewBox="0 0 16 16">
<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
</symbol>
<symbol id="circle-half" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
</symbol>
<symbol id="moon-stars-fill" viewBox="0 0 16 16">
<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
<path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
</symbol>
<symbol id="sun-fill" viewBox="0 0 16 16">
<path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
</symbol>
</svg>
`;
