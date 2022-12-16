let spieler = document.querySelector(".player");
spieler.style.left = "300px";

let punkteAnzeige = document.querySelector(".punkte");
let score = 0;

let timer = new Timer(70);

let spielfeld = document.querySelector(".playground");
let backgroundPosition = 0;

let sprung = 0;
let jump = false;

let jumpsound = new Audio("jump.mp3");

function jumpfunction() {
  //jump
  spieler.style.top = parseInt(spieler.style.top) - sprung + "px";
  if (keyboard(32)) {
    spieler.style.top = parseInt(spieler.style.top) - 11 + "px";
    jump = true;
  }

  if (parseInt(spieler.style.top) < 310) {
    sprung = sprung - 0.25;
  } else {
    sprung = 0;
    spieler.style.top = "310px";
    jump = false;
  }

  //wenn man springt, ein anderes Bild als wenn man nicht springt
  if (jump) {
    spieler.style.backgroundImage = "url(wurm_jump.png)";
  } else {
    spieler.style.backgroundImage = "url(wurm.gif)";
  }
}

function pilztimer() {
  //pilz timer
  if (timer.ready() && Math.random() > 0.4) {
    let h = document.createElement("div");
    h.classList.add("pilz");
    h.style.bottom = "200px";
    h.style.right = "-10px";
    spielfeld.appendChild(h);
  }
}

function pilzfunction() {
  //pilze
  //wie schnell die pilze nacheinander einblenden
  let pilze = document.querySelectorAll(".pilz");
  for (let pilz of pilze) {
    pilz.style.right = parseInt(pilz.style.right) + 6 + "px";
    if (parseInt(pilz.style.right) > 1110) {
      pilz.parentNode.removeChild(pilz);
    }
  }

  pilztimer();

  //collision
  //wenn kollision passiert, dann auf gameoverseite geschickt
  if (anyCollision(spieler, pilze)) {
    location.href = "gameover.html";
  }
}

function loop() {
  //background bewegung
  backgroundPosition = backgroundPosition + 6;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  //spieler
  if (parseInt(spieler.style.top) < 80) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }

  pilzfunction();

  //score
  if (parseInt(spieler.style.top) > 0) {
    score = score + 10;
    punkteAnzeige.textContent = score;
  }

  //sound beim springen
  if (keyboard(32)) {
    jumpsound.play();
  }

  jumpfunction();

  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
