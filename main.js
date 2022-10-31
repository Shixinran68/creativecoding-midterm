// main.js

let game; // Main game program
let resources = {
  //definition of "null", reference: https://processing.org/reference/null.html
    bgm: null,
    font: null,
    cuteImg:[],
    ghostImg:[],
    cloudImg:[],
    lightningImg: [],
    cuteIcon:null
};

function preload() {
     resources.bgm = loadSound("collection/sweetsong.mp3");
    resources.font = loadFont("collection/Goozette.otf");
     resources.cuteIcon = loadImage("collection/cuteIcon.png");
    resources.ghostImg[0] = loadImage("collection/ghost.png");

    for (let i = 0; i < 10; i++) 
        resources.cuteImg[i] = loadImage("collection/10-cute image/cute" + i + ".png");

    for (let i = 0; i < 4; i++) 
        resources.cloudImg[i] = loadImage("collection/clouds/cloud" + i + ".png");

    for (let i = 0; i < 4; i++) 
         resources.lightningImg[i] = loadImage("collection/lightnings/lightning" + i + ".png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

    frameRate(20);
    game = new Game();
}



function draw() {
    background(random(0,123),random(0,139),random(111));
    textFont(resources.font);
    textStyle(BOLD);
    stroke(156, 168, 184);
    strokeWeight(4);
    fill(150, 84, 84);
    game.run();
}

//line 51: reset the username, reference from: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie; https://www.w3schools.com/js/js_cookies.asp
//document.cookie="username=;expires=Thu,08 June 2000 00:00:00 GMT";