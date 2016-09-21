// this is a comment
/*
fad
dfad
adfasdf
asdfa
comment
cool
shiet
*/

var x = 0;
var y = 0;


function setup() {
  createCanvas(800, 600);
  //background(0);
  background(random(255), random(255), random(255))

}

function draw() {
  r = random(255)
  g = random (255)
  b = random(255)
  fill(r, g, b)
  stroke(r, g, b)
  
  ellipse(x, y, 20, 20);
  
  x = x+random(-20, 20)
  y = y+random(-20, 20)
  
  if(x<0) x = width;
  if(y<0) y = height;
  if(x>width) x = 0;
  if(y>height) y = 0;

}

function keyPressed() {
  background(random(255), random(255), random(255))
}