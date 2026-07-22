/* ==========================================================
   UPVERSE AI TRIP PLANNER
========================================================== */

"use strict";

/* ==========================================================
   GLOBALS
========================================================== */

const form =
document.getElementById(
    "tripPlannerForm"
);

const resultSection =
document.getElementById(
    "tripResult"
);

const generateButton =
document.querySelector(
    ".generate-btn"
);

const detectLocationBtn =
document.getElementById("detectLocationBtn");

const startingLocation =
document.getElementById("startingLocation");

const locationStatus =
document.getElementById("locationStatus");

/* ==========================================================
   URL PARAMS
========================================================== */

const urlParams =
new URLSearchParams(
    window.location.search
);

const districtSlug =
urlParams.get("district");

/* ==========================================================
   HELPERS
========================================================== */

function $(id){

    return document.getElementById(id);

}

/* ==========================================================
   AUTO FILL DISTRICT
========================================================== */

function initializePlanner(){

    if(!districtSlug){

        $("district").value =
        "Unknown District";

        return;

    }

    const districtName =
    districtSlug

    .replaceAll("-"," ")

    .replace(/\b\w/g,char=>

        char.toUpperCase()

    );

    $("district").value =
    districtName;

}

detectLocationBtn.addEventListener(

    "click",

    getCurrentLocation

);

async function getCurrentLocation(){

    if(!navigator.geolocation){

        locationStatus.textContent =
        "Geolocation is not supported.";

        return;

    }

    detectLocationBtn.disabled = true;

    detectLocationBtn.textContent =
    "⌛ Detecting...";

    locationStatus.textContent =
    "";

    navigator.geolocation.getCurrentPosition(

        successLocation,

        errorLocation,

        {

            enableHighAccuracy:true,

            timeout:10000,

            maximumAge:0

        }

    );

}

async function successLocation(position){

    const lat =
    position.coords.latitude;

    const lng =
    position.coords.longitude;

    await reverseGeocode(lat,lng);

}

function errorLocation(error){

    detectLocationBtn.disabled = false;

    detectLocationBtn.textContent =
    "📍 Use My Location";

    locationStatus.textContent =
    error.message;

}

async function reverseGeocode(lat,lng){

    try{

        const response =
        await fetch(

            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`

        );

        const data =
        await response.json();

        const city =

            data.address.city ||

            data.address.town ||

            data.address.village ||

            data.address.state_district ||

            data.address.county ||

            "";

        const state =

            data.address.state ||

            "";

        startingLocation.value =

            `${city}, ${state}`;

        locationStatus.textContent =
        "✅ Location detected";

        detectLocationBtn.textContent =
        "✅ Detected";
        
        setTimeout(()=>{

    detectLocationBtn.textContent =
    "📍 Use My Location";

    },2000);

    }

    catch(e){

        locationStatus.textContent =
        "Unable to detect location.";

        detectLocationBtn.textContent =
        "📍 Retry";
        

    }

    detectLocationBtn.disabled = false;

}

/* ==========================================================
   INIT
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializePlanner

);

/* ==========================================================
   FORM SUBMIT
========================================================== */

form.addEventListener(

    "submit",

    handleTripPlanner

);

async function handleTripPlanner(event){

    event.preventDefault();

    generateButton.classList.add(

        "loading"

    );

    generateButton.textContent =

        "Generating AI Trip...";

    try{

        const tripData =

        collectFormData();

        console.log(

            "Trip Data :",

            tripData

        );

        await generateAITrip(

            tripData

        );

    }

    catch(error){

        console.error(error);

    }

    finally{

        generateButton.classList.remove(

            "loading"

        );

        generateButton.textContent =

        "✨ Generate AI Trip Plan";

    }

}


/* ==========================================================
   COLLECT FORM DATA
========================================================== */

function collectFormData(){

    return{

        district:

        $("district").value,
        
        startingLocation:
        document.getElementById("startingLocation").value.trim(),
        
        startDate:

        $("startDate").value,

        duration:

        $("duration").value,

        budget:

        $("budget").value,

        travellers:

        $("travellers").value,

        travelStyle:

        $("style").value,

        stay:

        $("stay").value,

        transport:

        $("transport").value,

        food:

        $("food").value,

        specialRequest:

        $("special").value

    };

}

/* ==========================================================
   GENERATE AI TRIP
========================================================== */

async function generateAITrip(tripData) {

    showPlanningUI();

    startPlanningAnimation();

    try {

        const response = await UPVERSE_API.generateTripPlan(tripData);

        completePlanningAnimation();

        setTimeout(() => {

            hidePlanningUI();

            renderTripResult(response);

            scrollToResults();

        }, 1200);

    }

    catch (error) {

        console.error(error);

        hidePlanningUI();

        alert("Unable to generate AI Trip.");

    }

}

