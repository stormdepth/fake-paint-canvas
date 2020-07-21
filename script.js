const canvas = document.querySelector("#draw");
// UGUALE A SOPRA const canvas = document.getElementById("draw")
// Il metodo getContext() fornisce i metodi e le proprietà per lavorare con canvas in un certo contesto (di default il 2D)
const ctx = canvas.getContext("2d");

const brushSizeInput = document.getElementById("brush-size");
const brushSizeCounter = document.querySelector("#brush-size + span");
const brushColorInput = document.getElementById("brush-color");
const opacityInput = document.getElementById("opacity");
const compositeInput = document.getElementById("composite-operation");

// Adattare il canvas alla dimensione del viewport.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Modifica di alcune proprietà di default di ctx
ctx.strokeStyle = "#bada55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 1;

let isDrawing = false; // Falso se l'utente non sta disegnando, altrimenti vero.
let lastX = 0; // Coordinata X del mouse al momento del clic o del movimento.
let lastY = 0; // Coordinata Y del mouse al momento del clic o del movimento.
let hue = 0; // Tonalità di colore che va da 0 a 360.

// L'utente disegna quando il mouse viene cliccato	mousedown
canvas.addEventListener("mousedown", (event) => {
	isDrawing = true;
	// lastX = event.offsetX;
	// lastY = event.offsetY; equivalente alla riga sotto.
	[lastX, lastY] = [event.offsetX, event.offsetY];
});
// L'utente disegna quando il mouse viene cliccato e il mouse viene spostato	mousemove
canvas.addEventListener("mousemove", draw);
// L'utente NON disegna quando il mouse viene rilasciato	mouseup
canvas.addEventListener("mouseup", () => (isDrawing = false));
// L'utente NON disegna quando il mouse esce dalla finestra	mouseout
canvas.addEventListener("mouseout", () => (isDrawing = false));

brushSizeInput.addEventListener("change", (event) => {
	ctx.lineWidth = event.target.value;
	brushSizeCounter.innerText = event.target.value;
});

brushColorInput.addEventListener("change", (event) => {
	ctx.strokeStyle = event.target.value;
});

opacityInput.addEventListener("change", (event) => {
	ctx.globalAlpha = event.target.value;
});

compositeInput.addEventListener("change", (event) => {
	ctx.globalCompositeOperation = event.target.value;
});

function draw(event) {
	// Se l'utente non sta cliccando il mouse interrompere l'esecuzione della funzione.
	if (!isDrawing) return;
	// ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath(); // Annunciamo a canvas che stiamo per iniziare a disegnare qualcosa.
	ctx.moveTo(lastX, lastY); // Inizia a disegnare da
	ctx.lineTo(event.offsetX, event.offsetY); // Arriva fino a
	ctx.stroke(); // Traccia la linea
	[lastX, lastY] = [event.offsetX, event.offsetY];

//
	hue++;
	if (hue >= 360) {
		hue = 0;
	}
}