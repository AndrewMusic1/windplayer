//API Setup
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=53387f386bbd1eb9a07277546d1504c7';
var units = '&units=metric'; 
//City select (can accept user input)

var inputCity1; //User Can Input City
var inputCity2; 
var inputCity3; 
var inputCity4; 

var url1;
var url2;
var url3;
var url4;

var selectButton1;

var xInputPos = 120;
var xInputBox1 = xInputPos;
var xInputBox2 = xInputPos+150;
var xInputBox3 = xInputPos+300;
var xInputBox4 = xInputPos+450;
var yInputBox = 230;

//Takes wind value and converts it to notes of 1 octave
var noteVal1; 
var noteVal2;
var noteVal3;
var noteVal4;

//Sound array
var soundArray = [];

// Position for Stave and notes on stave
var xStave = 150;
var yStave = 320;
var xPosArray = [0, xStave+150, xStave+200, xStave+250, xStave+300];
//Notes SharpArray C  C#    D     D#    E    F    F#   G    G#   A    A#   B
var yPosArray = [ yStave+50, yStave+50, yStave+45, yStave+45, yStave+40 , yStave+35, yStave+35, yStave+30, yStave+30, yStave+25, yStave+25, yStave+20];
//Notes SharpArray C  C# D  D# E  F  F# G  G# A  A# B
var sharpArray = [ 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
var sharpArrayState=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


//background Graphic
var backgroundImg1;
//Stave Graphics
var clefImg;
var naturalImg;
var sharpImg;


function preload() {
  soundFormats('wav', 'mp3')
  soundArray[ 0 ] = loadSound("/assets/0-Synth2.wav");
  soundArray[ 1 ] = loadSound("/assets/1-Synth2.wav");
  soundArray[ 2 ] = loadSound("/assets/2-Synth2.wav");
  soundArray[ 3 ] = loadSound("/assets/3-Synth2.wav");
  soundArray[ 4 ] = loadSound("/assets/4-Synth2.wav");
  soundArray[ 5 ] = loadSound("/assets/5-Synth2.wav");
  soundArray[ 6 ] = loadSound("/assets/6-Synth2.wav");
  soundArray[ 7 ] = loadSound("/assets/7-Synth2.wav");
  soundArray[ 8 ] = loadSound("/assets/8-Synth2.wav");
  soundArray[ 9 ] = loadSound("/assets/9-Synth2.wav");
  soundArray[ 10 ] = loadSound("/assets/10-Synth2.wav");
  soundArray[ 11 ] = loadSound("/assets/11-Synth2.wav");


  backgroundImg1 = loadImage('/assets/Background.png')
  clefImg = loadImage('/assets/trebleClef.png');
  naturalImg = loadImage('/assets/Natural.png');
  sharpImg = loadImage('/assets/Sharp.png');
}

function setup() {
  createCanvas(1000, 1000);  
  setInterval(retrieveMetrics, 4000);
  setInterval(playTone, 5500);

  //Input for City 1
  inputCity1 = createInput('Wellington');
  inputCity1.position(xInputBox1, yInputBox+20);


  //Input for City 2
  inputCity2 = createInput('Auckland');
  inputCity2.position(xInputBox2, yInputBox+20);

  //Input for City 3
  inputCity3 = createInput('Christchurch');
  inputCity3.position(xInputBox3, yInputBox+20);

  //Input for City 4
  inputCity4 = createInput('Dunedin');
  inputCity4.position(xInputBox4, yInputBox+20);
    
  //Refresh Button
  selectButton1 = createButton('Refresh');
  selectButton1.position (720,250)
  selectButton1.mousePressed(retrieveMetrics);
  selectButton1.mousePressed(playTone);
}

function drawTitle(){
  fill(255);
  textSize(30);
  text('Live Wind Sound Generator', 25, 30);
}

function drawSubtitle(){
  fill(255);
  textSize(10);
  text('Created by Andrew Deam 2020', 675, 210);

}

function drawExplination(){
  fill(35);
  textSize(10);
  text('(Type in the name of a city below the note you would like to change)', 120, 290)

}

function NoteInformation(){
  fill(0);
  textSize(15);
  text('Note 1', xInputBox1, yInputBox);
  text('Note 2', xInputBox2, yInputBox);
  text('Note 3', xInputBox3, yInputBox);
  text('Note 4', xInputBox4, yInputBox);
}


function noteGen(){
  noteVal1 = 0;
  noteVal2 = 1;
  noteVal3 = 2;
  noteVal4 = 11;

}


function retrieveMetrics(){
 
  url1 = api + inputCity1.value() + apiKey + units;
  url2 = api + inputCity2.value() + apiKey + units;
  url3 = api + inputCity3.value() + apiKey + units;
  url4 = api + inputCity4.value() + apiKey + units;
  console.log(url4);


  loadJSON(url1, weatherData1);
  loadJSON(url2, weatherData2);
  loadJSON(url3, weatherData3);
  loadJSON(url4, weatherData4);
}

function weatherData1(dataTest1) {
  var loc1Speed = dataTest1.wind.speed; 

  if(loc1Speed < 4){
    noteVal1 = map(loc1Speed, 0, 6, 0, 2)
  }
  else if(loc1Speed >= 4 && loc1Speed <= 10){
    noteVal1 = map(loc1Speed, 6, 12, 2, 10)
  }
  else if(loc1Speed < 10){
    noteVal1 = map(loc1Speed, 12, 30, 10, 11)
  }
  noteVal1 = noteVal1.toFixed(0); 
}



function weatherData2(dataTest2) {
  var loc2Speed = dataTest2.wind.speed; 

  if(loc2Speed < 4){
    noteVal2 = map(loc2Speed, 0, 4, 0, 2)
  }
  else if(loc2Speed >= 4 && loc2Speed <= 10){
    noteVal2 = map(loc2Speed, 4, 10, 2, 8)
  }
  else if(loc2Speed < 10){
    noteVal2 = map(loc2Speed, 11, 30, 8, 11)
  }
  noteVal2 = noteVal2.toFixed(0); 
}

function weatherData3(dataTest3) {
  var loc3Speed = dataTest3.wind.speed; 

  if(loc3Speed < 5){
    noteVal3 = map(loc3Speed, 0, 5, 0, 4)
  }
  else if(loc3Speed >= 5 && loc3Speed <= 10){
    noteVal3 = map(loc3Speed, 5, 10, 5, 10)
  }
  else if(loc3Speed < 10){
    noteVal3 = map(loc3Speed, 10, 30, 10, 11)
  }
  noteVal3 = noteVal3.toFixed(0); 
}

function weatherData4(dataTest4) {
  var loc4Speed = dataTest4.wind.speed; 

  if(loc4Speed < 4){
    noteVal4 = map(loc4Speed, 0, 4, 0, 7)
  }
  else if(loc4Speed >= 4 && loc4Speed <= 10){
    noteVal4 = map(loc4Speed, 4, 10, 7, 10)
  }
  else if(loc4Speed < 10){
    noteVal4 = map(loc4Speed, 11, 30, 10, 11)
  }
  noteVal4 = noteVal4.toFixed(0); 
}



function drawAccidental(){
  if(sharpArray[noteVal1] == 1){
    fill(0);
    textSize(28);
    image(sharpImg, xPosArray[1]-30, yPosArray[noteVal1]-18 , 35, 35 );
    sharpArrayState[noteVal1-1] = 1;
  }

  //note 2
  if(sharpArray[noteVal2] == 1){
    image(sharpImg, xPosArray[2]-30, yPosArray[noteVal2]-18 , 35, 35 );
    sharpArrayState[noteVal2-1] = 1;
  }
  
  else if(sharpArray[noteVal2] == 0 && sharpArrayState[noteVal2] ==1 ){
    image(naturalImg, xPosArray[2]-27, yPosArray[noteVal2]-12, 27, 27);
    sharpArrayState[noteVal2] = 0;
  }

  //note 3
  if(sharpArray[noteVal3] == 1){
    image(sharpImg, xPosArray[3]-30, yPosArray[noteVal3]-18 , 35, 35 );
    sharpArrayState[noteVal3-1] = 1;
  }
  
  else if(sharpArray[noteVal3] == 0 && sharpArrayState[noteVal3] ==1 ){
    image(naturalImg, xPosArray[3]-33, yPosArray[noteVal3]-14, 27, 27);
    sharpArrayState[noteVal3] = 0;
  }

  //note 4
  if(sharpArray[noteVal4] == 1){
    image(sharpImg, xPosArray[4]-30, yPosArray[noteVal4]-18 , 35, 35 );
    sharpArrayState[noteVal4-1] = 1;
  }
  
  else if(sharpArray[noteVal4] == 0 && sharpArrayState[noteVal4] ==1 ){
    image(naturalImg, xPosArray[4]-33, yPosArray[noteVal4]-14, 27, 27);
    sharpArrayState[noteVal4] = 0;
  }

}

function playTone(){
  //note1
  soundArray[noteVal1].setVolume(0.8);
  soundArray[noteVal1].play();
  //note2
  soundArray[noteVal2].setVolume(0.8);
  soundArray[noteVal2].play();
  //note3
  soundArray[noteVal3].setVolume(0.8);
  soundArray[noteVal3].play();
  //note 4
  soundArray[noteVal4].setVolume(0.8);
  soundArray[noteVal4].play();
}


function drawStave(){
  //draws stave lines
  for(var i = 0; i < 5; i++){
    line (xStave, (i*10)+yStave, xStave+500, (i*10)+yStave);
  }
  //draws ledger line for Middle C if needed
  if(noteVal1 <= 1){
    line (xPosArray[1] - 12, yPosArray[0], xPosArray[1] + 12, yPosArray[0]);
  }
  if(noteVal2 <= 1){
    line (xPosArray[2] - 12, yPosArray[0], xPosArray[2] + 12, yPosArray[0]);
  }
  if(noteVal3 <= 1){
    line (xPosArray[3] - 12, yPosArray[0], xPosArray[3] + 12, yPosArray[0]);
  }
  if(noteVal4 <= 1){
    line (xPosArray[4] - 12, yPosArray[0], xPosArray[4] + 12, yPosArray[0]);
  }
}




function draw() {
  background(255); 
  image(backgroundImg1, 20, 0, 804, 342);
  drawTitle();
  drawSubtitle();
  drawExplination();
  NoteInformation();
  image(clefImg, xStave+10, yStave-15, 75, 75);
  drawAccidental();
  drawStave();
 // noteGen();
  fill(255);
  ellipse(xPosArray[1], yPosArray[noteVal1], 10, 7);
  ellipse(xPosArray[2], yPosArray[noteVal2], 10, 7);
  ellipse(xPosArray[3], yPosArray[noteVal3], 10, 7);
  ellipse(xPosArray[4], yPosArray[noteVal4], 10, 7);
}




