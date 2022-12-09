var spieler = document.querySelector(".player");
spieler.style.left = "0px";

var punkteAnzeige = document.querySelector(".punkte");
var score = 0;

var timer = new Timer(90);

var spielfeld = document.querySelector(".playground");
var backgroundPosition = 0;

var sprung = 0;

function loop() {
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  if (parseInt(spieler.style.top) < 200) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }

  if (timer.ready()) {
    var h = document.createElement("div");
    h.classList.add("stein");
    h.style.top = "400px";
    h.style.right = "0px";
    spielfeld.appendChild(h);
  }

  var steine = document.querySelectorAll(".stein");
  for (var stein of steine) {
    stein.style.right = parseInt(stein.style.right) + 5 + "px";
    if (parseInt(stein.style.right) > 1180) {
      stein.parentNode.removeChild(stein);
    }
  }

  if (parseInt(spieler.style.top) > 0) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }

  if (keyboard(32)) {
    spieler.style.top = parseInt(spieler.style.top) - 11 + "px";
  }

  if (anyCollision(spieler, steine)) {
    alert("Game over!");
    location.href = "gameover.html";
    return;
  }

  //jump
  spieler.style.top = parseInt(spieler.style.top) - sprung + "px";

  //sprung
  if (parseInt(spieler.style.top) < 390) {
    sprung = sprung - 0.1;
  } else {
    sprung = 0;
    spieler.style.top = "390px";
  }
  if (keyboard(32) && parseInt(spieler.style.top) >= 390) {
    sprung = 4;
  }
  //Keyboard jump
  if (keyboard(38)) {
    spieler.style.top = parseInt(spieler.style.top) - 11 + "px";
  }

  //anziehungskraft
  if (parseInt(spieler.style.top) < 450) {
    spieler.style.top = parseInt(spieler.style.top) + 4 + "px";
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
