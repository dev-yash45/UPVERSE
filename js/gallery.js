"use strict";

/* ==========================================================
   UPVERSE GALLERY MODULE
========================================================== */

const Gallery = {

    districtName:"",

    places: [],

    images: [],
    
    cacheKey: "",

    async init(districtData) {

        try {

            this.places = this.extractPlaces(districtData);
            this.districtName = districtData.basic.name;
            this.cacheKey = `upverse_gallery_${ districtData.basic.name.toLowerCase().replace(/\s+/g, "-") }`;
            this.clearOldCache();

            console.log("📍 Gallery Places:", this.places);

            if (this.places.length === 0) {

                console.warn("No gallery places found.");

                return;

          }

// Load Cache
            if (this.loadCache()) {

                console.log("✅ Gallery Loaded From Cache");

                this.render();
                const closeBtn = document.getElementById("closeGalleryModal");

                if (closeBtn) {

                    closeBtn.onclick = () => this.closeModal();

                    }

                return;

            }
            
            this.showLoading();
// Fetch Images
            await this.fetchImages();

// Save Cache
            this.cacheImages();

// Render Gallery
            this.render();

             }

        catch (error) {

            console.error("Gallery Error:", error);

        }

    },



    /* ==========================================================
       EXTRACT PLACES
    ========================================================== */

    extractPlaces(data) {

    const places = [];

    // Tourist Places (Highest Priority)
    if (Array.isArray(data.places)) {

        data.places.forEach(place => {

            if (place?.name) {

                places.push(place.name);

            }

        });

    }

    // Hidden Gems
    if (Array.isArray(data.hiddenGems)) {

        data.hiddenGems.forEach(place => {

            if (place?.name) {

                places.push(place.name);

            }

        });

    }

    // Gallery Keywords (Lowest Priority)
    if (Array.isArray(data.gallery)) {

        places.push(...data.gallery);

    }

    // Remove Duplicates
    return [...new Set(places)];

},

    showLoading() {

    const galleryGrid = document.getElementById("galleryGrid");

    if (!galleryGrid) return;

    galleryGrid.innerHTML = `
        <div class="gallery-loading">
            Loading Gallery...
        </div>
    `;

},
    /* ==========================================================
       FETCH IMAGES
    ========================================================== */
    
    async fetchImages() {

    this.images = await Promise.all(

        this.places.map(async (place) => ({

            title: place,

            image: await this.fetchWikipediaImage(
    place,
    this.districtName
)

        }))

    );

    console.log("🖼 Gallery Images:", this.images);
    console.log("District:", this.cacheKey);
    console.table(this.images);

},
    async fetchWikimediaImage(place, district) {

    try {

       const queries = [

    `${place}, ${district}, Uttar Pradesh, India`,

    `${place} ${district}`,

    `${place} Uttar Pradesh`,

    place

];

        for (const query of queries) {

            const searchUrl =
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

            const searchResponse = await fetch(searchUrl);

            const searchData = await searchResponse.json();

            if (!searchData.query.search.length) {

                continue;

            }

            for (const result of searchData.query.search) {

                const summaryUrl =
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result.title)}`;

                const summaryResponse = await fetch(summaryUrl);

                if (!summaryResponse.ok) {

                    continue;

                }

                const summary = await summaryResponse.json();

                if (summary.thumbnail?.source) {

                    return summary.thumbnail.source;

                }

            }

        }

        return null;

    }

    catch (error) {

        console.error("Wikipedia Error:", error);

        return null;

    }

},
    /* ==========================================================
       CACHE IMAGES
    ========================================================== */

    cacheImages() {

    try {

        localStorage.setItem(
    this.cacheKey,
    JSON.stringify(this.images)
);

        console.log("✅ Gallery Cached");

    }

    catch (error) {

        console.error("Cache Error:", error);

    }

},



    /* ==========================================================
       LOAD CACHE
    ========================================================== */

    loadCache() {

    try {

        const cache = localStorage.getItem(this.cacheKey);

        if (!cache) {

            return false;

        }

        this.images = JSON.parse(cache);

        return true;

    }

    catch (error) {

        console.error("Cache Error:", error);

        return false;

    }

},



    /* ==========================================================
       RENDER GALLERY
    ========================================================== */

   render() {

    const galleryGrid = document.getElementById("galleryGrid");

    if (!galleryGrid) return;

    // Loading hata do
    galleryGrid.innerHTML = "";

    this.images.forEach(image => {

        galleryGrid.appendChild(
            this.createCard(image)
        );

    });

},


    /* ==========================================================
       CREATE CARD
    ========================================================== */
    openModal(image){

    const modal=document.getElementById("galleryModal");

    document.getElementById("galleryModalImage").src=image.image;
    const closeBtn = document.getElementById("closeGalleryModal");

    if (closeBtn) {

        closeBtn.onclick = () => this.closeModal();

    }
    document.getElementById("galleryModalTitle").textContent=image.title;

    modal.style.display="flex";

},

    closeModal(){

    document.getElementById("galleryModal").style.display="none";

},
    clearOldCache() {

    const currentKey = this.cacheKey;

    Object.keys(localStorage).forEach(key => {

        if (
            key.startsWith("upverse_gallery_") &&
            key !== currentKey
        ) {

            localStorage.removeItem(key);

        }

    });

},

   createCard(image) {

    const card = document.createElement("div");
    card.addEventListener("click",()=>{

    this.openModal(image);

});
    card.className = "gallery-card";

    card.innerHTML = `

        <img
            src="${image.image || "assets/images/placeholder.webp"}"
            alt="${image.title}"
            loading="lazy"
        >

        <div class="gallery-overlay">

            <h3>${image.title}</h3>

        </div>

    `;

    return card;

}
};

console.log("✅ Gallery Module Ready");
