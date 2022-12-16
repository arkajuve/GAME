var spieler = document.querySelector(".player");
spieler.style.left = "300px";

var punkteAnzeige = document.querySelector(".punkte");
var score = 0;

var timer = new Timer(90);

var spielfeld = document.querySelector(".playground");
var backgroundPosition = 0;

var sprung = 0;
let jump = false;

var jumpsound = new Audio("jump.mp3");

function loop() {
  //background bewegung
  backgroundPosition = backgroundPosition + 6;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  //spieler
  if (parseInt(spieler.style.top) < 80) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }

  //pilz timer
  if (timer.ready()) {
    var h = document.createElement("div");
    h.classList.add("pilz");
    h.style.bottom = "200px";
    h.style.right = "-10px";
    spielfeld.appendChild(h);
  }

  //pilze
  //wie schnell die pilze nacheinander einblenden
  var pilze = document.querySelectorAll(".pilz");
  for (var pilz of pilze) {
    pilz.style.right = parseInt(pilz.style.right) + 6 + "px";
    if (parseInt(pilz.style.right) > 1110) {
      pilz.parentNode.removeChild(pilz);
    }
  }

  //score
  if (parseInt(spieler.style.top) > 0) {
    score = score + 10;
    punkteAnzeige.textContent = score;
  }

  //sound beim springen
  if (keyboard(32)) {
    jumpsound.play();
  }

  //collision
  //wenn kollision passiert, dann auf gameoverseite geschickt
  if (anyCollision(spieler, pilze)) {
    location.href = "gameover.html";
  }

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

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
