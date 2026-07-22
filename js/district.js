"use strict";

/* ==========================================================
   UPVERSE DISTRICT CONTROLLER
========================================================== */

let districtSlug = null;

let districtData = null;


/* ==========================================================
   GET SLUG
========================================================== */

function getDistrictSlug(){

    const params =
    new URLSearchParams(window.location.search);

    return params.get("slug");

}


/* ==========================================================
   LOAD DISTRICT
========================================================== */

async function loadDistrict() {

    try {

        Renderer.showLoading();

        districtSlug = getDistrictSlug();

        if (!districtSlug) {

            throw new Error("District slug missing.");

        }

        districtData = await UPVERSE_API.getDistrictAIData(districtSlug);

        console.log("District Data =>", districtData);

        window.currentDistrictData = districtData;

        Renderer.render(districtData);
        renderDistrictHeroImage(districtData);
        await Gallery.init(districtData);

    } catch (error) {

        console.error(error);

        Renderer.showError(error.message || "Unable to load district.");

    } finally {

        Renderer.hideLoading();

    }

}

function renderDistrictHeroImage(data){

    const heroImage = document.getElementById("districtHeroImage");

    if(!heroImage) return;

    const slug =
        data?.basic?.slug ||
        districtSlug;

    heroImage.src = `assets/images/districts/${slug}.webp`;

    heroImage.alt =
        data?.basic?.name || "District";

    heroImage.onerror = function(){

        this.src =
        "assets/images/upverse-placeholder.webp";

    };

}

function planTrip(){

    window.location.href =
    `tripPlanner.html?district=${districtSlug}`;

}


/* ==========================================================
   ASK AI
========================================================== */

const askBtn =
document.getElementById("askAiBtn");

const askInput =
document.getElementById("aiQuestion");

if (askBtn) {

    askBtn.addEventListener("click", async () => {

        const question = askInput.value.trim();

        if (!question) {

            Renderer.renderAIAnswer(
                "Please enter a question."
            );

            return;

        }

        Renderer.renderAIAnswer(
            "🤖 Thinking..."
        );

        try {

            const response =
            await UPVERSE_API.askDistrictAI(

                districtSlug,

                question

            );

            Renderer.renderAIAnswer(

                response.answer ||

                "No response received."

            );

        }

        catch (error) {

            console.error(error);

            Renderer.renderAIAnswer(

                "⚠️ Unable to contact AI."

            );

        }

    });

}


/* ==========================================================
   SHARE DISTRICT
========================================================== */

const shareBtn =
document.getElementById("shareDistrictBtn");

if (shareBtn) {

    shareBtn.addEventListener("click", async () => {

        try {

            if (navigator.share) {

                await navigator.share({

                    title:

                    districtData.basic.name,

                    text:

                    districtData.basic.tagline,

                    url:

                    window.location.href

                });

            }

            else {

                await navigator.clipboard.writeText(

                    window.location.href

                );

                alert(

                    "District link copied."

                );

            }

        }

        catch (error) {

            console.error(error);

        }

    });

}


/* ==========================================================
   NEARBY DISTRICT NAVIGATION
========================================================== */

const nearbyGrid =

document.getElementById("nearbyGrid");

if (nearbyGrid) {

    nearbyGrid.addEventListener("click", e => {

        const card =

        e.target.closest("[data-slug]");

        if (!card) return;

        window.location.href =

        `district.html?slug=${card.dataset.slug}`;

    });

}


/* ==========================================================
   ASK AI FROM PLACE CARD
========================================================== */

document.addEventListener("click", async e => {

    const button =

    e.target.closest(".ask-ai-place");

    if (!button) return;

    const place =

    button.dataset.name;

    askInput.value =

    `Tell me everything about ${place}`;

    askBtn.click();

});


/* ==========================================================
   GALLERY PREVIEW
========================================================== */

document.addEventListener("click", e => {

    const image =

    e.target.closest(".gallery-item img");

    if (!image) return;

    window.open(

        image.src,

        "_blank"

    );

});


/* ==========================================================
   INITIALIZE
========================================================== */

window.addEventListener("load", () => {

    loadDistrict();

});


console.log(

    "✅ District Controller Ready"

);
