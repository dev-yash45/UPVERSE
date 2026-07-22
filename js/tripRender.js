/* ==========================================================
   UPVerse Trip Render Engine - Part 1
   Planning Animation
========================================================== */

const planningSteps = [

    {
        icon: "🧠",
        text: "Reading your travel preferences...",
        progress: 10
    },

    {
        icon: "📍",
        text: "Analyzing destination...",
        progress: 25
    },

    {
        icon: "🗺️",
        text: "Optimizing travel route...",
        progress: 40
    },

    {
        icon: "💰",
        text: "Calculating budget...",
        progress: 55
    },

    {
        icon: "🏨",
        text: "Finding the best stay...",
        progress: 70
    },

    {
        icon: "🍽️",
        text: "Searching local food...",
        progress: 82
    },

    {
        icon: "📸",
        text: "Discovering hidden gems...",
        progress: 92
    },

    {
        icon: "✨",
        text: "Finalizing your itinerary...",
        progress: 100
    }

];

let planningInterval = null;



/* ==========================================================
   SHOW PANEL
========================================================== */

function showPlanningUI(){

    const panel = document.getElementById("tripAISection");

    panel.classList.remove("hidden");

    panel.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}



/* ==========================================================
   HIDE PANEL
========================================================== */

function hidePlanningUI(){

    const panel = document.getElementById("tripAISection");

    panel.classList.add("hidden");

}



/* ==========================================================
   START ANIMATION
========================================================== */

function startPlanningAnimation(){

    const fill = document.getElementById(

        "tripProgressFill"

    );

    const percent = document.getElementById(

        "tripProgressPercent"

    );

    const message = document.getElementById(

        "tripPlanningMessage"

    );

    const stepBox = document.getElementById(

        "tripPlanningSteps"

    );



    fill.style.width="0%";

    percent.innerHTML="0%";

    message.innerHTML="Initializing AI...";

    stepBox.innerHTML="";



    let current=0;



    planningInterval=setInterval(()=>{

        if(current>=planningSteps.length){

            clearInterval(planningInterval);

            return;

        }



        const step=planningSteps[current];



        fill.style.width=step.progress+"%";

        percent.innerHTML=step.progress+"%";



        message.innerHTML=`

            <span class="stepIcon">

                ${step.icon}

            </span>

            ${step.text}

        `;



        const div=document.createElement("div");



        div.className="planning-step completed";



        div.innerHTML=`

            <span>✅</span>

            ${step.text}

        `;



        stepBox.appendChild(div);



        current++;

    },1200);

}



/* ==========================================================
   COMPLETE
========================================================== */

function completePlanningAnimation(){

    clearInterval(planningInterval);



    const fill=document.getElementById(

        "tripProgressFill"

    );



    const percent=document.getElementById(

        "tripProgressPercent"

    );



    const message=document.getElementById(

        "tripPlanningMessage"

    );



    fill.style.width="100%";



    percent.innerHTML="100%";



    message.innerHTML=`

        <span style="font-size:28px">

            🎉

        </span>

        Your Personalized Trip is Ready!

    `;

}



/* ==========================================================
   SCROLL
========================================================== */

function scrollToResults(){

    const result=document.getElementById(

        "tripResult"

    );



    if(result){

        result.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

}

/* ==========================================================
   UPVerse Trip Renderer 
========================================================== */

function renderTripResult(data){

    const result = document.getElementById("tripResult");

    result.classList.remove("hidden");
    result.innerHTML = "";

    const cards = [

        createHeroCard(data),

        createJourneyCard(data),

        createBudgetCard(data),

        createStayCard(data),

        createTimeline(data),

        createFoodGuide(data),

        createPhotography(data),

        createHiddenGemsCard(
            data["🎯 Hidden Gems"] || {}
        ),

        createShopping(data),

        createSafety(data),

        createPackingCard(
            data["🎒 Packing Checklist"] || {}
        ),

        createTravelTips(data),

        createEndMessage(data)

    ];

    cards.forEach(card => {

        if(card instanceof Node){

            result.appendChild(card);

        }else{

            console.error(
                "Invalid Card Returned:",
                card
            );

        }

    });

    setTimeout(enableRevealAnimation,200);

}

function createHeroCard(data){

    const card = document.createElement("div");

    card.className = "trip-card hero-card";

    card.innerHTML = `

        <div class="hero-top">

            <h1>🌍 Personalized Trip</h1>

            <span class="ai-badge">

                Generated by UPVerse AI

            </span>

        </div>

        <p>

            ${data["🌍 Personalized Trip Overview"]}

        </p>

    `;

    return card;

}

function createJourneyCard(data){

    const journey = data["🚗 Journey Summary"];

    const card = document.createElement("div");

    card.className = "trip-card";

    card.innerHTML = `

        <h2>

            🚗 Journey Summary

        </h2>

        <div class="stats-grid">

            <div class="stat-card">

                📍

                <h3>

                    Start

                </h3>

                <p>

                    ${journey["Starting Location"]}

                </p>

            </div>

            <div class="stat-card">

                🏛️

                <h3>

                    Destination

                </h3>

                <p>

                    ${journey["Destination"]}

                </p>

            </div>

            <div class="stat-card">

                🚘

                <h3>

                    Transport

                </h3>

                <p>

                    ${journey["Suggested Transport"]}

                </p>

            </div>

            <div class="stat-card">

                📏

                <h3>

                    Distance

                </h3>

                <p>

                    ${journey["Estimated Distance"]}

                </p>

            </div>

            <div class="stat-card">

                🕒

                <h3>

                    Travel Time

                </h3>

                <p>

                    ${journey["Estimated Travel Time"]}

                </p>

            </div>

            <div class="stat-card">

                🌅

                <h3>

                    Departure

                </h3>

                <p>

                    ${journey["Best Departure Time"]}

                </p>

            </div>

        </div>

    `;

    return card;

}

/* ==========================================================
   UPVerse Trip Render Engine -
   Planning Animation
========================================================== */



/* ==========================================================
   SHOW PANEL
========================================================== */

function showPlanningUI(){

    const panel = document.getElementById("tripAISection");

    panel.classList.remove("hidden");

    panel.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}



/* ==========================================================
   HIDE PANEL
========================================================== */

function hidePlanningUI(){

    const panel = document.getElementById("tripAISection");

    panel.classList.add("hidden");

}



/* ==========================================================
   START ANIMATION
========================================================== */

function startPlanningAnimation(){

    const fill = document.getElementById(

        "tripProgressFill"

    );

    const percent = document.getElementById(

        "tripProgressPercent"

    );

    const message = document.getElementById(

        "tripPlanningMessage"

    );

    const stepBox = document.getElementById(

        "tripPlanningSteps"

    );



    fill.style.width="0%";

    percent.innerHTML="0%";

    message.innerHTML="Initializing AI...";

    stepBox.innerHTML="";



    let current=0;



    planningInterval=setInterval(()=>{

        if(current>=planningSteps.length){

            clearInterval(planningInterval);

            return;

        }



        const step=planningSteps[current];



        fill.style.width=step.progress+"%";

        percent.innerHTML=step.progress+"%";



        message.innerHTML=`

            <span class="stepIcon">

                ${step.icon}

            </span>

            ${step.text}

        `;



        const div=document.createElement("div");



        div.className="planning-step completed";



        div.innerHTML=`

            <span>✅</span>

            ${step.text}

        `;



        stepBox.appendChild(div);



        current++;

    },1200);

}



/* ==========================================================
   COMPLETE
========================================================== */

function completePlanningAnimation(){

    clearInterval(planningInterval);



    const fill=document.getElementById(

        "tripProgressFill"

    );



    const percent=document.getElementById(

        "tripProgressPercent"

    );



    const message=document.getElementById(

        "tripPlanningMessage"

    );



    fill.style.width="100%";



    percent.innerHTML="100%";



    message.innerHTML=`

        <span style="font-size:28px">

            🎉

        </span>

        Your Personalized Trip is Ready!

    `;

}



/* ==========================================================
   SCROLL
========================================================== */

function scrollToResults(){

    const result=document.getElementById(

        "tripResult"

    );



    if(result){

        result.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

}


function createBudgetCard(budget){

    if(!budget){

        return "";

    }

    let rows = "";

    // Support New Dify Format
    if(Array.isArray(budget.Table)){

        budget.Table.slice(1).forEach(row=>{

            rows += `
                <tr>
                    <td>${row[0]}</td>
                    <td>₹${row[1]}</td>
                </tr>
            `;

        });

    }

    // Support Old Format
    else if(

        budget.Table &&
        budget.Table.Category &&
        budget.Table["Estimated Cost (INR)"]

    ){

        budget.Table.Category.forEach((category,index)=>{

            rows += `
                <tr>
                    <td>${category}</td>
                    <td>₹${budget.Table["Estimated Cost (INR)"][index]}</td>
                </tr>
            `;

        });

    }

    const total =

        budget["Estimated Total Cost"] ||

        budget.Total ||

        budget.total ||

        "";

    const tip =

        budget["Money Saving Tips"] ||

        budget.Tips ||

        budget.tip ||

        "";

    return `

        <section class="trip-card budget-card">

            <h2>💰 Budget Breakdown</h2>

            <table class="budget-table">

                <thead>

                    <tr>

                        <th>Category</th>

                        <th>Cost</th>

                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

            <div class="budget-total">

                <h3>${total}</h3>

            </div>

            <div class="money-tip">

                💡 ${tip}

            </div>

        </section>

    `;

}

function createStayCard(data){

    const stay = data["🏨 Stay Recommendation"] || {};

    const accommodation =

        stay["Hotel / Hostel / Resort / Homestay"] ||

        stay["Hotel"] ||

        stay["Hostel"] ||

        stay["Resort"] ||

        stay["Homestay"] ||

        stay["Guest House"] ||

        stay["Guesthouse"] ||

        stay["Accommodation"] ||

        stay["Stay"] ||

        stay["Property"] ||

        // Agar koi unknown key ho to first value use kar lo
        Object.values(stay)[0] ||

        "Not Available";

    const price =

        stay["Price range"] ||

        stay["Price"] ||

        stay["Cost"] ||

        stay["Budget"] ||

        "Not Available";

    const locality =

        stay["Best locality"] ||

        stay["Location"] ||

        stay["Area"] ||

        stay["Best Area"] ||

        "Not Available";

    const reason =

        stay["Why it is recommended"] ||

        stay["Recommendation"] ||

        stay["Reason"] ||

        stay["Description"] ||

        "Not Available";

    const card = document.createElement("div");

    card.className = "trip-card";

    card.innerHTML = `

        <h2>🏨 Stay Recommendation</h2>

        <div class="stay-grid">

            <div>

                <strong>Accommodation</strong>

                <p>${accommodation}</p>

            </div>

            <div>

                <strong>Price</strong>

                <p>${price}</p>

            </div>

            <div>

                <strong>Best Locality</strong>

                <p>${locality}</p>

            </div>

            <div>

                <strong>Why Recommended</strong>

                <p>${reason}</p>

            </div>

        </div>

    `;

    return card;

}
function createTimeline(data){

    const itinerary = data["📅 Day Wise Itinerary"];

    if(!itinerary){

        return "";

    }

    const card = document.createElement("div");

    card.className = "trip-card";

    card.innerHTML = "<h2>📅 Day Wise Itinerary</h2>";

    // OLD FORMAT (Array)

    if(Array.isArray(itinerary)){

        itinerary.forEach(day=>{

            card.innerHTML += `

                <details class="timeline-card">

                    <summary>

                        📅 Day ${day.Day}

                    </summary>

                    <div class="timeline-content">

                        <p><strong>🌅 Morning:</strong> ${day.Morning}</p>

                        <p><strong>☀ Afternoon:</strong> ${day.Afternoon}</p>

                        <p><strong>🌇 Evening:</strong> ${day.Evening}</p>

                        <p><strong>🌙 Night:</strong> ${day.Night}</p>

                        <hr>

                        <p>🚗 ${day["Travel Time"]}</p>

                        <p>💰 ${day["Estimated Cost"]}</p>

                        <p>⏳ ${day["Time to Spend"]}</p>

                        <p>🍴 ${day["Food Stop"]}</p>

                        <p>📸 ${day["Photography Spot"]}</p>

                    </div>

                </details>

            `;

        });

    }

    // NEW FORMAT (Object)

    else{

        Object.entries(itinerary).forEach(([time,data])=>{

            card.innerHTML += `

                <details class="timeline-card">

                    <summary>

                        ${

                            time==="Morning" ? "🌅 Morning" :

                            time==="Afternoon" ? "☀ Afternoon" :

                            time==="Evening" ? "🌇 Evening" :

                            "🌙 Night"

                        }

                    </summary>

                    <div class="timeline-content">

                        <p>

                            <strong>📍 Places</strong>

                            ${data.Places || ""}

                        </p>

                        <p>

                            <strong>🚗 Travel Time</strong>

                            ${data["Travel Time"] || ""}

                        </p>

                        <p>

                            <strong>💰 Cost</strong>

                            ₹${data["Estimated Cost"] || ""}

                        </p>

                        <p>

                            <strong>⏳ Duration</strong>

                            ${data["Time to Spend"] || ""}

                        </p>

                        <p>

                            <strong>🍴 Food Stop</strong>

                            ${data["Food Stop"] || ""}

                        </p>

                        <p>

                            <strong>📸 Photography Spot</strong>

                            ${data["Photography Spot"] || ""}

                        </p>

                    </div>

                </details>

            `;

        });

    }

    return card;

}
function createFoodGuide(data){

    const food=data["🍴 Food Guide"];

    const card=document.createElement("div");

    card.className="trip-card";

    card.innerHTML=`

        <h2>

            🍴 Food Guide

        </h2>

        <div class="food-grid">

            <div class="food-card">

                🍳

                <h3>Breakfast</h3>

                <p>${food.Breakfast}</p>

            </div>

            <div class="food-card">

                🍛

                <h3>Lunch</h3>

                <p>${food.Lunch}</p>

            </div>

            <div class="food-card">

                🍽

                <h3>Dinner</h3>

                <p>${food.Dinner}</p>

            </div>

            <div class="food-card">

                🌮

                <h3>Street Food</h3>

                <p>${food["Street Food"]}</p>

            </div>

            <div class="food-card">

                ⭐

                <h3>Speciality</h3>

                <p>${food["Local Specialities"]}</p>

            </div>

            <div class="food-card">

                🍰

                <h3>Dessert</h3>

                <p>${food.Desserts}</p>

            </div>

        </div>

    `;

    return card;

}

function createPhotography(data){

    const photo=data["📸 Best Photography Spots"];

    const card=document.createElement("div");

    card.className="trip-card";

    card.innerHTML=`

        <h2>

            📸 Best Photography Spots

        </h2>

        <div class="stats-grid">

            <div class="stat-card">

                🌅

                <h3>

                    Golden Hour

                </h3>

                <p>

                    ${photo["Golden Hour"]}

                </p>

            </div>

            <div class="stat-card">

                📷

                <h3>

                    Camera Angle

                </h3>

                <p>

                    ${photo["Best Camera Angle"]}

                </p>

            </div>

            <div class="stat-card">

                ⏰

                <h3>

                    Best Time

                </h3>

                <p>

                    ${photo["Best Time"]}

                </p>

            </div>

        </div>

    `;

    return card;

}

function createHiddenGemsCard(hiddenGems){

    const gems = Object.values(hiddenGems);

    const card = document.createElement("div");

    card.className = "trip-card";

    let html = `
        <h2>🎯 Hidden Gems</h2>
        <div class="hidden-gems-grid">
    `;

    gems.forEach(gem=>{

        html += `
            <div class="hidden-gem-card">

                <div class="gem-icon">💎</div>

                <p>${gem}</p>

            </div>
        `;

    });

    html += "</div>";

    card.innerHTML = html;

    return card;

}

function createShopping(data){

    const shop=data["🛍 Local Shopping"];

    const card=document.createElement("div");

    card.className="trip-card reveal";

    card.innerHTML=`

        <h2>🛍 Local Shopping</h2>

        <div class="stats-grid">

            <div class="stat-card">

                🏬

                <h3>Market</h3>

                <p>${shop["Popular markets"]}</p>

            </div>

            <div class="stat-card">

                🎁

                <h3>Souvenirs</h3>

                <p>${shop["Best souvenirs"]}</p>

            </div>

            <div class="stat-card">

                💰

                <h3>Price Range</h3>

                <p>${shop["Approximate prices"]}</p>

            </div>

        </div>

    `;

    return card;

}

function createSafety(data){

    const safety=data["⚠ Safety Tips"];

    const card=document.createElement("div");

    card.className="trip-card reveal";

    card.innerHTML=`

        <h2>⚠ Safety Tips</h2>

        <div class="food-grid">

            <div class="food-card">

                🛡️

                <h3>Precautions</h3>

                <p>${safety["Important precautions"]}</p>

            </div>

            <div class="food-card">

                ☎️

                <h3>Emergency</h3>

                <p>${safety["Emergency numbers"]}</p>

            </div>

            <div class="food-card">

                🙏

                <h3>Etiquette</h3>

                <p>${safety["Local etiquette"]}</p>

            </div>

        </div>

    `;

    return card;

}

function createPackingCard(packing){

    const card = document.createElement("div");

    card.className = "trip-card";

    let html = `
        <h2>🎒 Packing Checklist</h2>

        <div class="packing-list">
    `;

    Object.values(packing).forEach(value=>{

        value.split(",").forEach(item=>{

            html += `
                <div class="packing-item">

                    ✅ ${item.trim()}

                </div>
            `;

        });

    });

    html += "</div>";

    card.innerHTML = html;

    return card;

}


function createTravelTips(data){

    const tips=data["⭐ Final Travel Tips"];

    const card=document.createElement("div");

    card.className="trip-card reveal";

    let html="<h2>⭐ Final Travel Tips</h2>";

    html+='<div class="food-grid">';

    tips.forEach((tip,index)=>{

        html+=`

            <div class="food-card">

                <h3>

                    Tip ${index+1}

                </h3>

                <p>

                    ${tip}

                </p>

            </div>

        `;

    });

    html+="</div>";

    card.innerHTML=html;

    return card;

}

function createEndMessage(data){

    const card=document.createElement("div");

    card.className="trip-card hero-card reveal";

    card.innerHTML=`

        <h2>

            🎉 Journey Ready!

        </h2>

        <p>

            ${data.Closing || data.End || ""}

        </p>

        <button class="primary-btn">

            ❤️ Happy Journey

        </button>

    `;

    return card;

}

function enableRevealAnimation(){

    const cards=document.querySelectorAll(".trip-card");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.15

    });

    cards.forEach(card=>{

        observer.observe(card);

    });

}
function createStayCard(data){

    const stay = data["🏨 Stay Recommendation"];

    const card=document.createElement("div");

    card.className="trip-card";

    card.innerHTML=`

        <h2>

            🏨 Stay Recommendation

        </h2>

        <div class="stay-grid">

            <div>

                <strong>

                    Hotel

                </strong>

                <p>

                    ${stay["Hotel"]}

                </p>

            </div>

            <div>

                <strong>

                    Price

                </strong>

                <p>

                    ${stay["Price range"]}

                </p>

            </div>

            <div>

                <strong>

                    Locality

                </strong>

                <p>

                    ${stay["Best locality"]}

                </p>

            </div>

            <div>

                <strong>

                    Why

                </strong>

                <p>

                    ${stay["Why it is recommended"]}

                </p>

            </div>

        </div>

    `;

    return card;

}

function createTimeline(data){

    const itinerary = data["📅 Day Wise Itinerary"];

    if(!itinerary){

        return "";

    }

    const card = document.createElement("div");

    card.className = "trip-card";

    card.innerHTML = "<h2>📅 Day Wise Itinerary</h2>";

    // OLD FORMAT (Array)

    if(Array.isArray(itinerary)){

        itinerary.forEach((day,index)=>{

            card.innerHTML+=`

                <details class="timeline-card">

                <summary>

                    📅 Day ${index+1}

                </summary>

                <div class="timeline-content">

                    <p><strong>🌅 Morning:</strong> ${day.Morning}</p>

                    <p><strong>☀ Afternoon:</strong> ${day.Afternoon}</p>

                    <p><strong>🌇 Evening:</strong> ${day.Evening}</p>

                    <p><strong>🌙 Night:</strong> ${day.Night}</p>

                    <hr>

                    <p>🚗 ${day["Travel Time"]}</p>

                    <p>💰 ₹${day["Estimated Cost"]}</p>

                    <p>⏳ ${day["Time to Spend"]}</p>

                    <p>🍴 ${day["Food Stop"]}</p>

                    <p>📸 ${day["Photography Spot"]}</p>

            </div>

            </details>

                    `;

        });
    }

    // NEW FORMAT (Object)

    else{

        Object.entries(itinerary).forEach(([time,data])=>{

            card.innerHTML += `

                <details class="timeline-card">

                    <summary>

                        ${

                            time==="Morning" ? "🌅 Morning" :

                            time==="Afternoon" ? "☀ Afternoon" :

                            time==="Evening" ? "🌇 Evening" :

                            "🌙 Night"

                        }

                    </summary>

                    <div class="timeline-content">

                        <p>

                            <strong>📍 Places</strong>

                            ${data.Places || ""}

                        </p>

                        <p>

                            <strong>🚗 Travel Time</strong>

                            ${data["Travel Time"] || ""}

                        </p>

                        <p>

                            <strong>💰 Cost</strong>

                            ₹${data["Estimated Cost"] || ""}

                        </p>

                        <p>

                            <strong>⏳ Duration</strong>

                            ${data["Time to Spend"] || ""}

                        </p>

                        <p>

                            <strong>🍴 Food Stop</strong>

                            ${data["Food Stop"] || ""}

                        </p>

                        <p>

                            <strong>📸 Photography Spot</strong>

                            ${data["Photography Spot"] || ""}

                        </p>

                    </div>

                </details>

            `;

        });

    }

    return card;

}
function createFoodGuide(data){

    const food=data["🍴 Food Guide"];

    const card=document.createElement("div");

    card.className="trip-card";

    card.innerHTML=`

        <h2>

            🍴 Food Guide

        </h2>

        <div class="food-grid">

            <div class="food-card">

                🍳

                <h3>Breakfast</h3>

                <p>${food.Breakfast}</p>

            </div>

            <div class="food-card">

                🍛

                <h3>Lunch</h3>

                <p>${food.Lunch}</p>

            </div>

            <div class="food-card">

                🍽

                <h3>Dinner</h3>

                <p>${food.Dinner}</p>

            </div>

            <div class="food-card">

                🌮

                <h3>Street Food</h3>

                <p>${food["Street Food"]}</p>

            </div>

            <div class="food-card">

                ⭐

                <h3>Speciality</h3>

                <p>${food["Local Specialities"]}</p>

            </div>

            <div class="food-card">

                🍰

                <h3>Dessert</h3>

                <p>${food.Desserts}</p>

            </div>

        </div>

    `;

    return card;

}

function createPhotography(data){

    const photo=data["📸 Best Photography Spots"];

    const card=document.createElement("div");

    card.className="trip-card";

    card.innerHTML=`

        <h2>

            📸 Best Photography Spots

        </h2>

        <div class="stats-grid">

            <div class="stat-card">

                🌅

                <h3>

                    Golden Hour

                </h3>

                <p>

                    ${photo["Golden Hour"]}

                </p>

            </div>

            <div class="stat-card">

                📷

                <h3>

                    Camera Angle

                </h3>

                <p>

                    ${photo["Best Camera Angle"]}

                </p>

            </div>

            <div class="stat-card">

                ⏰

                <h3>

                    Best Time

                </h3>

                <p>

                    ${photo["Best Time"]}

                </p>

            </div>

        </div>

    `;

    return card;

}

function createHiddenGemsCard(hiddenGems){

    const gems = Object.values(hiddenGems);

    let html = "";

    gems.forEach((gem,index)=>{

        html += `
            <div class="hidden-gem-card">
                <div class="gem-icon">💎</div>
                <p>${gem}</p>
            </div>
        `;

    });

    return `
        <section class="trip-card">
            <h2>🎯 Hidden Gems</h2>

            <div class="hidden-gems-grid">
                ${html}
            </div>

        </section>
    `;

}
function createShopping(data){

    const shop=data["🛍 Local Shopping"];

    const card=document.createElement("div");

    card.className="trip-card reveal";

    card.innerHTML=`

        <h2>🛍 Local Shopping</h2>

        <div class="stats-grid">

            <div class="stat-card">

                🏬

                <h3>Market</h3>

                <p>${shop["Popular markets"]}</p>

            </div>

            <div class="stat-card">

                🎁

                <h3>Souvenirs</h3>

                <p>${shop["Best souvenirs"]}</p>

            </div>

            <div class="stat-card">

                💰

                <h3>Price Range</h3>

                <p>${shop["Approximate prices"]}</p>

            </div>

        </div>

    `;

    return card;

}

function createSafety(data){

    const safety=data["⚠ Safety Tips"];

    const card=document.createElement("div");

    card.className="trip-card reveal";

    card.innerHTML=`

        <h2>⚠ Safety Tips</h2>

        <div class="food-grid">

            <div class="food-card">

                🛡️

                <h3>Precautions</h3>

                <p>${safety["Important precautions"]}</p>

            </div>

            <div class="food-card">

                ☎️

                <h3>Emergency</h3>

                <p>${safety["Emergency numbers"]}</p>

            </div>

            <div class="food-card">

                🙏

                <h3>Etiquette</h3>

                <p>${safety["Local etiquette"]}</p>

            </div>

        </div>

    `;

    return card;

}

function createPackingCard(packing){

    const items = Object.values(packing);

    let html = "";

    items.forEach(value=>{

        value
        .split(",")
        .map(item=>item.trim())
        .forEach(item=>{

            html += `
                <div class="packing-item">
                    ✅ ${item}
                </div>
            `;

        });

    });

    return `
        <section class="trip-card">

            <h2>🎒 Packing Checklist</h2>

            <div class="packing-list">

                ${html}

            </div>

        </section>
    `;

}

function createTravelTips(data){

    const tips=data["⭐ Final Travel Tips"];

    const card=document.createElement("div");

    card.className="trip-card reveal";

    let html="<h2>⭐ Final Travel Tips</h2>";

    html+='<div class="food-grid">';

    tips.forEach((tip,index)=>{

        html+=`

            <div class="food-card">

                <h3>

                    Tip ${index+1}

                </h3>

                <p>

                    ${tip}

                </p>

            </div>

        `;

    });

    html+="</div>";

    card.innerHTML=html;

    return card;

}

function createEndMessage(data){

    const card=document.createElement("div");

    card.className="trip-card hero-card reveal";

    card.innerHTML=`

        <h2>

            🎉 Journey Ready!

        </h2>

        <p>

            ${data.End}

        </p>

        <button class="primary-btn">

            ❤️ Happy Journey

        </button>

    `;

    return card;

}

function enableRevealAnimation(){

    const cards=document.querySelectorAll(".trip-card");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.15

    });

    cards.forEach(card=>{

        observer.observe(card);

    });

}
