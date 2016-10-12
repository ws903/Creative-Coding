var txtlines;

function preload() {
  txtlines = loadStrings('./data/reddittxt.txt');
}

function setup() {
  console.log("there are " + txtlines.length + " lines!"); // how many lines?

  var bigstring = "";
  
  for (var i = 0; i<txtlines.length; i++)
  {
    bigstring+=txtlines[i]+" ";
  }

  bigstring = bigstring.replace(/[^a-zA-Z0-9' ]/g, " ");

  bigstring = bigstring.replace(/ '/g, " ");
  bigstring = bigstring.replace(/' /g, " "); 

  bigstring = bigstring.toLowerCase();

  bigstring = bigstring.replace(/ +/g, " ");
  bigstring = bigstring.trim();

  console.log(bigstring);

  saveStrings(bigstring, 'txt_cooked.txt');

}

function draw() {
}
