const districts = [

{
id:1,
name:"Raebareli",
slug:"raebareli",
featured:true,
priority:10,
image:"assets/images/districts/raebareli.webp",
categories:["historical","popular"],
aliases:["rbl","rae bareli","rai bareli"],
keywords:["indira gandhi","nehru","heritage","politics","freedom movement","temple"]
},

{
id:2,
name:"Lucknow",
slug:"lucknow",
featured:false,
priority:10,
image:"assets/images/districts/lucknow.webp",
categories:["historical","food","popular"],
aliases:["lko"],
keywords:["awadhi","biryani","imambara","nawab","capital","tehzeeb"]
},

{
id:3,
name:"Agra",
slug:"agra",
featured:false,
priority:10,
image:"assets/images/districts/agra.webp",
categories:["historical","popular"],
aliases:[],
keywords:["taj mahal","agra fort","mughal","unesco","yamuna","love monument"]
},

{
id:4,
name:"Ayodhya",
slug:"ayodhya",
featured:false,
priority:10,
image:"assets/images/districts/ayodhya.webp",
categories:["religious","popular"],
aliases:["faizabad"],
keywords:["ram","ram mandir","shri ram","sarayu","hindu temple"]
},

{
id:5,
name:"Varanasi",
slug:"varanasi",
featured:false,
priority:10,
image:"assets/images/districts/varanasi.webp",
categories:["religious","historical","popular"],
aliases:["kashi","banaras"],
keywords:["ganga","ghat","shiv","aarti","temple"]
},

{
id:6,
name:"Prayagraj",
slug:"prayagraj",
featured:false,
priority:9,
image:"assets/images/districts/prayagraj.webp",
categories:["religious","historical"],
aliases:["allahabad"],
keywords:["kumbh","triveni","sangam","ganga","yamuna"]
},

{
id:7,
name:"Mathura",
slug:"mathura",
featured:false,
priority:9,
image:"assets/images/districts/mathura.webp",
categories:["religious"],
aliases:[],
keywords:["krishna","vrindavan","janmabhoomi","holi"]
},

{
id:8,
name:"Noida",
slug:"noida",
featured:false,
priority:8,
image:"assets/images/districts/noida.webp",
categories:["modern","popular"],
aliases:["gautam buddha nagar"],
keywords:["startup","technology","it park","metro","business"]
},

{
id:9,
name:"Kanpur Nagar",
slug:"kanpur-nagar",
featured:false,
priority:8,
image:"assets/images/districts/kanpur.webp",
categories:["historical","modern"],
aliases:["kanpur"],
keywords:["iit kanpur","leather","industry","ganga"]
},

{
id:10,
name:"Jhansi",
slug:"jhansi",
featured:false,
priority:8,
image:"assets/images/districts/jhansi.webp",
categories:["historical"],
aliases:[],
keywords:["rani lakshmibai","fort","1857","freedom fighter"]
},

{
id:11,
name:"Gorakhpur",
slug:"gorakhpur",
featured:false,
priority:8,
image:"assets/images/districts/gorakhpur.webp",
categories:["religious"],
aliases:[],
keywords:["gorakhnath","temple","nath","math"]
},

{
id:12,
name:"Meerut",
slug:"meerut",
featured:false,
priority:7,
image:"assets/images/districts/meerut.webp",
categories:["historical","popular"],
aliases:[],
keywords:["1857","sports goods","cricket bat"]
},

{
id:13,
name:"Bareilly",
slug:"bareilly",
featured:false,
priority:7,
image:"assets/images/districts/bareilly.webp",
categories:["historical","popular"],
aliases:[],
keywords:["jhumka","market","culture"]
},

{
id:14,
name:"Aligarh",
slug:"aligarh",
featured:false,
priority:7,
image:"assets/images/districts/aligarh.webp",
categories:["historical"],
aliases:[],
keywords:["amu","aligarh muslim university","locks"]
},

{
id:15,
name:"Fatehpur",
slug:"fatehpur",
featured:false,
priority:6,
image:"assets/images/districts/fatehpur.webp",
categories:["historical"],
aliases:[],
keywords:["heritage","temple","yamuna"]
}

,

{
id:16,
name:"Saharanpur",
slug:"saharanpur",
featured:false,
priority:6,
image:"assets/images/districts/saharanpur.webp",
categories:["nature","popular"],
aliases:[],
keywords:["wood carving","shivalik","craft","forest","heritage"]
},

{
id:17,
name:"Muzaffarnagar",
slug:"muzaffarnagar",
featured:false,
priority:6,
image:"assets/images/districts/muzaffarnagar.webp",
categories:["popular"],
aliases:[],
keywords:["sugarcane","jaggery","agriculture","ganga canal"]
},

{
id:18,
name:"Shamli",
slug:"shamli",
featured:false,
priority:5,
image:"assets/images/districts/shamli.webp",
categories:["nature"],
aliases:[],
keywords:["agriculture","green fields","sugarcane"]
},

{
id:19,
name:"Baghpat",
slug:"baghpat",
featured:false,
priority:5,
image:"assets/images/districts/baghpat.webp",
categories:["historical"],
aliases:[],
keywords:["mahabharata","yamuna","heritage"]
},

{
id:20,
name:"Ghaziabad",
slug:"ghaziabad",
featured:false,
priority:8,
image:"assets/images/districts/ghaziabad.webp",
categories:["modern","popular"],
aliases:[],
keywords:["hindon","ncr","metro","technology","industry"]
},

{
id:21,
name:"Hapur",
slug:"hapur",
featured:false,
priority:5,
image:"assets/images/districts/hapur.webp",
categories:["popular"],
aliases:[],
keywords:["grain market","papad","business"]
},

{
id:22,
name:"Bulandshahr",
slug:"bulandshahr",
featured:false,
priority:6,
image:"assets/images/districts/bulandshahr.webp",
categories:["historical"],
aliases:[],
keywords:["khurja","ceramics","pottery","heritage"]
},

{
id:23,
name:"Gautam Buddha Nagar",
slug:"gautam-buddha-nagar",
featured:false,
priority:8,
image:"assets/images/districts/gautam-buddha-nagar.webp",
categories:["modern","popular"],
aliases:["greater noida"],
keywords:["expo mart","formula 1","startup","technology","it"]
},

{
id:24,
name:"Bijnor",
slug:"bijnor",
featured:false,
priority:5,
image:"assets/images/districts/bijnor.webp",
categories:["nature"],
aliases:[],
keywords:["ganga","forest","wildlife","agriculture"]
},

{
id:25,
name:"Amroha",
slug:"amroha",
featured:false,
priority:5,
image:"assets/images/districts/amroha.webp",
categories:["historical"],
aliases:["jyotiba phule nagar"],
keywords:["mango","musical instruments","craft"]
},

{
id:26,
name:"Moradabad",
slug:"moradabad",
featured:false,
priority:7,
image:"assets/images/districts/moradabad.webp",
categories:["historical","popular"],
aliases:[],
keywords:["brass city","handicrafts","export","metal craft"]
},

{
id:27,
name:"Rampur",
slug:"rampur",
featured:false,
priority:6,
image:"assets/images/districts/rampur.webp",
categories:["historical"],
aliases:[],
keywords:["rampur raza library","nawab","heritage"]
},

{
id:28,
name:"Sambhal",
slug:"sambhal",
featured:false,
priority:5,
image:"assets/images/districts/sambhal.webp",
categories:["historical"],
aliases:["bheem nagar"],
keywords:["horn craft","heritage","handicrafts"]
},

{
id:29,
name:"Budaun",
slug:"budaun",
featured:false,
priority:5,
image:"assets/images/districts/budaun.webp",
categories:["historical"],
aliases:[],
keywords:["jama masjid","heritage","history"]
},

];


