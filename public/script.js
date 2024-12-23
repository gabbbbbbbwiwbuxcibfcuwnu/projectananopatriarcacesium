let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

const lights = document.querySelectorAll('.light');
const startBtn = document.getElementById('start-btn');
const timeDisplay = document.getElementById('reaction-time');
let gameStarted = false;
let lightIndex = 0;
let startTime;

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function turnOnLights() {
  if (lightIndex < lights.length) {
    lights[lightIndex].style.backgroundColor = 'red';
    lightIndex++;
    setTimeout(turnOnLights, getRandomTime(1000, 2000)); // Random time for next light
  } else {
    setTimeout(turnOffLights, getRandomTime(1000, 3000)); // Random wait time after all lights are on
  }
}

function turnOffLights() {
  lights.forEach((light) => {
    light.style.backgroundColor = 'black';
  });
  gameStarted = false;
  const reactionTime = Date.now() - startTime;
  timeDisplay.textContent = `Your reaction time: ${reactionTime} ms`;
}

startBtn.addEventListener('click', () => {
  if (!gameStarted) {
    lightIndex = 0;
    timeDisplay.textContent = '';
    gameStarted = true;
    startTime = Date.now();
    turnOnLights();
  }
});

lights.forEach((light) => {
  light.addEventListener('click', () => {
    if (gameStarted && light.style.backgroundColor === 'green') {
      const reactionTime = Date.now() - startTime;
      timeDisplay.textContent = `Your reaction time: ${reactionTime} ms`;
      light.style.backgroundColor = 'black';
      gameStarted = false;
    }
  });
});
