var spieler = document.querySelector(".player");
spieler.style.left = "0px";

var punkteAnzeige = document.querySelector(".punkte");
var score = 0;

var timer = new Timer(90);

var spielfeld = document.querySelector(".playground");
var backgroundPosition = 0;

var sprung = 0;
let jump = false;

function loop() {
  //background
  backgroundPosition = backgroundPosition + 6;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  //spieler
  if (parseInt(spieler.style.top) < 50) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }

  //pilz timer
  if (timer.ready()) {
    var h = document.createElement("div");
    h.classList.add("pilz");
    h.style.bottom = "200px";
    h.style.right = "0px";
    spielfeld.appendChild(h);
  }

  //pilze
  var pilze = document.querySelectorAll(".pilz");
  for (var pilz of pilze) {
    pilz.style.right = parseInt(pilz.style.right) + 6 + "px";
    if (parseInt(pilz.style.right) > 1180) {
      pilz.parentNode.removeChild(pilz);
    }
  }

  //score
  if (parseInt(spieler.style.top) > 0) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }

  //collision
  if (anyCollision(spieler, pilze)) {
    location.href = "gameover.html";
    return;
  }

  //jump
  spieler.style.top = parseInt(spieler.style.top) - sprung + "px";
  if (keyboard(32)) {
    spieler.style.top = parseInt(spieler.style.top) - 11 + "px";
    jump = true;
  }

  if (parseInt(spieler.style.top) < 310) {
    sprung = sprung - 0.1;
  } else {
    sprung = 0;
    spieler.style.top = "310px";
    jump = false;
  }

  if (jump) {
    spieler.style.backgroundImage = "url(wurm_jump.png)";
  } else {
    spieler.style.backgroundImage = "url(wurm.gif)";
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
