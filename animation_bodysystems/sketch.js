var thestuff = new Array(30);
var thenum = new Array(30);
var foodPics, fork, back, calcur, curfood;
var countdown;
var currentTime;
var isRunning = true;
var playwinsound= false;

function preload() {
  back = loadImage("177513940.jpg");
  foodPics = [loadImage("egg_PNG49.png"), loadImage("bread.png"), loadImage("Bacon.png"), 
  loadImage("Sausage.png"), loadImage("Shredded-Cheese.png"), loadImage("juice_PNG7183.png"), 
  loadImage("milk.png"), loadImage("em_butter.png"), loadImage("bagel.png"), loadImage("banana.png"),
  loadImage("strawberry.png"), loadImage("apple.png")];
  fork = loadImage("fork_PNG3063.png");
}

function setup() {
  createCanvas(800, 600);
  background(back);
  fill(0);
  calcur = 0;
  curfood = "NONE"
  for(var i =0;i<thestuff.length;i++)
  {
    thenum[i] = floor(random(foodPics.length))
    thestuff[i] = new FoodDraw(foodPics[thenum[i]]);
  }
  
  countdown = 50;
  currentTime = millis();
}

function draw() {
  background(back);

  if(isRunning) {
    countdown = countdown-((millis()-currentTime)/1000.);
    currentTime=millis();
    if(countdown<0) gameOver();
    image(fork, mouseX-25, mouseY-25, 50, 50);

    // draw everything!!!!!!!:
    for(var i in thestuff) {
      thestuff[i].doit(mouseX, mouseY);
      if(thestuff[i].killme==1) {
        thestuff.splice(i, 1);
        if(thenum[i] == 0){
          calcur = calcur + 91;
          curfood = "Whole Egg";
        }
        if(thenum[i] == 1){
          calcur = calcur + 64;
          curfood = "Toast (White)";
        }
        if(thenum[i] == 2){
          calcur = calcur + 103;
          curfood = "Pork Bacon";
        }
        if(thenum[i] == 3){
          calcur = calcur + 229;
          curfood = "Pork Sausage";
        }
        if(thenum[i] == 4){
          calcur = calcur + 110;
          curfood = "Shredded Cheese";
        }
        if(thenum[i] == 5){
          calcur = calcur + 112;
          curfood = "Orange Juice";
        }
        if(thenum[i] == 6){
          calcur = calcur + 102;
          curfood = "Lowfat Milk";
        }
        if(thenum[i] == 7){
          calcur = calcur + 120;
          curfood = "English Muffin";
        }
        if(thenum[i] == 8){
          calcur = calcur + 350;
          curfood = "Bagel";
        }
        if(thenum[i] == 9){
          calcur = calcur + 105;
          curfood = "Banana";
        }
        if(thenum[i] == 10){
          calcur = calcur + 49;
          curfood = "Strawberry"
        }
        if(thenum[i] == 11){
          calcur = calcur + 116;
          curfood = "Apple"
        }
        thenum.splice(i, 1);
      }
    }
  }
  else
  {
    fill(255, 0, 255);
    text("PAUSED!!!!!!!", 400, 600);
  }
  
  resetMatrix();
  textSize(24);
  if(calcur>=1500) {
    fill(255, 0, 0);
    text("YOU WON!!!!", width/2, height/2);
    text("TOTAL CALORIES: " + str(calcur), width/2, height/2 + 25)
    countdown=30;
    if(playwinsound==false) {
      playwinsound=true;
    }
  } else
  {
    fill(0);
    //text("FOOD REMAINING: " + thestuff.length, 20, 20);
    text("CURRENT FOOD: " + curfood + "!", 20, 20)
    text("CURRENT CALORIES: " + str(calcur),20, 45);
    text("CALORIE GOAL: 1500", 20, 70);
    text("TIME REMAINING: " + floor(countdown), 20, 95);
  }
  
}


function keyPressed()
{
  if(key=='P') isRunning = !isRunning;
  if(key=='N') gameOver();
}

function gameOver() {
  playwinsound=false;
  countdown = 30;
  thestuff = new Array(50);
  for(var i =0;i<thestuff.length;i++)
  {
    thestuff[i] = new FoodDraw(foodPics);
  }
}

// THIS IS A CLASS:
// assign this to a variable and it'll make it an OBJECT
// e.g. var foo = new Circle();
// you can declare any function as an object
var FoodDraw = function(_p)
{
  // these are properties:
  this.pic = _p;
  this.x = random(width);
  this.y = random(height);
  this.d = 50;
  this.dir = -1.;
  this.v = random(0.001, 0.002);
  this.killme = 0;

  // these are methods:
  this.doit = function(_mx, _my)
  {
    
    var distance = dist(_mx, _my, this.x, this.y);
    var angle = atan2(_my-this.y, _mx-this.x);

    resetMatrix();
    translate(this.x, this.y);
    ///rotate(angle);
    image(this.pic, 0-this.d/2, 0-this.d/2, this.d, this.d);
    
    //console.log(distance);
    if(distance<25) this.killme = 1;
    
    this.x += this.dir*this.v*(distance*cos(angle));
    this.y += this.dir*this.v*(distance*sin(angle));
    
    //this.x += random(-5, 5);
    //this.y += random(-5, 5);
    if(this.x>(width-50)) this.reset();
    if(this.x<50) this.reset();
    if(this.y>(height-50)) this.reset();
    if(this.y<50) this.reset();

  }
  
};

FoodDraw.prototype.reset = function()
{
    this.x = random(width);
    this.y = random(height);
    this.v = random(0.001, 0.002);
};