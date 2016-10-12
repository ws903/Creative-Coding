var txt; 
var words;
var talk = new p5.Speech(); // speech synthesis object
talk.onLoad = speechLoaded;
talk.onEnd = speechFinished;

function preload() {
  txt = loadStrings('./data/txt_cooked.txt')
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  fill(255);
}

function speechFinished()
{
  background(0)
}
function speechLoaded()
{
  talk.listVoices();
  talk.setVoice('Google UK English Female');
  talk.interrupt = true;
  talk.speak(txt)
}