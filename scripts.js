const btnMostrar = document.getElementById("btnMostrar");
const invitacion = document.getElementById("invitacion");
const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const respuesta = document.getElementById("respuesta");

// Mostrar la invitación
btnMostrar.addEventListener("click", () => {
    invitacion.classList.remove("hidden");
    btnMostrar.style.display = "none";
});

// Botón "Sí"
btnSi.addEventListener("click", () => {
    respuesta.textContent = "💖 Ya sabia que dirias que si jajaja no tenias opcion love u 💖";
    startConfetti();
    enviarConfirmacion();
});

function enviarConfirmacion(){
    const numero = 573014665806;

    const mensaje = "Obvioo precioso, voy contigo ❤️";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");


}

// ------------------------------
// BOTÓN "NO" QUE HUYE (PC + MÓVIL)
// ------------------------------


// PC (mouse)
btnNo.addEventListener("mouseover", moverBotonNoPC);

// Móvil (touch)
btnNo.addEventListener("touchstart", moverBotonNoMovil);

function moverBotonNoPC() {
    const contenedor = document.querySelector(".container");

    btnNo.style.position = "absolute";

    const maxX = contenedor.clientWidth - btnNo.offsetWidth - 10;
    const maxY = contenedor.clientHeight - btnNo.offsetHeight - 10;

    // Salto exagerado para PC
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}


function moverBotonNoMovil() {
    const contenedor = document.querySelector(".container");
    const rectSi = btnSi.getBoundingClientRect();
    const rectNo = btnNo.getBoundingClientRect();

    btnNo.style.position = "absolute";

    const maxX = contenedor.clientWidth - btnNo.offsetWidth - 15;
    const maxY = contenedor.clientHeight - btnNo.offsetHeight - 15;

    let x, y, distancia;

    do {
        // Nueva posición aleatoria
        x = Math.random() * maxX;
        y = Math.random() * maxY;

        // Distancia del botón SI
        distancia = Math.hypot(
            rectSi.left - (rectNo.left + x),
            rectSi.top - (rectNo.top + y)
        );
    } while (distancia < 140); // aleja el botón en móviles

    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}




// ------------------------------
// CONFETTI ANIMATION
// ------------------------------

const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeConfetti();
window.addEventListener("resize", resizeConfetti);

let confettiParticles = [];

function startConfetti() {
    confettiParticles = Array.from({ length: 150 }, () => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * -confettiCanvas.height,
        r: Math.random() * 6 + 2,
        dx: (Math.random() - 0.5) * 2,
        dy: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`
    }));
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.y > confettiCanvas.height) {
            p.y = -10;
            p.x = Math.random() * confettiCanvas.width;
        }
    });

    requestAnimationFrame(drawConfetti);
}

drawConfetti();
