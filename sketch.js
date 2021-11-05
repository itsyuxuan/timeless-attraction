let sceneCounter = 0;
let img;
let i1, i2, i3, i4, i5, i6, i7, i8, i9, i10;
let speechRec;
let sound1, sound2, sound3, sound4;
let highSpeedCnt = 0;
let fps = 60;
let osc;
let img_list = [];
let foo = 0;

let btnX = 10;
let btnY = 10;
let btnW = 50;
let btnH = 50;

let btnOn = false;


// generate a random integer between input min and max
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preload() {
    i1 = loadImage("assets/lennon.jpg");
    i2 = loadImage("assets/abbey.jpeg");
    i3 = loadImage("assets/1.jpeg");
    i4 = loadImage("assets/pepper.jpeg");
    i5 = loadImage("assets/please.jpeg");
    i6 = loadImage("assets/bbc.jpeg");
    i7 = loadImage("assets/be.jpeg");
    i8 = loadImage("assets/help.jpeg");
    i9 = loadImage("assets/62.jpeg");
    i10 = loadImage("assets/67.jpeg");
    sound1 = loadSound("assets/sound1.wav");
    sound2 = loadSound("assets/sound2.wav");
    sound3 = loadSound("assets/sound3.wav");
    sound4 = loadSound("assets/sound4.wav");
    img_list.push(i1);
    img_list.push(i2);
    img_list.push(i3);
    img_list.push(i4);
    img_list.push(i5);
    img_list.push(i6);
    img_list.push(i7);
    img_list.push(i8);
    img_list.push(i9);
    img_list.push(i10);
    img = img_list[0];
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    img.resize(height, height);
    const frameWidth = (width - height) / 2;
    switch (sceneCounter) {
        case 0:
            image(img, frameWidth, 0);
            osc = new p5.Oscillator();
            speechRec = new p5.SpeechRec("en-US", speechProcessing);

        function speechProcessing() {
            if (speechRec.resultValue) {
                if (speechRec.resultString == "imagine") {
                    sceneCounter = 1;
                    setup();
                }
            }
        }

            speechRec.start(true, false);
            break;
        case 1:
            playOscillator();
            image(img, frameWidth, 0);
            break;
        case 2:
            for (let c = 0; c < img.width; c += 6) {
                for (let r = 0; r < img.height; r += 6) {
                    const pixel = img.get(c, r);
                    push();
                    const sine_c = Math.sin(c);
                    const cosine_c = Math.cos(c);
                    const sine_r = Math.sin(r);
                    const cosine_r = Math.cos(r);
                    const sincos_c = sine_c * cosine_c;
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
            rect(btnX, btnY, btnW, btnH, 5);
            break;
    }
}

function draw() {
    switch (sceneCounter) {
        case 0:
            div = createDiv(
                "This artwork interaction requires SpeechRecognition API."
                + "\<br\>If it doesn't work on Firefox, please use Chrome instead."
            );
            if (btnOn) {
                fill(0, 255, 0);
                div.position(15, 70);
            } else {
                fill(255, 0, 0);
                div.remove();
            }
            rect(btnX, btnY, btnW, btnH, 5);
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

function drawScene1() {
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
    if (fps < 20) {
        sound1.play();
    } else if (fps < 40) {
        sound1.pause();
        sound2.play();
    } else if (fps < 60) {
        sound2.pause();
        sound3.play();
    } else {
        sound3.pause();
        sound4.play();
    }
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

function mousePressed() {
    let inside = isInsideRect(btnX, btnY, btnW, btnH);
    if (inside) {
        btnOn = !btnOn;
    }
    if (sceneCounter == 2) {
        foo += 1;
        if (foo >= img_list.length) {
            foo = 0;
        }
        img = img_list[foo];
        sceneCounter = 0;
        setup();
    }
}

function isInsideRect(x, y, w, h) {
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
        return true;
    } else {
        return false;
    }
}

function playOscillator() {
    osc.start();
    osc.amp(0.5);
    osc.freq(900);
    osc.freq(30, 1);
    osc.amp(0, 0.1, 1);
}

// remember that you need to resize the file to 1280x720, and you will probably
// want to delete this bit for your final submission.
// function keyTyped() {
//   if (key === " ") {
//     saveCanvas("thumbnail.png");
//   }
// }
