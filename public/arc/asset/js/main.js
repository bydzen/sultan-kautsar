function headerPath() {
  var path = document.getElementById("path");
  path.innerText = window.location.host + window.location.pathname;
}
window.onload = headerPath();
function footerYear() {
  var year = document.getElementById("year");
  var date = new Date();
  var dateYear = date.getFullYear();
  year.innerText = dateYear;
}
window.onload = footerYear();
function playSong() {
  var audio = document.getElementById("audio");
  audio.play();
  audio.volume = 0.9;
  audio.loop = true;
}
var popupSong = document.getElementById("popup-song");
function openPopup() {
  var popupOverlay = document.getElementById("popup-overlay");
  var gifAnimated = document.querySelectorAll(".gif.animated");
  for (let i = 0; i < gifAnimated.length; i++) {
    gifAnimated[i].style.transform = "translateY(-125%)";
  }
  popupSong.style.display = "flex";
  popupOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
if (popupSong) {
  window.onload = openPopup();
}
function closePopup() {
  var popupSong = document.getElementById("popup-song");
  var popupOverlay = document.getElementById("popup-overlay");
  var gifAnimated = document.querySelectorAll(".gif.animated");
  for (let i = 0; i < gifAnimated.length; i++) {
    gifAnimated[i].style.transform = "translateY(0%)";
  }
  popupSong.style.display = "none";
  popupOverlay.style.display = "none";
  document.body.style.overflow = "visible";
}
