
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count=0
        

var backedground,ground,player,rand,groundimg,playerimg,backedgroundimg,gameoverimg,gameover,restart,count,obstaclesGroup,live1,live2,live3,live4,liveimg;
var invisibleground,obstacleimg,restartimg,coinsGroup,airgroundGroup,ainvisibleground ,airgroundimg;
var obstacle1img,obstacle2img,obstacle3img,obstacle4img,coinimg,trackSound,invisibleBlockGroup;

function preload(){

  groundimg=loadImage("ground.png")

 liveimg=loadImage("live.png")

  backedgroundimg=loadImage("bg13.jpg")

  obstacleimg=loadImage("ob.png"+rand)

  gameoverimg=loadImage("over.png")

  restartimg=loadImage("restart.png")

  playerimg=loadImage("player6.png")

  obstacle1img=loadImage("obstacle1.png")

   obstacle2img=loadImage("ob4.png") 

   obstacle3img=loadImage("obstacle4.png") 

   obstacle4img=loadImage("ob4.png") 

   coinimg=loadImage("coin.png")

    airgroundimg=loadImage("g2.png")

    




  

}
function setup() {
  createCanvas(1600,800);


  backedground=createSprite(800,400,20,20);
  backedground.velocityX=-6
  backedground.addImage(backedgroundimg)

   ground = createSprite(900,780,1600,40);
  ground.addImage(groundimg)
 ground.scale=0.2
  ground.velocityX =-(6 + 3*count/100);



invisibleground=createSprite(900,760,1600,100)
invisibleground.setCollider("rectangle")
invisibleground.visible=false;



player=createSprite(200,650,20,50)
player.addImage(playerimg)
player.scale=0.2
player.setCollider("rectangle")

gameover=createSprite(800,360)
gameover.addImage(gameoverimg);
gameover.scale=0.5
gameover.visible=false;

restart=createSprite(800,500);
restart.addImage(restartimg);
restart.scale=0.09
restart.visible=false
   





obstaclesGroup=createGroup();
coinsGroup=createGroup();
airgroundGroup=createGroup();
invisibleBlockGroup = createGroup();



//playerimg=p5Gif.loadGif("player3.gif",function(){
  //this.loop({x:200,y:600})

//})


}

function draw() {
  background(0);
  textSize(30);
textFont("Georgia");
stroke("red");
fill("black");
text("SCORE",300,50)

    if(ground.x<700){
   ground.x=800
    }
    if(backedground.x<700){
backedground.x=width/2
    }
    if (gameState===PLAY){
      count=count+1
     
    if(keyDown("space") && player.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
    
      spawnobstaclesGroup();
      spawnCoins();
      spawnAground();
      
    
      if(obstaclesGroup.isTouching(player)){
     gameState=END
      }
      if(coinsGroup.isTouching(player)){
        coinsGroup.destroyEach();
       count=count+5

      }
      if(airgroundGroup.isTouching(player)){
        player.velocityY = 0;
      }

      if(invisibleBlockGroup.isTouching(player)){
        gameState=END
         }
    }
    
  else if (gameState === END) {
   
    gameover.visible=true;
    restart.visible=true;
    ground.velocityX = 0;
    player.velocityY = 0;
    backedground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    invisibleBlockGroup.setLifetimeEach(-1);
    airgroundGroup.setLifetimeEach(-1);
    
   
   
    }
    if(mousePressedOver(restart)){
      reset();

    }

    
    player.collide(invisibleground)
   
    
  drawSprites();
  
  text("SCORE="+count,100,50)
  //text("POINTS"+point,100,65)
  
}
function  spawnobstaclesGroup(){
      if(frameCount%100===0){
        var obstacle=createSprite(1500,710,10,40);
        
        obstacle.lifetime=1000
        obstacle.velocityX = -(6 + 3*count/100);
        obstacle.addImage(obstacleimg);
       obstacle.scale=0.3
        
      var rand = Math.round(random(1,6));
       switch(rand) {
          case 1: obstacle.addImage(obstacle1img);
                 break;
          case 2: obstacle.addImage(obstacle2img);
                  break;
          case 3: obstacle.addImage(obstacle3img);
                  break;
         case 4: obstacle.addImage(obstacle4img);
                break;
          
        default: break;
        }
      

        obstaclesGroup.add(obstacle);
        
      }
    }
    function spawnCoins(){
      if(frameCount%60===0){
      var  coin =createSprite(1000,690,20,20)
      coin.lifetime=1000;
      coin.velocityX=-(6+3*count/500)
      coin.addImage(coinimg)
      coin.scale=0.1

      
      coinsGroup.add(coin)
      }
    }

    function spawnAground(){
      if(frameCount%500===0){
        var aground=createSprite(1000,350,600,10)
        aground.lifetime=1000;
        aground.velocityX=-6
        ainvisibleground=createSprite(1000,355,600,10)
        ainvisibleground.setCollider("rectangle")
         ainvisibleground.visible=false;

        aground.addImage(airgroundimg)
  aground.setCollider("rectangle")
        airgroundGroup.add(aground)
        invisibleBlockGroup.add(ainvisibleground)
      }
    }
function reset (){
  gameState=PLAY
  gameover.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach()
  coinsGroup.destroyEach();
  airgroundGroup.destroyEach();
  invisibleBlockGroup.destroyEach();
  backedground.velocityX=-4
  ground.velocityX=-(6+3*count/100)
  count=0
  //point=0
}

