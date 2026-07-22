/* ==========================================
   OVERVIEW SECTION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initOverviewCounter();
    initOverviewReveal();

});

/* ==========================================
   ANIMATED COUNTER
========================================== */

function initOverviewCounter() {

    const stats = document.querySelectorAll(".overview-stat h3");

    if (!stats.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateCounter(stats[0], 75, "+");
            animateCounter(stats[1], 24, " Cr+");
            animateCounter(stats[2], 4, "");
            animateCounter(stats[3], 300, "+");

            observer.disconnect();

        });

    }, {

        threshold:0.5

    });

    observer.observe(document.querySelector(".overview"));

}

/* ==========================================
   COUNTER FUNCTION
========================================== */

function animateCounter(element, target, suffix = "") {

    let current = 0;

    const increment = target / 80;

    const timer = setInterval(() => {

        current += increment;

        if(current >= target){

            current = target;

            clearInterval(timer);

        }

        element.textContent = Math.floor(current) + suffix;

    },20);

}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initOverviewReveal(){

    const cards = document.querySelectorAll(".overview-card");

    const stats = document.querySelectorAll(".overview-stat");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.2

    });

    [...cards,...stats].forEach(item=>{

        observer.observe(item);

    });

}
