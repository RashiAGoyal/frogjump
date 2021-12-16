var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play";
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  //creating ocean background
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  coinGroup= new Group();
  climbersGroup = new Group();

  

}

function draw(){
  background(0);
  drawSprites();
  textSize(20);
  text("Score : " + score,400,50);
 
  if (ocean.position.y > 250)
  {  ocean.position.y = 150;
  }

  
  if (gameState === "play") {
  ocean.setVelocity(0,5);
  
  if(keyDown("left"))
  {
    frog.position.x -=4;
  }
  if(keyDown("right"))
  {
    frog.position.x +=4;
  }
  if(keyDown("space"))
  {
    frog.position.y -=20;
   
  }
  else
  {
    frog.setVelocity(0,3);
  }
  spawnCoin();

  if (coinGroup.collide(frog))
   { score=score+1;
     coinGroup.destroyEach();
  }


  if(frog.y>450)
  {
   
    gameState = "end";
    
  }
}
  
  if (gameState === "end"){
    coinGroup.destroyEach();
    ocean.setVelocity(0,0);
    climbersGroup.destroyEach();
    textSize(40,40);
    
    text("Game Over",180,200);

  }

  

}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 100 === 0) {
    //make the x position of the coin and climber the same
    coin=createSprite(Math.round(random(10,550)),20,50,50);
    coin.addImage("coin",coinImg);
    coin.setVelocity(0,5);
    coin.scale=0.1;
    coin.lifetime=130;
    coinGroup.add(coin);

    climber=createSprite(coin.x,30,50,50);
    climber.addImage("climber",climberImg);
    climber.setVelocity(0,5);
    climber.scale=0.5;
    climber.lifetime=160;
    climbersGroup.add(climber);
  }
}
