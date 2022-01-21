var stickman,stickman2,stickman1Img,stickman2Img;
var ground,groundImg;

var win;
var rules, rulesImg;

var gameover,gameoverImg;
//var coinsGroup,coinsImage;'
var treasure,treasureImg;
var bombGroup,rockGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var reset,resetImg;

var gameState = PLAY;
var gameState = END;
var gameState = GOODEND;

var PLAY = 1;
var END = 2;
var GOODEND = 3;

var score = 0;

function preload(){
  stickman1Img = loadImage("stick.png");
  stickman2Img = loadAnimation("images/stick1.png","images/stick2.png","images/stick3.png", "images/stick4.png","images/stick5.png","images/stick6.png","images/stick7.png","images/stick8.png","images/stick9.png","images/stick10.png","images/stick11.png","images/stick12.png");
  
  gameoverImg = loadImage("images/game over.png")
  obstacle1 = loadImage("images/bomb.png");
  obstacle2 = loadImage("images/rock.png");
  
  obstacle3=loadImage("images/arrow0.png");
  obstacle4= loadImage("images/fire.png");
  
  obstacle5=loadImage("images/coin.png");
  //obstacle6= loadImage("images/coin2.png");
  
  groundImg = loadImage("images/ground.jpg");
  
  overSound = loadSound("images/over.wav");
  cointaking = loadSound("images/coin taking.wav");
  
  treasureImg = loadImage("images/treasure.png");
  
  win = loadSound("images/win.wav");
  
  rulesImg = loadImage("images/rules.jpg");
  
  resetImg = loadImage("images/reset.png");
}
function setup(){
  
  createCanvas(500,250);
  
  ground = createSprite(350,35,10,10);
  ground.addImage(groundImg);
  ground.scale = 1.2;
  
  stickman1 = createSprite(50,185,10,10);
  stickman1.addImage(stickman1Img);
  stickman1.scale = 0.1;
  
  stickman2 = createSprite(50,158,10,10);
  stickman2.addAnimation("running",stickman2Img);
  stickman2.scale = 0.7;
  stickman2.visible = false;
  stickman2.setCollider("rectangle",0,0,15,60);
  //stickman2.debug = true;
  
  coinsGroup = createGroup();
  coinsGroup2 = createGroup();
  rockGroup = createGroup();
  bombGroup = createGroup();
  
  gameover = createSprite(250,150,10,10);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.3;
  gameover.visible = false;
  
  treasure = createSprite(250,150,10,10);
  treasure.addImage(treasureImg);
  treasure.scale = 0.4;
  treasure.visible = false;
  
  rules = createSprite(250,145,10,10);
  rules.addImage(rulesImg);
  rules.scale = 0.8;
  
  reset = createSprite(250,50,10,10);
  reset.addImage(resetImg);
  reset.scale = 0.1;
  reset.visible = false;
}


function draw() {
  background(255);
  
  
  if(keyDown("G")) {
    gameState = PLAY;
    
}
  
  if(gameState === PLAY) {
    reset.visible = false;
    gameover.visible = false;
    rules.visible = false;
     stickman1.visible = false;
    stickman2.visible = true;
    ground.velocityX = -2;
    console.log(frameCount);
    spawnBomb();
    spawnRock();
    spawnCoins();
    spawnCoins2();
    
    if(bombGroup.isTouching(stickman2)) {
       gameState = END;
      gameover.visible = true;
      overSound.play();
      
       }
    
    if(rockGroup.isTouching(stickman2)) {
       gameState = END;
      gameover.visible = true;
      overSound.play();
       }
    
    if(coinsGroup.isTouching(stickman2)) {
       coinsGroup.destroyEach();
      coinsGroup2.destroyEach();
      cointaking.play();
      score = score + 1;
       }
    
  }
  else if (gameState === END) {
   // obstacle.visible = false;
       obstacle1.visible = false;
       obstacle2.visible = false;
    ground.velocityX = 0;
    stickman2.visible = false;
    coinsGroup.destroyEach();
    coinsGroup2.destroyEach();
    bombGroup.destroyEach();
    rockGroup.destroyEach();
    reset.visible = true;
    
    if(mousePressedOver(reset)) {
     gameState = PLAY;
      score = 0;
      reset.visible = false;
     }
  }
  
  if (ground.x < 250){
      ground.x = ground.width/2;
    }
  
  if(keyDown("DOWN_ARROW")) {
    stickman2.y = 220;
}
  
  if(keyDown("UP_ARROW")) {
    stickman2.y = 158;
}
  if(frameCount % 5000 === 0) {
     gameState = GOODEND;
    win.play();
    stickman2.visible = false;
     }
  
  if(gameState === GOODEND) {
treasure.visible = true;
     rockGroup.destroyEach();
     bombGroup.destroyEach();
    
    ground.velocity = 0;
    
     }
  
  drawSprites();
  
 if(gameState === PLAY) {
  textSize(15);
  stroke("black");
  fill("black");
  text("Score :"+ score , 380,50);
  
}
}

function spawnBomb(){
  if (frameCount % 200 === 0){
   var obstacle = createSprite(450,175,10,10);
   obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
      
    }
    obstacle.scale = 0.05;
    
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height)
   // obstacle.debug = true;
    
  bombGroup.add(obstacle);
  }   
}

function spawnRock(){
  if (frameCount % 100===0){
   var obstacle2=createSprite(360,210,10,10);
   obstacle2.velocityX= -5;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle2.addImage(obstacle3);
              break;
      case 2: obstacle2.addImage(obstacle4);
              break;
      default: break;
    }
    obstacle2.scale=0.03;
    rockGroup.add(obstacle2);
  obstacle2.setCollider("rectangle",0,0,obstacle2.width,obstacle2.height)
}
}

function spawnCoins() {
if (frameCount % 60===0){
   var obstacle3=createSprite(360,210,10,10);
   obstacle3.velocityX= -4;
  
  
    
   var rand = Math.round(random(1,2));
  if(rand == 1) {
     obstacle3.y = 178;
}
  else
    {
      obstacle3.y = 212;
    }
   
   obstacle3.addImage(obstacle5);
  
    obstacle3.scale=0.05;
    coinsGroup.add(obstacle3);
  
}
}

function spawnCoins2() {
if (frameCount % 100===0){
   var obstacle4=createSprite(360,210,10,10);
   obstacle4.velocityX= -4;
  
  
    
   var rand = Math.round(random(1,2));
  if(rand == 1) {
     obstacle4.y = 178;
}
  else
    {
      obstacle4.y = 212;
    }
   
   obstacle4.addImage(obstacle5);
  
    obstacle4.scale=0.05;
    coinsGroup2.add(obstacle4);
  
}
}