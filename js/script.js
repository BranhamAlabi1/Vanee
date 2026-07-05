// =========================
// CONTADOR
// =========================

// CAMBIA EL AÑO SI ES NECESARIO
const fechaInicio = new Date("2026-06-05T00:00:00");

function actualizarContador() {

    const ahora = new Date();

    const diferencia = ahora - fechaInicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);

    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);

    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;

}

actualizarContador();

setInterval(actualizarContador,1000);


// =========================
// BOTÓN VOLVER ARRIBA
// =========================

const topBtn = document.getElementById("top");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// =========================
// LIGHTBOX
// =========================

const cards=document.querySelectorAll(".card img");

const lightbox=document.getElementById("lightbox");

const imagenGrande=document.getElementById("imagenGrande");

const cerrar=document.getElementById("cerrar");

cards.forEach(img=>{

    img.addEventListener("click",()=>{

        imagenGrande.src=img.src;

        lightbox.style.display="flex";

        document.body.style.overflow="hidden";

    });

});

cerrar.onclick=()=>{

    lightbox.style.display="none";

    document.body.style.overflow="auto";

};

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

        document.body.style.overflow="auto";

    }

});


// =========================
// REVEAL AL HACER SCROLL
// =========================

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:.2});

document.querySelectorAll("section").forEach(sec=>{

    sec.classList.add("hidden");

    observer.observe(sec);

});


// =========================
// CORAZONES FLOTANDO
// =========================

const particles=document.getElementById("particles");

function crearCorazon(){

    const heart=document.createElement("div");

    heart.innerHTML="❤";

    heart.style.position="absolute";

    heart.style.left=Math.random()*100+"vw";

    heart.style.top="100vh";

    heart.style.fontSize=(15+Math.random()*25)+"px";

    heart.style.color="rgba(255,77,109,.7)";

    heart.style.animation=`flotar ${5+Math.random()*6}s linear forwards`;

    particles.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },11000);

}

setInterval(crearCorazon,350);


// =========================
// ANIMACIÓN DE TARJETAS
// =========================

const tarjetas=document.querySelectorAll(".card");

tarjetas.forEach((card,i)=>{

    card.style.animationDelay=`${i*0.15}s`;

    card.classList.add("cardAnim");

});


// =========================
// EFECTO PARALLAX HERO
// =========================

// Desactivar parallax en dispositivos móviles o touch
if(!('ontouchstart' in window) && window.innerWidth > 768){
    window.addEventListener("scroll",()=>{

        const hero=document.querySelector(".hero");

        hero.style.backgroundPositionY=window.scrollY*0.5+"px";

    });
}


// =========================
// EFECTO 3D EN LAS FOTOS (DESKTOP ONLY)
// =========================

tarjetas.forEach(card=>{

    // Solo aplicar efecto 3D en dispositivos no táctiles
    if(!('ontouchstart' in window)){
        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=((x/rect.width)-0.5)*20;

            const rotateX=((y/rect.height)-0.5)*-20;

            card.style.transform=
            `perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="perspective(900px) rotateX(0) rotateY(0) scale(1)";

        });
    }

});


// =========================
// TEXTO ESCRIBIÉNDOSE
// =========================

const titulo=document.querySelector(".hero h1");

const texto=titulo.textContent;

titulo.textContent="";

let i=0;

function escribir(){

    if(i<texto.length){

        titulo.textContent+=texto.charAt(i);

        i++;

        setTimeout(escribir,120);

    }

}

setTimeout(escribir,1200);


// =========================
// EFECTO DE BRILLO
// =========================

const glowInterval=setInterval(()=>{

    tarjetas.forEach(card=>{

        card.style.boxShadow=
        `0 0 ${10+Math.random()*30}px rgba(255,77,109,.3)`;

    });

},1200);

// Limpiar intervalo si es necesario (prevenir memory leaks)
window.addEventListener("beforeunload",()=>{
    clearInterval(glowInterval);
});


// =========================
// MEJORAS DE RESPONSIVIDAD
// =========================

// Mejorar el comportamiento del scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Detectar y ajustar para dispositivos móviles
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if(isMobile){
    document.body.classList.add('mobile-device');
}