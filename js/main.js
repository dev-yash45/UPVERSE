/* ======================================================
   UPVERSE
   Main JavaScript File
   Version : 1.0
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 UPVERSE Initialized");

    initNavbar();
    initTheme();
    initSmoothScroll();
    initScrollIndicator();

});

/* ======================================================
   NAVBAR SCROLL EFFECT
====================================================== */

function initNavbar() {

    const header = document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}

/* ======================================================
   THEME TOGGLE
====================================================== */

function initTheme() {

    const themeBtn = document.querySelector(".theme-btn");

    if (!themeBtn) return;

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    } else {
        themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
            localStorage.setItem("theme", "light");

        } else {

            themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
            localStorage.setItem("theme", "dark");

        }

    });

}

/* ======================================================
   SMOOTH SCROLL
====================================================== */

function initSmoothScroll() {

    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1800);

});

function initScrollIndicator() {

    const indicator = document.querySelector(".scroll-indicator");

    if (!indicator) return;

    indicator.addEventListener("click", () => {

        window.scrollBy({

            top: window.innerHeight,

            behavior: "smooth"

        });

    });

}
