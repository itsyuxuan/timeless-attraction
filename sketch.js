let sceneCounter = 0;
let img, abbey;
let speechRec;
let sound1;
let highSpeedCnt = 0;
let fps = 60;

// generate a random integer between input min and max
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preload() {
  lennon = loadImage("assets/lennon.jpg");
  abbey = loadImage("assets/abbey.jpeg");
  sound1 = loadSound("assets/sound1.wav");
  img=lennon;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(height, height);
  const frameWidth = (width - height) / 2;
  switch (sceneCounter) {
    case 0:
      image(img, frameWidth, 0);
      speechRec = new p5.SpeechRec("en-US", speechProcessing);
      function speechProcessing() {
        if (speechRec.resultValue) {
          if (speechRec.resultString == "imagine") {
            sceneCounter += 1;
            setup();
          }
        }
      }
      speechRec.start(false, false);
      break;
    case 1:
      image(img, frameWidth, 0);
      break;
    case 2:
      for (let c = 0; c < img.width; c += 6) {
        for (let r = 0; r < img.height; r += 6) {
          const pixel = img.get(c, r);
          push();
          const sine_c = Math.sin(c);
          const cosine_c = Math.cos(c);
          const sincos_c = sine_c * cosine_c;
          const sine_r = Math.sin(r);
          const cosine_r = Math.cos(r);
          const sincos_r = sine_r * cosine_r;
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
  }
}

function draw() {
  switch (sceneCounter) {
    case 0:
      drawScene0;
      break;
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

function drawScene0() {}

function drawScene1() {
  // scene 1 draw code...
  if (fps < 1.5) {
    fps = 1.5;
  }
  fps -= 1;
  frameRate(fps);
  const frameWidth = (width - img.width) / 2;
  let widthRandom = randomInteger(0, width);
  let heightRandom = randomInteger(0, height);
  let xPosChange = randomInteger(30, 50);
  let yPosChange = randomInteger(10, 50);
  let spliceSize1 = randomInteger(10, 40);
  let spliceSize2 = randomInteger(5, 10);
  image(
    img,
    frameWidth + heightRandom + xPosChange,
    yPosChange,
    spliceSize1,
    img.height,
    heightRandom,
    0,
    spliceSize1,
    img.height
  );
  image(
    img,
    frameWidth + widthRandom + xPosChange,
    yPosChange,
    spliceSize2,
    img.height,
    widthRandom,
    0,
    spliceSize2,
    img.height
  );
}

function drawScene2() {
  // scene 2 draw code...
}

function keyTyped() {
  fps += 2;
  if (fps >= 70) {
    highSpeedCnt += 1;
  }
  if (highSpeedCnt >= 300) {
    highSpeedCnt = 0;
    if (sceneCounter === 1) {
      sceneCounter = 2;
      setup();
    }
  }
}

// remember that you need to resize the file to 1280x720, and you will probably
// want to delete this bit for your final submission.
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}
