//Declaring Variables
var gameState = "play";

var bird,birdImage;
var scene,sceneImage;
var cloud,cloudImage,cloudsGroup;
var plane,planeImage,planesGroup;
var lives = 3;
var score = 0;

//Function Preload
function preload(){
  //loading Sprite Images
  birdImage = loadAnimation("Images/frame-1.png","Images/frame-2.png");
  sceneImage = loadImage("Images/background.jpg");
  cloudImage = loadImage("Images/cloud.png");
  planeImage = loadImage("Images/plane.png");
}

//Function Setup
function setup() {
  createCanvas(750,600);

  //Creating Scene 
  scene = createSprite(600,300,10,10);
  scene.addImage("scene",sceneImage);
  scene.velocityX = -3;
  scene.scale = 2.5;

  //Creating Bird
  bird = createSprite(200,300,20,20);
  bird.addAnimation("bird",birdImage);
  bird.scale = 0.1;

  cloudsGroup = createGroup();
  planesGroup = createGroup();

 }

function draw() {
  background(0);
  /*if(gameState === "start"){
    if(mousePressed("")){
    }
  }*/
  if(gameState === "play"){

    if(scene.x < 0){
      scene.x = 300;
    }

    score = score+Math.round(frameRate()/80);

  //Creating UP Functoin
  if(keyWentDown(UP_ARROW)){
    bird.velocityY = -12;
  }
  bird.velocityY += 0.8;

  if(bird.y < 0 || bird.y > 600){
    lives = lives-1;
    bird.y = 300;
  }

  clouds();
  planes();

  for(var i=0; i<cloudsGroup.length; i++){
    if(cloudsGroup.isTouching(bird) && lives > 0){
      lives = lives-1;
      cloudsGroup.get(i).destroy();
    }
  }
  for(var a=0; a<planesGroup.length; a++){
    if(planesGroup.isTouching(bird) && lives > 0){
      lives = lives-1;
      planesGroup.get(a).destroy();
    }
  }

  if(lives === 0){
    bird.destroy();
    cloudsGroup.destroyEach();
    planesGroup.destroyEach();
    scene.velocityX = 0;
    gameState = "end";
  }
  }

  drawSprites();
  textSize(20);
  fill("red");
  text("Lives:"+lives,550,50);

  text("Score:" + score,550,100);

  if(gameState === "end"){ 
    textSize(50);
    fill("red");
    strokeWeight(10);
    stroke("blue");
    text("Game Over",275,300)
  }
}

//Function for making clouds
function clouds(){
  if(frameCount % 90 === 0){
  cloud = createSprite(750,Math.round(random(20,450)),10,10);
  cloud.addImage("cloud",cloudImage);
  cloud.scale = 0.25;
  cloud.lifetime = 150;
  cloud.velocityX = -5;

  cloudsGroup.add(cloud);
  }
}

//Function for making planes
function planes(){
  if(frameCount % 150 === 0){
    plane = createSprite(750,Math.round(random(10,400)),10,10);
    plane.addImage("plane",planeImage);
    plane.scale = 0.18;
    plane.lifetime = 150;
    plane.velocityX = -5;

    planesGroup.add(plane);
    
  }
}