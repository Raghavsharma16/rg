// MAKING GAMESATES
var PLAY = 1;
var END = 0;
var HOME=2;
var score=0;
var NEXT=3;
var gameState = HOME;
// MAKING VARIABLES
var bg1,bg1Img;
var bg2,bg2Img;
var dog,dog_running;
var bg,bgImg;
var rabit,rabit_running;
var obstacle,obstacleImg;
var coin,coinImg;
var carrot,carrotImg;
var stone,stoneImg;
var obstacleGroup;
var go,goImg;
var r,rImg;
var js,gs;
var g,gImg;
var invisibleGround;
 var yw,ywImg;
var fire,fireImg;

function preload () 
{
  //LOADING ALL THE IMAGES
rabit_running=loadAnimation("1.png","2.png","3.png","4.png");
dog_running=loadAnimation("5.png","6.png");
obstacleImg=loadImage("cactus.png");
coinImg=loadImage("coin.png");
carrotImg=loadImage("carrot.png");
bgImg=loadImage("bg.jpg");
goImg=loadImage("g.png");
bg1Img=loadImage("bg1.jpg");
fireImg=loadImage("fire.png");
rImg=loadImage("download.png");
gImg=loadImage("images.png");
js=loadSound("jumpsound.wav");
gs=loadSound("gameover.wav");
ywImg=loadImage("you win.jpg");
bg2Img=loadImage("bg2.jpg");
stoneImg=loadImage("stone.png");
}
//PRELOAD FUNCTION END
function setup()
 {
   //GIVING SIZE TO CANVAS
    createCanvas(windowWidth,windowHeight);
// CREATING ALL THE SPRITES
    bg=createSprite(width/2,height/2,width,height);
    bg.addImage(bgImg);
    bg.visible=false;
    bg.velocityX = -9;
    bg.scale=1.7;
 
    score=0;

    yw=createSprite(width/2,height/2);
    yw.addImage(ywImg);
    yw.scale=3.6;
    yw.visible=false;

    bg1=createSprite(width/2,height/2,width+400,height);
    bg1.addImage(bg1Img);
    bg1.scale=0.3;
    bg1.visible=false;

    go=createSprite(width/2,height/2);
    go.addImage(goImg);
    go.scale=0.7;
    go.visible=false;

    rabit=createSprite(300,500);
    rabit.addAnimation("running",rabit_running);
    rabit.visible=true;

    dog=createSprite(100,530);
    dog.addAnimation("running",dog_running);
    dog.visible=true;
    dog.scale=2.3;

    invisibleGround = createSprite(width/2,height-10,width,125);  
    invisibleGround.shapeColor = "#f4cbaa";
    
    obstacleGroup = new Group();
    fireGroup = new Group();
    carrotGroup = new Group();
stoneGroup=new Group();
    g=createSprite(width/2,height/2);
    g.addImage(gImg);
    g.scale=2.6;
    g.visible=false;

    r=createSprite(width/2,height-150);
    r.addImage(rImg);
    r.visible=false;
 

}
//FUNCTION SETUP END

function draw(){

    background("Green");
//MAKING GAMESTATE = HOME MEANS WHAT WE HAVE TO DO IN HOME STATE
    if(gameState===HOME)
    {
textSize(30);
fill("Black");
text("CLICK SPACE OR TOUCH SCREEN TO JUMP AVOID OBSTACLES",width+30,height+20);
text("TOUCH CARROT FOR DESTROY ALL OBSTACLES IN YOUR SCREEN",width+30,height+40);
 go.visible=true;
 bg1.visible=true;
// obstacle.visible = false;
 rabit.visible=false;
 bg.visible=false;
 g.visible=false;
 dog.visible=false;
 invisibleGround.visible=false;
//CHANGING GAMESTATE
 if(touches.length>0 || keyDown("SPACE")) 
 {      
     gameState=PLAY;
     touches = []
 }
      
}
//HOME STATE END

// GAMESTATE = PLAY MEANS WHAT WE HAVE TO DO IN GAMESTATE PLAY
    if(gameState === PLAY){
     
    textSize(30);
    fill("Black");
    text("Score: "+ score,30,50);
    score = score + Math.round(getFrameRate()/60);
  
 
// GIVING VISIBILITY TO SPRITES
 dog.visible=true;
 go.visible=false;
 bg1.visible=false;
 rabit.visible=true;
 bg.visible=true;
 g.visible=false;
r.visible=false;
 // CALLING FUNCTIONS
 spawnObstacles();
 spawnCarrot();
 spawnFire();
 spawnStone();
 // MAKING GROUND INFINITE
    if (bg.x < 500)
    {
        bg.x = bg.width/2;
    }

      if (invisibleGround.x < 500)
      {
        invisibleGround.x = invisibleGround.width/2;
      }
    invisibleGround.visible=true;
// GIVING GRAVITY TO RABBIT
    rabit.velocityY = rabit.velocityY + 0.6;
// JUMPING RABBIT IN OUR GAME
      if((touches.length > 0 || keyDown("SPACE")) && rabit.y  >= height-180) 
      {
      js.play( )
    rabit.velocityY = -9;
       
      touches = [];
      }
      // HOW GAME STATE = END
      if(carrotGroup.isTouching(rabit))
      {
      js.play( )

        fireGroup.destroyEach(0);
        obstacleGroup.destroyEach(0);
        carrotGroup.destroyEach(0);
        stoneGroup.destroyEach(0);
      }
// COLLIDING SPRITES
      rabit.collide(invisibleGround);

      dog.collide(invisibleGround);

      dog.collide(rabit);

       // HOW GAME STATE = END
        if(obstacleGroup.isTouching(rabit))
        {
            gameState = END;
            gs.play( )
        }
        if(stoneGroup.isTouching(rabit))
        {
            gameState = END;
            gs.play( )
        }
        if(fireGroup.isTouching(rabit))
        {
          gameState = END;
          gs.play( )
      }
      if(frameCount % 200===0)
      {
        bg.velocityX=bg.velocityX-1;
        obstacleGroup.velocityX=obstacleGroup.velocityX-5;
        fireGroup.velocityX=fireGroup.velocityX = -5;
        stoneGroup.velocityX=stoneGroup.velocityX=-5;
      }
    
  

    }
    // GAMESTATE = END
    if(gameState===END)
    {
        background(0);
        g.visible=true;

        r.visible=true;

        rabit.visible=false;

        stoneGroup.destroyEach(0);

        obstacleGroup.destroyEach(0);

        fireGroup.destroyEach(0);

        rabit.collide(invisibleGround);

        bg.velocityX=0;

        if(touches.length>0 || keyDown("SPACE")) {      
          reset();
          touches = []
        }

        dog.visible=false;
    }
// DRAWING OUR SPRITES
drawSprites();

}

// MAKING FIRE OBSTACLE
function spawnFire() 
{

    if(frameCount % 1000 === 0) 
    {
      var fire = createSprite(1200,height-95,20,30);
      fire.setCollider('circle',0,0,45);
      // obstacle.debug = true
   
      fire.velocityX = -9;
      fire.scale = 0.1;
      fire.lifetime = 300;
    fire.visible=true;

    fire.depth = rabit.depth;
    rabit.depth = rabit.depth+1;
    fire.depth = dog.depth;
    dog.depth = dog.depth+1;

      //generate random obstacles
    fire.addImage(fireImg);
    fireGroup.add(fire);
      }
    
      //assign scale and lifetime to the obstacle           
    
      //add each obstacle to the group
     
    }
    function spawnStone(){

     
      if(frameCount % 250 === 0) 
      {
        var stone = createSprite(800,height-90,20,30);
        stone.setCollider('circle',0,0,45)
        // obstacle.debug = true
      
        stone.velocityX = -9; 
        stone.scale = 0.2;
        stone.lifetime = 300;
        stone.visible=true;
        stone.depth = rabit.depth;
      rabit.depth = rabit.depth+1;
        //generate random obstacles
      stone.addImage(stoneImg);
      stoneGroup.add(stone);
        }
      
        //assign scale and lifetime to the obstacle           
      
        //add each obstacle to the group
      }
//MAKING OBSTACLES
  function spawnObstacles() 
  {
    if(frameCount % 150 === 0) 
    {
      var obstacle = createSprite(1200,height-95,20,30);
      obstacle.setCollider('circle',0,0,45)
      // obstacle.debug = true
    
      obstacle.velocityX = -9;
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
    obstacle.visible=true;

    obstacle.depth = rabit.depth;
    rabit.depth = rabit.depth+1;
    obstacle.depth = dog.depth;
    dog.depth = dog.depth+1;

      //generate random obstacles
    obstacle.addImage(obstacleImg);
    obstacleGroup.add(obstacle);
      }
    
      //assign scale and lifetime to the obstacle           
    
      //add each obstacle to the group
     
    }
  
  //MAKING RABBIT POWER
    function spawnCarrot() {

      if(frameCount % 900 === 0) 
      {
        var carrot = createSprite(900,height-200,20,30);
        carrot.setCollider('circle',0,0,45)
        // obstacle.debug = true
      
        carrot.velocityX = -9; 
        carrot.scale = 0.2;
        carrot.lifetime = 300;
      carrot.visible=true;

      carrot.depth = rabit.depth;
      rabit.depth = rabit.depth+1;
        //generate random obstacles
      carrot.addImage(carrotImg);
      carrotGroup.add(carrot);
        }
      
        //assign scale and lifetime to the obstacle           
      
        //add each obstacle to the group
       
      }
     
     // MAKING RESET FUNCTION
      function reset(){
        
        gameState = PLAY;
  
        rabit.visible=true;
      bg.velocityX=-4;
        obstacleGroup.destroyEach(0);
        fireGroup.destroyEach(0);
        
        
      }












