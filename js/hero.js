/* ==========================================
   HERO SECTION
========================================== */

.hero{
    position: relative;
    min-height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    padding-top: 120px;
    padding-bottom: 80px;

    background:
        radial-gradient(circle at top left,
        rgba(255,153,51,.18),
        transparent 35%),

        radial-gradient(circle at bottom right,
        rgba(59,130,246,.16),
        transparent 40%),

        linear-gradient(
        180deg,
        #081120 0%,
        #0B1730 100%);
}


/* ==========================================
   BACKGROUND IMAGE
========================================== */

.hero-bg{

    position:absolute;
    inset:0;

    background-image:url("../assets/images/hero/hero-main.webp");

    background-size:cover;
    background-position:center;

    opacity:.12;

    transform:scale(1.08);

    z-index:1;

}


/* ==========================================
   DARK OVERLAY
========================================== */

.hero-overlay{

    position:absolute;

    inset:0;

    background:linear-gradient(
        90deg,
        rgba(8,17,32,.95) 0%,
        rgba(8,17,32,.78) 45%,
        rgba(8,17,32,.92) 100%
    );

    z-index:2;

}


/* ==========================================
   GLOW EFFECTS
========================================== */

.hero-glow{

    position:absolute;

    border-radius:50%;

    filter:blur(140px);

    pointer-events:none;

    z-index:2;

}

.glow-1{

    width:450px;
    height:450px;

    background:rgba(255,153,51,.18);

    left:-120px;
    top:-100px;

}

.glow-2{

    width:500px;
    height:500px;

    background:rgba(59,130,246,.15);

    right:-150px;
    bottom:-150px;

}


/* ==========================================
   CLOUDS
========================================== */

.cloud{

    position:absolute;

    pointer-events:none;

    opacity:.55;

    z-index:3;

}

.cloud-1{

    width:300px;

    top:130px;

    left:-60px;

}

.cloud-2{

    width:250px;

    right:-70px;

    top:180px;

}


/* ==========================================
   HERO WRAPPER
========================================== */

.hero-wrapper{

    position:relative;

    z-index:10;

    display:grid;

    grid-template-columns:1fr 1fr;

    align-items:center;

    gap:70px;

}


/* ==========================================
   LEFT SIDE
========================================== */

.hero-left{

    display:flex;

    flex-direction:column;

    justify-content:center;

}


/* ==========================================
   HERO TAG
========================================== */

.hero-tag{

    width:fit-content;

    padding:12px 22px;

    border-radius:999px;

    background:rgba(255,255,255,.06);

    border:1px solid rgba(255,255,255,.08);

    backdrop-filter:blur(20px);

    color:var(--primary);

    font-size:.92rem;

    font-weight:600;

    margin-bottom:28px;

}


/* ==========================================
   HERO TITLE
========================================== */

.hero-left h1{

    font-size:5rem;

    line-height:1.08;

    font-weight:700;

    margin-bottom:28px;

    letter-spacing:-2px;

}

.hero-left h1 span{

    display:block;

    color:var(--primary);

}


/* ==========================================
   PARAGRAPH
========================================== */

.hero-left p{

    max-width:620px;

    font-size:1.15rem;

    line-height:1.9;

    color:#D2DAE5;

    margin-bottom:45px;

}


/* ==========================================
   BUTTONS
========================================== */

.hero-buttons{

    display:flex;

    gap:20px;

    flex-wrap:wrap;

}


/* ==========================================
   RIGHT SIDE
========================================== */

.hero-right{

    display:flex;

    justify-content:center;

    align-items:center;

    position:relative;

}

.hero-right img{

    width:100%;

    max-width:650px;

    object-fit:contain;

}

/* ==========================================
   FLOATING ANIMATION
========================================== */

.hero-right img{

    animation: heroFloat 6s ease-in-out infinite;

    filter:
        drop-shadow(0 40px 80px rgba(0,0,0,.45))
        drop-shadow(0 0 40px rgba(255,153,51,.15));

    transition:.5s ease;

}

.hero-right img:hover{

    transform:scale(1.03);

}


/* ==========================================
   HERO BUTTONS
========================================== */

.hero-buttons .btn-primary,
.hero-buttons .btn-secondary{

    min-width:190px;

    height:60px;

    font-size:1rem;

    font-weight:600;

    transition:.35s;

}

.hero-buttons .btn-primary{

    box-shadow:
        0 12px 35px rgba(255,153,51,.28);

}

.hero-buttons .btn-primary:hover{

    transform:translateY(-6px);

    box-shadow:
        0 18px 45px rgba(255,153,51,.45);

}

.hero-buttons .btn-secondary:hover{

    transform:translateY(-6px);

    border-color:rgba(255,153,51,.4);

}


/* ==========================================
   HERO STATS
========================================== */

.hero-stats{

    position:relative;

    z-index:15;

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:25px;

    margin-top:70px;

}


.stat-card{

    padding:32px 24px;

    border-radius:24px;

    background:rgba(255,255,255,.07);

    border:1px solid rgba(255,255,255,.08);

    backdrop-filter:blur(25px);

    text-align:center;

    transition:.4s;

    cursor:pointer;

}

.stat-card:hover{

    transform:translateY(-10px);

    border-color:rgba(255,153,51,.4);

    box-shadow:

        0 25px 60px rgba(0,0,0,.35),

        0 0 25px rgba(255,153,51,.12);

}

.stat-card h2{

    font-size:2.4rem;

    color:var(--primary);

    margin-bottom:12px;

}

.stat-card p{

    color:#D4DCE6;

    font-size:1rem;

}


/* ==========================================
   SCROLL INDICATOR
========================================== */

.scroll-indicator{

    position:absolute;

    left:50%;

    bottom:35px;

    transform:translateX(-50%);

    display:flex;

    flex-direction:column;

    align-items:center;

    gap:12px;

    z-index:20;

}


.scroll-indicator span{

    width:30px;

    height:52px;

    border:2px solid rgba(255,255,255,.35);

    border-radius:999px;

    position:relative;

}

.scroll-indicator span::before{

    content:"";

    position:absolute;

    left:50%;

    top:8px;

    width:6px;

    height:6px;

    background:white;

    border-radius:50%;

    transform:translateX(-50%);

    animation:scrollMouse 2s infinite;

}

.scroll-indicator p{

    font-size:.82rem;

    color:#C7D0DB;

}


/* ==========================================
   CLOUD ANIMATION
========================================== */

.cloud-1{

    animation:cloudMove1 35s linear infinite;

}

.cloud-2{

    animation:cloudMove2 45s linear infinite;

}


/* ==========================================
   KEYFRAMES
========================================== */

@keyframes heroFloat{

    0%,100%{

        transform:translateY(0px);

    }

    50%{

        transform:translateY(-18px);

    }

}


@keyframes scrollMouse{

    0%{

        opacity:0;

        top:8px;

    }

    40%{

        opacity:1;

    }

    100%{

        opacity:0;

        top:28px;

    }

}


@keyframes cloudMove1{

    from{

        transform:translateX(-80px);

    }

    to{

        transform:translateX(160px);

    }

}


@keyframes cloudMove2{

    from{

        transform:translateX(80px);

    }

    to{

        transform:translateX(-180px);

    }

}

/* ==========================================
   RESPONSIVE DESIGN
========================================== */

/* Large Laptop */

@media (max-width: 1400px){

    .hero-left h1{
        font-size:4.5rem;
    }

    .hero-wrapper{
        gap:50px;
    }

}

/* Laptop */

@media (max-width:1200px){

    .hero{
        padding-top:110px;
    }

    .hero-wrapper{

        grid-template-columns:1fr;

        text-align:center;

        gap:60px;

    }

    .hero-left{

        align-items:center;

    }

    .hero-left p{

        max-width:700px;

    }

    .hero-right img{

        max-width:600px;

    }

    .hero-stats{

        grid-template-columns:repeat(2,1fr);

        margin-top:50px;

    }

}


/* Tablet */

@media (max-width:768px){

    .hero{

        padding-top:100px;

        min-height:auto;

    }

    .hero-left h1{

        font-size:3rem;

        letter-spacing:-1px;

    }

    .hero-left p{

        font-size:1rem;

    }

    .hero-buttons{

        justify-content:center;

        width:100%;

    }

    .hero-buttons .btn-primary,
    .hero-buttons .btn-secondary{

        width:100%;

        max-width:320px;

    }

    .hero-right img{

        max-width:420px;

    }

    .hero-stats{

        grid-template-columns:1fr;

    }

}


/* Mobile */

@media (max-width:480px){

    .hero{

        padding-top:90px;

    }

    .hero-tag{

        font-size:.75rem;

        padding:10px 16px;

    }

    .hero-left h1{

        font-size:2.4rem;

        line-height:1.15;

    }

    .hero-left p{

        font-size:.95rem;

    }

    .stat-card{

        padding:24px 18px;

    }

    .stat-card h2{

        font-size:2rem;

    }

    .scroll-indicator{

        display:none;

    }

}


/* ==========================================
   EXTRA GLOW
========================================== */

.hero::before{

    content:"";

    position:absolute;

    width:700px;

    height:700px;

    border-radius:50%;

    background:radial-gradient(

        rgba(255,153,51,.10),

        transparent 70%

    );

    left:-250px;

    top:-250px;

    filter:blur(40px);

    z-index:1;

}


.hero::after{

    content:"";

    position:absolute;

    width:650px;

    height:650px;

    border-radius:50%;

    background:radial-gradient(

        rgba(59,130,246,.10),

        transparent 70%

    );

    right:-220px;

    bottom:-250px;

    filter:blur(40px);

    z-index:1;

}


/* ==========================================
   OPTIONAL GRID
========================================== */

.hero-grid{

    position:absolute;

    inset:0;

    background-image:

    linear-gradient(

        rgba(255,255,255,.03) 1px,

        transparent 1px

    ),

    linear-gradient(

        90deg,

        rgba(255,255,255,.03) 1px,

        transparent 1px

    );

    background-size:80px 80px;

    opacity:.2;

    z-index:1;

    pointer-events:none;

}


/* ==========================================
   SMOOTH TRANSITIONS
========================================== */

.hero *{

    transition:

    color .35s ease,

    background .35s ease,

    border-color .35s ease,

    transform .35s ease;

}


/* ==========================================
   SELECTION
========================================== */

.hero ::selection{

    background:var(--primary);

    color:#fff;

}
