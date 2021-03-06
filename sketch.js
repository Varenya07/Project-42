play = 1;
end = 0;
gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, survivalTime
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(450,348,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0; 
  survivalTime = 0;
}


function draw() {
  background("white");
  
  monkey.collide(ground);
  
 if(ground.x<0) {
    ground.x = ground.width/2;
  }
  
  textSize(20);
  fill("black")
  text("Score: " + score, 400,50);
  
  text("Survival Time: " + survivalTime,100,50)
  
  if(gameState === 1) {
    bananas();
    obstacles();
    
    if(keyDown("space") && monkey.y >= 310) {
    monkey.velocityY = -16;
  }
  monkey.velocityY = monkey.velocityY+0.8;
    
    survivalTime = Math.ceil(frameCount/frameRate());
  
  if(bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score+1;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    gameState = 0;
  }
}
  
  if(gameState === 0) {
    monkey.velocityY = 0; 
    ground.velocityX = 0;
    banana.velocityX = 0;
    obstacle.velocityX = 0;
    
    obstacle.lifetime = -1;
    banana.lifetime = -1;

    textSize(25)
    text("Game Over",200,150)
    
    if(keyDown("r")) {
      reset();
    }
  }
  
  drawSprites();
}

function bananas() {
  if(frameCount%80 === 0) {
    banana = createSprite(500,250,20,20);
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 100;
    
    banana.y = Math.round(random(120,200));
    
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount%300 === 0) {
    obstacle  = createSprite(500,325,20,20); 
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    
    obstacleGroup.add(obstacle);
  }
}

function reset() {
  gameState = 1;
  
  score = 0;
  survivalTime = 0;
  frameCount = 0;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
}



