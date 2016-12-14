var fox;
var food = [];
var poop = [];
var lives;
var score;
var foodOne, foodTwo, foodThree, foodFour;
var foxL1,fox1;
var heart;
var gameStarted;
var back;

function preload()
{
  //load food images
  food1 = loadImage("cake.png");
  food2 = loadImage("cupcake.png");
  food3 = loadImage("cupcakeBlue.png");
  food4 = loadImage("donut.png");
  
  //load character
  foxL1 = loadImage("fen1left.png");
  fox1 = loadImage("fen1.png");

  heart = loadImage("heart.png");
  poop1 = loadImage("poop.png")

  
  back = loadImage("background.png");
  
}

function setup() 
{
  // set canvas size
  createCanvas(800, 400);
  background(back);
  fill(0);
  
  // create fox object
  fox = new Fox();
  
  lives = 3;
  score = 0;
  
  // create clear button
  startButton = createButton('Start Game');
  startButton.position(375, 200);
  startButton.mousePressed(startGame);
  
  gameStarted = false;
}

function draw() 
{
  if(gameStarted === true)
  {
    //background(back);
    image(back, width/2, height/2, width, height); // this is some bullshit
    console.log("STARTED!");
    // hide start button
    startButton.hide();
  
   
   
    // display score
    fill(200);
    noCursor();
    noStroke();
    textSize(24);
    text("Score: " + score, 30, 50);
  
    // display number of lives
    switch(lives)
    {
      case 3:
        image(heart, 650, 30);
        image(heart, 690, 30);
        image(heart, 730, 30);
      break;
      case 2:
        image(heart, 690, 30);
        image(heart, 730, 30);
      break;
      case 1:
        image(heart, 730, 30);
      break;
    }

    //display Fox
    fox.display();
  
    //drops random food objects
    var foodHatch = Math.ceil(random(30));
    if(foodHatch == 1)
    {
      food.push(new Food());
    }
  
    //drops random poop objects
    var poopHatch = Math.ceil(random(30));
    if(poopHatch == 1)
    {
      poop.push(new Poop());
    }
  
    //loops through the food array
    for (var i=0; i<food.length; i++) 
    {
      //displays the food
      food[i].display();
    
      //checks if the food touches the floor
      if(food[i].ypos > 500)
      {
        //removes the food
        food.splice(i, 1);
      
      } else {
      
        // check if the fox eats the food
        var d1 = dist(food[i].xpos, food[i].ypos, fox.xpos, fox.ypos);
        if(d1 < 50)
        {
          //removes the food
          food.splice(i, 1);
         
          // decrease lives by one
          score++;

        }
      }
    }

    // loop through each poop
    for (var j=0; j<poop.length; j++) 
    {
      // display poop
      poop[j].display();
    
      // check if poop reaches bottom of screen
      if(poop[j].ypos > 500)
      {
        // remove poop
        poop.splice(j, 1);
    
      } else {
    
        // check if fox is touching poop
        var d2 = dist(poop[j].xpos, poop[j].ypos, fox.xpos, fox.ypos);
        if(d2 < 25)
        {
          // remove food
          poop.splice(j, 1);
        
          // increase score by one
          lives--;

        }
      }
    }
  
    // check for game over
    if(lives <= 0)
    {
      // reset lives and score
      lives = 3;
      score = 0;
      
      // reset fox's position
      fox.xpos = 400;
      fox.direction = "stopped";
    
      // remove food and poop
      food = [];
      poop = [];

      // set gameStarted to false
      gameStarted = false;
    }
  
  } else {
	  
    // show start button
    startButton.show();
	  
  }
}

function startGame()
{
  // change gameStarted variable
  gameStarted = true;

}

function keyPressed()
{
  // if the right arrow was pressed
  if(keyCode == RIGHT_ARROW)
  {
    // change fox direction property
    fox.direction = 'right';
  }
  
  // if the left arrow was pressed
  if(keyCode == LEFT_ARROW)
  {
    // change fox direction property
    fox.direction = 'left';
  }
}



//FOX CLASS
function Fox()
{
  // set default properties
  this.xpos = 400;
  this.ypos = 350;
  this.speed = 4;
  this.direction = "stopped";

}

Fox.prototype.display = function()
{
  
  imageMode(CENTER);
  
  // if fox facing right
  if(this.direction == 'right')
  {
        image(fox1, this.xpos, this.ypos, 80, 100); 
    
    //move fox to the right
    this.xpos = this.xpos + this.speed;
  }
  
  //if fox facing left
  if(this.direction == 'left')
  {
    image(foxL1, this.xpos, this.ypos, 80, 100); 
    //moves the fox to the left
    this.xpos = this.xpos - this.speed;
  }
  
  //when starting, the image of the fox will show
  if(this.direction == 'stopped')
  {
    image(foxL1, this.xpos, this.ypos,80,100);
  }
  
  // wrap fox if it reaches the end of the screen
  if(this.xpos > 800)
  {
    this.xpos = 0;
  }
  if(this.xpos < 0)
  {
    this.xpos = width;
  }
}

//FOOD CLASS
function Food()
{
  // set default properties
  this.xpos = random(0, width);
  this.ypos = 0;
  this.speed = random(1, 4);
  this.type = Math.ceil(random(4));
}

Food.prototype.display = function()
{
  imageMode(CENTER);
  
  //shows different images of food
  switch(this.type)
  {
    case 1: image(food1, this.xpos, this.ypos); break;
    case 2: image(food2, this.xpos, this.ypos); break;
    case 3: image(food3, this.xpos, this.ypos); break;
    case 4: image(food4, this.xpos, this.ypos, 50, 50); break; 
  }
  this.ypos = this.ypos + this.speed;
}


// POOP CLASS
function Poop()
{
  this.xpos = random(0, 600);
  this.ypos = 0;
  this.speed = random(1, 4);
}

Poop.prototype.display = function()
{
  imageMode(CENTER);
  image(poop1, this.xpos, this.ypos, 50,50);
  noStroke();
  this.ypos = this.ypos + this.speed;
}