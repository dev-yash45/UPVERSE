"use strict";

/* ==========================================================
   CONFIG
========================================================== */

const INITIAL_CARDS = 9;

let filteredDistricts = [...districts];

let visibleCards = INITIAL_CARDS;


/* ==========================================================
   DOM
========================================================== */

const districtGrid =
document.getElementById("districtGrid");

const featuredTitle =
document.getElementById("featuredTitle");

const featuredDescription =
document.getElementById("featuredDescription");

const featuredCategory =
document.getElementById("featuredCategory");

const featuredPriority =
document.getElementById("featuredPriority");

const featuredImage =
document.getElementById("featuredImage");

const loadMoreBtn =
document.getElementById("loadMoreBtn");

const emptyState =
document.getElementById("emptyState");


/* ==========================================================
   FEATURED DISTRICT
========================================================== */

function renderFeaturedDistrict(){

    const featured =
    districts.find(d=>d.featured);

    if(!featured) return;

    featuredTitle.textContent =
    featured.name;

    featuredCategory.textContent =
    featured.categories.join(", ");

    featuredPriority.textContent =
    "Priority " + featured.priority;

    featuredImage.src =
    featured.image;

    featuredDescription.textContent =
    `Discover the culture, history, tourism and hidden gems of ${featured.name}.`;

}


/* ==========================================================
   CARD TEMPLATE
========================================================== */

function createDistrictCard(district){

return `

<div

class="district-card"

data-slug="${district.slug}"

data-id="${district.id}"

>

<div class="district-image">

<img

src="${district.image}"

alt="${district.name}"

loading="lazy">

<button class="favorite-btn">

<i class="fa-regular fa-heart"></i>

</button>

</div>

<div class="district-content">

<h3>

${district.name}

</h3>

<div class="category-tags">

${district.categories.map(cat=>`

<span class="category-tag">

${cat}

</span>

`).join("")}

</div>

<p>

Explore AI powered tourism,
history, culture and more.

</p>

<div class="card-footer">

<a href="#">

Explore

<i class="fa-solid fa-arrow-right"></i>

</a>

</div>

</div>

</div>

`;

}


/* ==========================================================
   RENDER GRID
========================================================== */

function renderDistricts(){

districtGrid.innerHTML="";

const items=

filteredDistricts.slice(

0,

visibleCards

);

items.forEach(d=>{

districtGrid.insertAdjacentHTML(

"beforeend",

createDistrictCard(d)

);

});

toggleLoadMore();
restoreFavorites();
toggleEmptyState();

}


/* ==========================================================
   LOAD MORE
========================================================== */

function toggleLoadMore(){

if(

visibleCards>=filteredDistricts.length

){

loadMoreBtn.style.display="none";

}

else{

loadMoreBtn.style.display="inline-flex";

}

}


/* ==========================================================
   EMPTY STATE
========================================================== */

function toggleEmptyState(){

if(filteredDistricts.length===0){

emptyState.classList.remove("hidden");

districtGrid.style.display="none";

}

else{

emptyState.classList.add("hidden");

districtGrid.style.display="grid";

}

}

/* ==========================================================
   SEARCH DOM
========================================================== */

const searchInput =
document.getElementById("districtSearch");

const searchBtn =
document.getElementById("searchBtn");

const clearBtn =
document.getElementById("clearSearch");

const suggestionBox =
document.getElementById("searchSuggestions");


/* ==========================================================
   SEARCH
========================================================== */

function searchDistricts(query){

query=query.trim().toLowerCase();

if(query===""){

filteredDistricts=[...districts];

visibleCards=INITIAL_CARDS;

renderDistricts();

hideSuggestions();

return;

}

filteredDistricts=districts.filter(d=>{

const name=d.name.toLowerCase();

const slug=d.slug.toLowerCase();

const aliases=(d.aliases||[]).join(" ").toLowerCase();

const keywords=(d.keywords||[]).join(" ").toLowerCase();

return(

name.includes(query)||

slug.includes(query)||

aliases.includes(query)||

keywords.includes(query)

);

});

visibleCards=INITIAL_CARDS;

renderDistricts();

showSuggestions(filteredDistricts);

}


/* ==========================================================
   SUGGESTIONS
========================================================== */

function showSuggestions(results){

suggestionBox.innerHTML="";

if(results.length===0){

hideSuggestions();

return;

}

results.slice(0,6).forEach(d=>{

suggestionBox.insertAdjacentHTML(

"beforeend",

`

<div

class="suggestion-item"

data-slug="${d.slug}"

>

<div>

<strong>${d.name}</strong>

<br>

<span>

${d.categories.join(", ")}

</span>

</div>

<i class="fa-solid fa-arrow-up-right-from-square"></i>

</div>

`

);

});

suggestionBox.style.display="block";

}


function hideSuggestions(){

suggestionBox.style.display="none";

}


/* ==========================================================
   OPEN DISTRICT
========================================================== */

function openDistrict(slug){

window.location.href=

`district.html?slug=${slug}`;

}


/* ==========================================================
   BEST MATCH
========================================================== */

function openBestMatch(){

const value=

searchInput.value

.trim()

.toLowerCase();

if(value==="") return;

const match=districts.find(d=>{

return(

d.name.toLowerCase().includes(value)||

d.slug.toLowerCase().includes(value)||

(d.aliases||[])

.join(" ")

.toLowerCase()

.includes(value)||

(d.keywords||[])

.join(" ")

.toLowerCase()

.includes(value)

);

});

if(match){

openDistrict(match.slug);

}

}


/* ==========================================================
   EVENTS
========================================================== */

searchInput.addEventListener(

"input",

e=>{

searchDistricts(

e.target.value

);

}

);


searchBtn.addEventListener(

"click",

openBestMatch

);


searchInput.addEventListener(

"keydown",

e=>{

if(e.key==="Enter"){

openBestMatch();

}

});


clearBtn.addEventListener(

"click",

()=>{

searchInput.value="";

filteredDistricts=[...districts];

visibleCards=INITIAL_CARDS;

renderDistricts();

hideSuggestions();

searchInput.focus();

});



/* ==========================================================
   SUGGESTION CLICK
========================================================== */

suggestionBox.addEventListener(

"click",

e=>{

const item=

e.target.closest(

".suggestion-item"

);

if(!item) return;

openDistrict(

item.dataset.slug

);

});

/* ==========================================================
   FILTERS
========================================================== */

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.dataset.filter;

        if(filter==="all"){

            filteredDistricts=[...districts];

        }

        else{

            filteredDistricts=districts.filter(d=>
                d.categories.includes(filter)
            );

        }

        visibleCards=INITIAL_CARDS;

        renderDistricts();

        hideSuggestions();

    });

});


/* ==========================================================
   TRENDING SEARCH
========================================================== */

document
.querySelectorAll(".trend-chip")
.forEach(chip=>{

    chip.addEventListener("click",()=>{

        searchInput.value=
        chip.textContent.trim();

        searchDistricts(
            chip.textContent.trim()
        );

        openBestMatch();

    });

});


/* ==========================================================
   LOAD MORE
========================================================== */

loadMoreBtn.addEventListener("click",()=>{

    visibleCards+=INITIAL_CARDS;

    renderDistricts();

});


/* ==========================================================
   CARD CLICK
========================================================== */

districtGrid.addEventListener("click",e=>{

    const card =
    e.target.closest(".district-card");

    if(!card) return;

    if(e.target.closest(".favorite-btn")) return;

    openDistrict(card.dataset.slug);

});


/* ==========================================================
   RANDOM DISTRICT
========================================================== */

const randomBtn =
document.getElementById("randomDistrictBtn");

if(randomBtn){

    randomBtn.addEventListener("click",()=>{

        const random =

        districts[

            Math.floor(

                Math.random()*districts.length

            )

        ];

        openDistrict(random.slug);

    });

}


/* ==========================================================
   SCROLL TO TOP
========================================================== */

const scrollTopBtn =
document.getElementById("scrollTopBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        scrollTopBtn.classList.add("show");

    }

    else{

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/* ==========================================================
   FAVORITES
========================================================== */

function getFavorites(){

    return JSON.parse(

        localStorage.getItem("favorites")

        || "[]"

    );

}

function saveFavorites(data){

    localStorage.setItem(

        "favorites",

        JSON.stringify(data)

    );

}

districtGrid.addEventListener("click",e=>{

    const favBtn =
    e.target.closest(".favorite-btn");

    if(!favBtn) return;

    e.stopPropagation();

    const card =
    favBtn.closest(".district-card");

    const slug =
    card.dataset.slug;

    let favorites =
    getFavorites();

    if(favorites.includes(slug)){

        favorites =
        favorites.filter(

            item=>item!==slug

        );

        favBtn.classList.remove("active");

        favBtn.innerHTML=
        `<i class="fa-regular fa-heart"></i>`;

    }

    else{

        favorites.push(slug);

        favBtn.classList.add("active");

        favBtn.innerHTML=
        `<i class="fa-solid fa-heart"></i>`;

    }

    saveFavorites(favorites);

});


/* ==========================================================
   RESTORE FAVORITES
========================================================== */

function restoreFavorites(){

    const favorites =
    getFavorites();

    document

    .querySelectorAll(".district-card")

    .forEach(card=>{

        const slug =
        card.dataset.slug;

        const btn =
        card.querySelector(".favorite-btn");

        if(favorites.includes(slug)){

            btn.classList.add("active");

            btn.innerHTML=
            `<i class="fa-solid fa-heart"></i>`;

        }

    });

}

/* ==========================================================
   PAGE LOADER
========================================================== */

window.addEventListener("load",()=>{

    const loader =
    document.getElementById("loader");

    renderFeaturedDistrict();

    renderDistricts();

    setTimeout(()=>{

        loader.classList.add("hidden");

        initializeAnimations();

    },800);

});


/* ==========================================================
   GSAP READY
========================================================== */

function initializeAnimations(){

    if(typeof gsap==="undefined") return;

    gsap.from(".hero-tag",{

        y:30,

        opacity:0,

        duration:.8

    });

    gsap.from(".hero-container h1",{

        y:40,

        opacity:0,

        duration:1,

        delay:.2

    });

    gsap.from(".hero-container p",{

        y:30,

        opacity:0,

        duration:.8,

        delay:.4

    });

    gsap.from(".search-wrapper",{

        y:40,

        opacity:0,

        duration:.8,

        delay:.5

    });

    gsap.from(".filter-btn",{

        y:20,

        opacity:0,

        duration:.5,

        stagger:.08,

        delay:.6

    });

}


/* ==========================================================
   FUTURE AI BUTTON
========================================================== */

const aiButton =
document.getElementById("recommendDistrict");

if(aiButton){

    aiButton.addEventListener("click",()=>{

        alert(

            "🚀 AI Recommendation will be connected with Dify Workflow."

        );

    });

}


/* ==========================================================
   PERFORMANCE
========================================================== */

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        console.log("Explore Page Paused");

    }

    else{

        console.log("Explore Page Active");

    }

});

/* ==========================================================
   READY
========================================================== */

console.log(
"%c🚀 UPVERSE Explore Ready",
"color:#ff9933;font-size:16px;font-weight:bold;"
);
