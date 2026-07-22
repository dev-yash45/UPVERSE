/* ==========================================================
   UPVERSE RENDERER
========================================================== */
const DEFAULT_IMAGE =
"https://placehold.co/1200x700/1d3557/ffffff?text=UPVERSE";


"use strict";

const Renderer = (() => {

    /* ======================================================
       HELPERS
    ====================================================== */

    function $(id) {

        return document.getElementById(id);

    }

    function setText(id, value, fallback = "--") {

        const element = $(id);

        if (!element) return;

        element.textContent = value || fallback;

    }

    function setHTML(id, value, fallback = "") {

    const element = $(id);

    if (!element) return;

    element.innerHTML = value || fallback;

}

    function setImage(id, src) {

        const image = $(id);

        if (!image) return;

        image.src = src || DEFAULT_IMAGE;

    }

    function clear(id) {

        const element = $(id);

        if (!element) return;

        element.innerHTML = "";

    }

    function append(id, html) {

        const element = $(id);

        if (!element) return;

        element.insertAdjacentHTML(

            "beforeend",

            html

        );

    }

    /* ======================================================
       HERO
    ====================================================== */

    function renderHero(data) {

        setText(

            "districtName",

            data.basic?.name

        );

        setText(

            "districtTagline",

            data.basic?.tagline

        );

        setImage(

            "districtHeroImage",

            data.heroImage

        );

        document.title =

            `${data.basic?.name} • UPVERSE`;

    }

    /* ======================================================
       QUICK STATS
    ====================================================== */

    function renderQuickStats(data) {

        setText(

            "population",

            data.basic?.population

        );

        setText(

            "area",

            data.basic?.area

        );

        setText(

            "bestSeason",

            data.basic?.bestSeason

        );

        setText(

            "famousFor",

            data.basic?.famousFor

        );

    }

    /* ======================================================
       AI INSIGHTS
    ====================================================== */

    function renderAIInsights(data) {

        setText(

            "aiScore",

            `${data.ai?.score || 0}%`

        );

        setText(

            "bestVisit",

            data.ai?.bestTravelMonth

        );

        setText(

            "recommendedStay",

            data.ai?.recommendedStay

        );

        setText(

            "budgetRange",

            data.ai?.budgetRange

        );

        setText(

            "travelStyle",

            data.ai?.travelStyle

        );

        clear("perfectFor");

        (data.ai?.perfectFor || [])

        .forEach(item => {

            append(

                "perfectFor",

                `

                <span>

                    ${item}

                </span>

                `

            );

        });

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */



    /* ======================================================
       AI OVERVIEW
    ====================================================== */

    function renderOverview(data){

        setText(

            "districtOverview",

            data.ai?.overview ||

            "No overview available."

        );

    }


    /* ======================================================
       HIGHLIGHTS
    ====================================================== */

    function renderHighlights(data){

        setText(

            "historyHighlight",

            data.highlights?.history

        );

        setText(

            "foodHighlight",

            data.highlights?.food

        );

        setText(

            "natureHighlight",

            data.highlights?.nature

        );

        setText(

            "spiritualHighlight",

            data.highlights?.spiritual

        );

    }


    /* ======================================================
       TRAVEL METER
    ====================================================== */

    function renderTravelMeter(data){

        const container =

        document.getElementById(

            "travelMeter"

        );

        if(!container) return;

        container.innerHTML="";

        const meter =

        data.travelMeter || {};

        Object.entries(meter)

        .forEach(([key,value])=>{

            container.insertAdjacentHTML(

                "beforeend",

                `

                <div class="meter-item">

                    <div class="meter-label">

                        <span>

                            ${capitalize(key)}

                        </span>

                        <span>

                            ${value}%

                        </span>

                    </div>

                    <div class="progress">

                        <div

                        class="progress-fill"

                        data-value="${value}"

                        style="width:${value}%">

                        </div>

                    </div>

                </div>

                `

            );

        });

    }


    /* ======================================================
       AI MOODS
    ====================================================== */

    function renderMoods(data){

        const container =

        document.getElementById(

            "moodGrid"

        );

        if(!container) return;

        container.innerHTML="";

        (data.moods || [])

        .forEach(mood=>{

            container.insertAdjacentHTML(

                "beforeend",

                `

                <div class="mood-chip">

                    ✨

                    ${mood}

                </div>

                `

            );

        });

    }


    /* ======================================================
       HELPERS
    ====================================================== */

    function capitalize(text){

        return text

        .charAt(0)

        .toUpperCase()

        +

        text.slice(1);

    }
    
        /* ======================================================
       UNIVERSAL CARD
    ====================================================== */

    function createInfoCard(item, type = "") {

    return `
        <div class="info-card" style="
        background:#18233a;
        border:1px solid rgba(255,255,255,.08);
        border-radius:22px;
        overflow:hidden;
        display:flex;
        flex-direction:column;
        transition:.3s;
        box-shadow:0 10px 30px rgba(0,0,0,.25);
    ">

            <h2 style="
                margin:0 0 14px;
                color:white;
                font-size:28px;
                font-family:Cinzel,serif;">${item.name}</h2>

            <p style="
                display:flex;
                flex-wrap:wrap;
                gap:10px;
                margin-bottom:20px;
            ">${item.description}</p>

        </div>
    `;

}
    /* ======================================================
       TAGS
    ====================================================== */

    function createTags(tags = []) {

        if (!tags.length) return "";

        return `

        <div class="info-tags">

        ${tags.map(tag => `

            <span class="info-tag">

                ${tag}

            </span>

        `).join("")}

        </div>

        `;

    }
    /* ======================================================
       MAP
    ====================================================== */
    function renderMap(data){

    const mapDiv =
        document.getElementById("districtMap");

    if(!mapDiv) return;

    const lat =
        data.location?.lat;

    const lng =
        data.location?.lng;

    if(!lat || !lng){

        mapDiv.innerHTML =
        "<h2 style='padding:40px;text-align:center;'>Location unavailable</h2>";

        return;

    }

    const map =
        L.map("districtMap")
        .setView([lat,lng],11);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {

            attribution:
            "&copy; OpenStreetMap"

        }

    ).addTo(map);

    L.marker([lat,lng])
    .addTo(map)
    .bindPopup(data.basic.name)
    .openPopup();

}

    /* ======================================================
       UNIVERSAL SECTION RENDERER
    ====================================================== */

    function renderCards(

        containerId,

        items,

        badge

    ) {

        clear(containerId);

        if (!items || !items.length) {

            append(

                containerId,

                `

                <div class="empty-card">

                    No data available.

                </div>

                `

            );

            return;

        }

        items.forEach(item => {

            append(

                containerId,

                createInfoCard(

                    item,

                    badge

                )

            );

        });

    }


    /* ======================================================
       PLACES
    ====================================================== */

    function renderPlaces(data) {

        renderCards(

            "placesGrid",

            data.places,

            "📍 Place"

        );

    }


    /* ======================================================
       FOOD
    ====================================================== */

    function renderFoods(data) {

        renderCards(

            "foodGrid",

            data.foods,

            "🍛 Food"

        );

    }


    /* ======================================================
       FESTIVALS
    ====================================================== */

    function renderFestivals(data) {

        renderCards(

            "festivalGrid",

            data.festivals,

            "🎉 Festival"

        );

    }


    /* ======================================================
       HIDDEN GEMS
    ====================================================== */

    function renderHiddenGems(data) {

        renderCards(

            "hiddenGemGrid",

            data.hiddenGems,

            "💎 Hidden Gem"

        );

    }
    
        /* ======================================================
       GALLERY
    ====================================================== */

    function renderGallery(data){

        clear("galleryGrid");

        if(!data.gallery || !data.gallery.length){

            append(

                "galleryGrid",

                `<div class="empty-card">

                    Gallery not available.

                </div>`

            );

            return;

        }

        data.gallery.forEach(image=>{

            append(

                "galleryGrid",

                `

                <div class="gallery-item">

                    <img

                    src="${image || DEFAULT_IMAGE}"

                    loading="lazy"

                    alt="Gallery Image">

                </div>

                `

            );

        });

    }


    /* ======================================================
       NEARBY DISTRICTS
    ====================================================== */

    function renderNearby(data){

        clear("nearbyGrid");

        if(!data.nearby || !data.nearby.length){

            append(

                "nearbyGrid",

                `<div class="empty-card">

                    No nearby districts found.

                </div>`

            );

            return;

        }

        data.nearby.forEach(item=>{

            append(

                "nearbyGrid",

                `

                <div

                class="info-card"

                data-slug="${item.slug}">

                    <div class="info-content">

                        <h3>

                            ${item.name}

                        </h3>

                        <p>

                            ${item.distance}

                        </p>

                    </div>

                </div>

                `

            );

        });

    }

    /* ======================================================
   LEAFLET MAP
====================================================== */

    let districtMap = null;

    const MAP_ICONS = {

    district: L.icon({
        iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize:[25,41],
        iconAnchor:[12,41],
        popupAnchor:[1,-34],
        shadowSize:[41,41]
    }),

    place: L.icon({
        iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize:[25,41],
        iconAnchor:[12,41],
        popupAnchor:[1,-34],
        shadowSize:[41,41]
    })

};


/* ======================================================
   RENDER MAP
====================================================== */

    function renderMap(data){

        const mapContainer =
        document.getElementById("districtMap");

        if(!mapContainer) return;

    /* Remove previous map */

        if(districtMap){

            districtMap.remove();

            districtMap = null;

    }

    const location =
    data.location;

    if(!location){

        mapContainer.innerHTML =
        `
        <div class="empty-card">
            Map data unavailable.
        </div>
        `;

        return;

    }

    districtMap = L.map("districtMap",{

        zoomControl:true,

        scrollWheelZoom:true

    }).setView(

        [

            location.lat,

            location.lng

        ],

        location.zoom || 11

    );

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            attribution:
            "&copy; OpenStreetMap"

        }

    ).addTo(districtMap);
    
        /* ======================================================
       DISTRICT MARKER
    ====================================================== */

    const districtPopup = `

        <div class="map-popup">

            <h3>

                📍 ${data.basic?.name || "District"}

            </h3>

            <p>

                ${data.ai?.overview || ""}

            </p>

            <div>

                <span class="map-badge">

                    ⭐ ${data.ai?.score || "--"} AI Score

                </span>

                <span class="map-badge">

                    👥 ${data.basic?.population || "--"}

                </span>

                <span class="map-badge">

                    🌤 ${data.basic?.bestSeason || "--"}

                </span>

            </div>

            <br>

            <a

                class="map-btn"

                href="https://www.google.com/maps?q=${data.basic?.name || "District"}"

                target="_blank"

            >

                📍 Open in Google Maps

            </a>

        </div>

    `;

    L.marker(

        [

            location.lat,

            location.lng

        ],

        {

            icon: MAP_ICONS.district

        }

    )

    .addTo(districtMap)

    .bindPopup(

        districtPopup,

        {

            maxWidth:320

        }

    )

    .openPopup();
    
        /* ======================================================
       TOURIST PLACE MARKERS
    ====================================================== */

    (data.places || []).forEach(place => {

        if (
            place.lat == null ||
            place.lng == null
        ) return;

        const popup = `

            <div class="map-popup">

                <h3>

                    📍 ${place.name}

                </h3>

                <p>

                    ${place.description || ""}

                </p>

                <div>

                    <span class="map-badge">

                        ⭐ ${place.rating || "--"}

                    </span>

                    <span class="map-badge">

                        🕒 ${place.bestTime || "--"}

                    </span>

                </div>

                <div style="margin-top:12px;">

                    <span class="map-badge">

                        🎟 ${place.entryFee || "Free"}

                    </span>

                    <span class="map-badge">

                        ⏳ ${place.visitDuration || "--"}

                    </span>

                </div>

                <br>

                <a

                    class="map-btn"
                    href="https://www.google.com/maps?q=${place.name} + ${data.basic?.name || "District"}"
                   
                    target="_blank"

                >

                    📍 Open in Google Maps

                </a>

            </div>

        `;

        L.marker(

            [

                place.lat,

                place.lng

            ],

            {

                icon: MAP_ICONS.place

            }

        )

        .addTo(districtMap)

        .bindPopup(

            popup,

            {

                maxWidth:320

            }

        );

    });
    }
    /* ======================================================
       ASK AI
    ====================================================== */

    function renderAIAnswer(answer){

        setHTML(

            "aiAnswer",

            answer ||

            "No response available."

        );

    }


    /* ======================================================
       LOADING
    ====================================================== */

    function showLoading(){

        document.body.classList.add(

            "loading"

        );

    }

    function hideLoading(){

        document.body.classList.remove(

            "loading"

        );

    }


    /* ======================================================
       ERROR
    ====================================================== */

    function showError(message){

        setHTML(

            "districtOverview",

            `

            <div class="error-card">

                <h3>

                    ⚠️ Error

                </h3>

                <p>

                    ${message}

                </p>

            </div>

            `

        );

    }


    /* ======================================================
       MASTER RENDER
    ====================================================== */

    function render(data){

        renderHero(data);

        renderQuickStats(data);

        renderAIInsights(data);

        renderOverview(data);

        renderHighlights(data);

        renderTravelMeter(data);

        renderMoods(data);

        renderPlaces(data);

        renderFoods(data);

        renderFestivals(data);

        renderHiddenGems(data);

        renderGallery(data);

        renderNearby(data);
        renderMap(data);

    }
    
    
    return{

    render,

    renderHero,

    renderQuickStats,

    renderAIInsights,

    renderOverview,

    renderHighlights,

    renderTravelMeter,

    renderMoods,

    renderPlaces,

    renderFoods,

    renderFestivals,

    renderHiddenGems,

    renderGallery,

    renderNearby,

    renderAIAnswer,

    showLoading,

    hideLoading,

    showError

};
})();

