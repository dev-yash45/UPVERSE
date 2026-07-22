/* ==========================================================
   UPVERSE AI API
========================================================== */

const AI_CONFIG = {

    BASE_URL:
    "https://api.dify.ai/v1/workflows/run",

    API_KEY:
    "app-Ui0TQfWZhqFYfWw8FWcoDj5K",
    
    DIFY_API_KEY_AI : "app-XoLRyFK8rXlFkM47DMujCfC6",
    
    TIMEOUT:
    30000

};


/* ==========================================================
   DEFAULT HEADERS
========================================================== */

const API_HEADERS = {

    "Authorization":
    `Bearer ${AI_CONFIG.API_KEY}`,

    "Content-Type":
    "application/json"

};


/* ==========================================================
   TIMEOUT FETCH
========================================================== */

async function fetchWithTimeout(url, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(() => {

        controller.abort();

    }, AI_CONFIG.TIMEOUT);

    try {

        const response = await fetch(url, {

            ...options,

            signal: controller.signal

        });

        clearTimeout(timeout);

        return response;

    }

    catch (error) {

        clearTimeout(timeout);

        throw error;

    }

}


/* ==========================================================
   SAFE JSON PARSER
========================================================== */

function safeJSON(text) {

    try {

        return JSON.parse(text);

    }

    catch {

        return null;

    }

}


/* ==========================================================
   RESPONSE VALIDATOR
========================================================== */

function isValidResponse(data) {

    if (!data) return false;

    if (typeof data !== "object") return false;

    return true;

}


/* ==========================================================
   ERROR OBJECT
========================================================== */

function createError(message) {

    return {

        success: false,

        error: message

    };

}

/* ==========================================================
   RUN DIFY WORKFLOW
========================================================== */

async function runWorkflow({

    mode,

    slug,

    question = "",

    preferences = ""

}) {

    const body = {

        inputs: {

            mode,

            slug,

            question,

            preferences

        },

        response_mode: "blocking",

        user: "upverse-user"

    };

    try {

        const response = await fetchWithTimeout(

            AI_CONFIG.BASE_URL,

            {

                method: "POST",

                headers: API_HEADERS,

                body: JSON.stringify(body)

            }

        );

        if (!response.ok) {

            throw new Error(

                `HTTP ${response.status}`

            );

        }

        const json = await response.json();

        return parseWorkflowResponse(json);

    }

    catch (error) {

        console.error(

            "UPVERSE API Error:",

            error

        );

        throw createError(

            error.message ||

            "Unknown API Error"

        );

    }

}


/* ==========================================================
   PARSE DIFY RESPONSE
========================================================== */

function parseWorkflowResponse(response){

    if(!response){
        throw new Error("Empty response.");
    }

    const outputs = response.data?.outputs;

    if(!outputs){
        throw new Error("No outputs found.");
    }

    let raw = outputs.output || outputs.result;

    if(!raw){
        throw new Error("Invalid workflow output.");
    }

    // Agar already object hai
    if(typeof raw === "object"){
        return raw;
    }

    // String hai
    if(typeof raw === "string"){

        // Remove markdown if any
        raw = raw
            .replace(/```json/g,"")
            .replace(/```/g,"")
            .trim();

        // Sirf first { se last } tak ka JSON nikalo
        const start = raw.indexOf("{");
        const end = raw.lastIndexOf("}");

        if(start !== -1 && end !== -1){
            raw = raw.substring(start, end + 1);
        }

        try{
            return JSON.parse(raw);
        }
        catch(err){

            console.error("RAW OUTPUT:", raw);

            throw new Error("Invalid JSON returned by Dify.");

        }
    }

    throw new Error("Unknown workflow format.");
}

/* ==========================================================
   RETRY HELPER
========================================================== */

async function retryRequest(

    callback,

    retries = 2

) {

    let lastError;

    for (

        let i = 0;

        i <= retries;

        i++

    ) {

        try {

            return await callback();

        }

        catch (error) {

            lastError = error;

        }

    }

    throw lastError;

}

/* ==========================================================
   DISTRICT MODE
========================================================== */

async function callDistrictAI(slug){

    return retryRequest(async()=>{

        const response = await runWorkflow({

            mode: "district",

            slug

        });

        if(!isValidResponse(response)){

            throw new Error(

                "Invalid district response."

            );

        }

        return response;

    });

}


/* ==========================================================
   ASK AI MODE
========================================================== */

async function askDistrictAI(

    slug,

    question

){

    return retryRequest(async()=>{

        const response = await runWorkflow({

            mode: "ask",

            slug,

            question

        });

        if(

            !response ||

            !response.answer

        ){

            throw new Error(

                "Invalid Ask AI response."

            );

        }

        return response;

    });

}


/* ==========================================================
   FUTURE SEARCH
========================================================== */

async function searchDistrictAI(query){

    return retryRequest(async()=>{

        const response = await runWorkflow({

            mode: "search",

            slug: query

        });

        return response;

    });

}


/* ==========================================================
   CONNECTION TEST
========================================================== */

async function testAI(){

    try{

        const result =

        await callDistrictAI(

            "agra"

        );

        console.log(

            "✅ AI Connected",

            result

        );

        return true;

    }

    catch(error){

        console.error(

            "❌ AI Connection Failed",

            error

        );

        return false;

    }

}

/* ==========================================================
   CACHE
========================================================== */

const AI_CACHE = new Map();

function getCacheKey(mode, slug, extra = "") {

    return `${mode}:${slug}:${extra}`;

}

function getCached(key) {

    return AI_CACHE.get(key);

}

function setCached(key, value) {

    AI_CACHE.set(key, value);

}


/* ==========================================================
   DISTRICT WITH CACHE
========================================================== */

async function getDistrictAIData(slug){

    const key = getCacheKey(

        "district",

        slug

    );

    const cached = getCached(key);

    if(cached){

        console.log("⚡ Cache Hit");

        return cached;

    }

    try{

        const data = await callDistrictAI(slug);

        setCached(key, data);

        return data;

    }

    catch(error){

        console.warn(

            "Using fallback.",

            error

        );

        if(

            typeof districts !== "undefined"

        ){

            const district = districts.find(

                d=>d.slug===slug

            );

            if(district){

                return district;

            }

        }

        throw error;

    }

}


/* ==========================================================
   DEBUG
========================================================== */

const DEBUG = true;

function log(...args){

    if(DEBUG){

        console.log(

            "[UPVERSE]",

            ...args

        );

    }

}


/* ==========================================================
   HEALTH CHECK
========================================================== */

async function checkAPI(){

    try{

        await testAI();

        log(

            "API Ready"

        );

        return true;

    }

    catch(error){

        console.error(error);

        return false;

    }

}


/* ==========================================================
   CLEAR CACHE
========================================================== */

function clearAICache(){

    AI_CACHE.clear();

    log(

        "Cache Cleared"

    );

}


/* ==========================================================
   EXPORTS
========================================================== */

window.UPVERSE_API = {

    getDistrictAIData,

    askDistrictAI,

    generateTripPlan,

    clearAICache,

    checkAPI

};


/* ==========================================================
   GENERATE AI TRIP PLAN
========================================================== */

async function generateTripPlan(tripData){

    try{

        const response =

        await fetch(

            AI_CONFIG.BASE_URL,

            {

                method:"POST",

                headers:{

                    "Authorization":

                    `Bearer ${AI_CONFIG.DIFY_API_KEY_AI}`,

                    "Content-Type":

                    "application/json"

                },

                body:JSON.stringify({

                    inputs:{

                        district:

                        tripData.district,
                        
                        startingLocation:
                        tripData.startingLocation,

                        startDate:

                        tripData.startDate,

                        duration:

                        tripData.duration,

                        budget:

                        tripData.budget,

                        travellers:

                        tripData.travellers,

                        travelStyle:

                        tripData.travelStyle,

                        stay:

                        tripData.stay,

                        transport:

                        tripData.transport,

                        food:

                        tripData.food,

                        specialRequest:

                        tripData.specialRequest

                    },

                    response_mode:

                    "blocking",

                    user:

                    "upverse-trip-planner"

                })

            }

        );

        if(!response.ok){

            throw new Error(

                "Failed to generate trip."

            );

        }
        
        
        
        const result =

        await response.json();

        console.log(result);
        console.log("FULL RESPONSE", result);
        console.log("OUTPUTS", result.data?.outputs);
        console.log(result.data.outputs);

        return parseWorkflowResponse(result);

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   READY
========================================================== */

log("🚀 UPVERSE AI API Loaded");
