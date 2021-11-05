var sceneCounter = 1;
var lennon, abbey;

// generate a random integer between input min and max
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preload() {
  lennon = loadImage("assets/lennon.jpg");
  abbey = loadImage("assets/abbey.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  switch (sceneCounter) {
    case 1:
      lennon.resize(height, height);
      for (var c = 0; c < lennon.width; c += 6) {
        for (var r = 0; r < lennon.height; r += 6) {
          var pixel = lennon.get(c, r);
          push();
          var frameWidth = (width - lennon.width) / 2;
          var sine_c = Math.sin(c);
          var cosine_c = Math.cos(c);
          var sincos_c = sine_c * cosine_c;
          var sine_r = Math.sin(r);
          var cosine_r = Math.cos(r);
          var sincos_r = sine_r * cosine_r;
          noFill();
          translate(c + frameWidth, r);
          strokeWeight(randomInteger(0, 3));
          stroke(color(pixel));
          rotate(radians(randomInteger(0, 360)));
          curve(
            c,
            r,
            randomInteger(0, 50) * sine_c,
            randomInteger(0, 80) * sincos_c,
            randomInteger(0, 10) * sine_c,
            randomInteger(0, 70),
            randomInteger(0, 130) * sincos_r,
            randomInteger(0, 40) * sincos_c
          );
          strokeWeight(randomInteger(0, 5));
          point(r, r);
          pop();
        }
      }
      break;
    case 2:
      break;
  }
}

function draw() {
  switch (sceneCounter) {
    case 1:
      drawScene1();
      break;
    case 2:
      drawScene2();
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

function drawScene1() {
  // scene 1 draw code...
}
function drawScene2() {
  // scene 2 draw code...
}

// remember that you need to resize the file to 1280x720, and you will probably
// want to delete this bit for your final submission.
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}
