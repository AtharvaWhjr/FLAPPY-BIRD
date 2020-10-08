
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var flappy, flappyImg;
var back, backImg;
var pipeImg, pipesGroup, pipes2Group, pipe2Img;
var score;
var gameOver, gameOverImg;
var restart, restartImg;
var alien, alienImg, aliensGroup;

var invisibleG, invisibleG2;
var gameOverSound, checkPointSound, jumpSound;
var laser, lasersGroup, laserImg;
var star, starsGroup, starImg;
var points;
var starSound;


function preload(){
   
  flappyImg = loadAnimation("flappy.png");
  backImg = loadImage("universe.jpg");
  pipeImg = loadImage("obstacle.png");
  gameOverImg = loadImage("gameover.jpg");
  pipe2Img = loadImage("obstacle.png");
  restartImg = loadImage("restart.png");
  gameOverSound = loadSound("gameOver.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  jumpSound = loadSound("jump.mp3");
  laserImg = loadImage("laser.png");
  starImg = loadImage("star.gif");
  starSound = loadSound("star.mp3");
}

function setup() {
 createCanvas(440,400);
  
  back = createSprite(250,200,550,400);
  back.addAnimation("back",backImg);
  back.scale = 2;
  back.velocityX = -3;
  
  gameOver = createSprite(200,180,10,10);
  gameOver.addAnimation("gameOver", gameOverImg);
  gameOver.scale = 0.4;
  gameOver.visible = false;
  
  restart = createSprite(200,253,10,10);
  restart.addAnimation("restart", restartImg);
  restart.scale= 0.2;
  restart.visible = false;

  invisibleG = createSprite(220,400,440,10);
  invisibleG.visible = false;
  
  invisibleG2 = createSprite(220,0,440,10);
  invisibleG2.visible = false;
  
  flappy = createSprite(50,250,10,10);
  flappy.addAnimation("flappy",flappyImg);
  flappy.scale = 0.06;
  
  score = 0;
  points = 0;
  
  pipesGroup = new Group();
  pipes2Group = new Group();
  lasersGroup = new Group();
  starsGroup = new Group();
  


}

function draw() {
  



 if(gameState===PLAY){
   

   if(score > 0 && score % 100 === 0){
      checkPointSound.play();
   }
  
 
  if(back.x<135){
     back.x=back.width/1;
     }
   if(flappy.isTouching(starsGroup)){
     starsGroup.destroyEach();
     points = points+1;
     starSound.play();
     back.velocityX = -4;
   }

      
  if(keyDown("space")){
    flappy.velocityY = -5;
    jumpSound.play();
  }
   
       pipesGroup.velocityX = -(5 + 3* score/100);
       back.velocityX = -(3 + 3* score/100)
       pipes2Group.velocityX = -(5 + 3* score/100);
       lasersGroup.velocityX = -(2 + 3* score/100);


    flappy.velocityY = flappy.velocityY+0.2;
   
   if(flappy.isTouching(pipesGroup) || flappy.isTouching(pipes2Group) || flappy.isTouching(lasersGroup)){ 
     
     gameOverSound.play();
     
    back.velocityX = 0;
     flappy.velocityY = 0;
     flappy.visible = false;
     
     lasersGroup.setLifetimeEach(-1);
    pipesGroup.setLifetimeEach(-1);
     pipes2Group.setLifetimeEach(-1);
     starsGroup.setLifetimeEach(-1);
  
     pipesGroup.setVelocityXEach(0);
       pipes2Group.setVelocityXEach(0);
       lasersGroup.setVelocityXEach(0);
       lasersGroup.setVelocityYEach(0);
       starsGroup.setVelocityXEach(0);
       starsGroup.setVelocityYEach(0);

     
     gameOver.visible = true;
      restart.visible = true;
     

     gameState = END;
   }
   if(frameCount % 4 === 0){
     score=score+1;
     
   }
   
   
    spawnPipes();
   spawnPipes2();
   spawnLasers();
   spawnStars();
   
 }
  
   else if(gameState===END){
    
    
     
    if(mousePressedOver(restart)){
    reset();
      
  }

   
}
  
  
  flappy.collide(invisibleG);
    flappy.collide(invisibleG2);

   lasersGroup.bounceOff(invisibleG);
     lasersGroup.bounceOff(invisibleG2);
   starsGroup.bounceOff(invisibleG);
     starsGroup.bounceOff(invisibleG2);

  
         drawSprites();
  
  stroke("red");
  textSize(20);
  fill("red");
  text("Press Space",170,50);
   
  stroke("red");
  textSize(20);
  fill("green");
  text("Distance : "+ score,50,20);
  
  stroke("green");
  textSize(20);
  fill("pink");
  text("STARS :  "+ points,300,20);
  

  
}

function spawnPipes(){
  if(frameCount % 100=== 0){
    pipe = createSprite(450,20,20,20);
    pipe.addImage("pipe", pipeImg);
    pipe.velocityX = -5;
    pipe.scale = 0.3;
    
    gameOver.depth = pipe.depth;
    gameOver.depth = gameOver.depth+1;

   pipe.x = Math.round(random(1000,0)); 


  
    pipesGroup.add(pipe);
  }
  
}
function spawnPipes2(){
  if(frameCount % 100=== 0){
    pipe2 = createSprite(450,420,10,10);
    pipe2.addImage("pipe", pipeImg);
    pipe2.velocityX = -5;
    pipe2.scale = 0.2;
    pipe2.debug = "true";
    
    restart.depth = pipe2.depth;
    restart.depth = restart.depth+1;
    //pipe2.lifetime = 100;
    
  // pipe2.x = Math.round(random(12,200)); 

    pipes2Group.add(pipe2);
    
       pipe2.x = Math.round(random(950,100)); 

}


}
function spawnLasers(){
  if(frameCount % 200 === 0){
    laser = createSprite(600, 190,10,10);
    laser.addAnimation("laser", laserImg);
    laser.scale = 0.12;
    laser.velocityX = -2;
    laser.velocityY = -2;
    

    
    laser.depth = pipe.depth;
    laser.depth = laser.depth+1;
    
    lasersGroup.add(laser);
  }
  
}
function spawnStars(){
  if(frameCount % 200 === 0){
    star = createSprite(500, 250, 10,10);
    star.addAnimation("star", starImg);
    star.scale = 0.1;
    star.velocityX = -3;
    star.velocityY = -3;
    
          // star.x = Math.round(random(950,100)); 

    
    starsGroup.add(star);
  }
  
  
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  pipesGroup.destroyEach();
  pipes2Group.destroyEach();
  lasersGroup.destroyEach();
  starsGroup.destroyEach();
  flappy.visible = true;
  back.velocityX = -2;
  score=0;
  jumpSound.play();
  flappy.x = 50;
  flappy.y = 250;
  points = 0;
}

