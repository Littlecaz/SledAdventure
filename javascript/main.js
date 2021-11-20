console.log("Javascript is runing.");

//Variables
var characterSprite;
var objectBlock, objectBlock1, objectBlock2;
var playText, playText1;
var floor;
var snow;
var scoreBoard = 0;
var scoreBoardText;

//Keycodes
const KEYCODE_SPACE = 32;

//////////////////////////onload function//////////////////////
function init() {
  console.log("body has loaded");

  //setup the createjs stage objct in the canvas element
  stage = new createjs.Stage("gameSpace");

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  //Draws the initial objects
  rawRanPix();
  scoreText();
  playTitle();
  characterAddition();
  objectAddition();
  loadAssets();

  console.log("Music playing");
  createjs.Sound.play("intro");
  createjs.Sound.volume = 0.4;
}
/////////////////////////////Play Button//////////////
function startGame() {
  //sets up the refresh rate for tween
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", onTick);

  document.getElementById("start").style.display = "none";

  createjs.Tween.get(playText).to({alpha:0}, 2000).wait(2000).to({x:90});
  createjs.Tween.get(playText1).to({alpha:0}, 2000).wait(2000).to({x:90});
}

function trackMusic() {
    createjs.Sound.play("track");
    createjs.Sound.volume = 0.2;
}
//refreshes the stage every tick
function onTick(){
  console.log("Tick");
//////////////////////makes the character move//////////////////////
  characterSprite.y += 3;

  if (characterSprite.y >= 450) {
    console.log("Game Over");
    endGameBtt()
  }
  else if (characterSprite.y <= -50) {
    characterSprite.y = 50;
  }

////////////////////////////random block movement//////////////////////
  objectBlock.x -= 3
  objectBlock1.x -= 5
  objectBlock2.x -= 6

  if (objectBlock.x <= -50) {
    objectBlock.x = 600;
    objectBlock.y = randRange(0,440);
  }

  if (objectBlock1.x <= -50) {
    objectBlock1.x = 500;
    objectBlock1.y = randRange(0,440);
  }

  if (objectBlock2.x <= -50) {
    objectBlock2.x = 580;
    objectBlock2.y = randRange(0,440);
  }

  /////////////////score///////////////////////
  scoreBoard ++;
  //update text property of score text field
  scoreBoardText.text = scoreBoard;
  //test in console for debugging
  console.log("score = " + scoreBoard);

  gameOver();
  stage.update();
}

///////////////////////////collisions//////////////////////////////
function gameOver() {
    //collide obj 1
    if (characterSprite.x > objectBlock.x &&
        characterSprite.x+70 < objectBlock.x + 110 &&
        characterSprite.y > objectBlock.y &&
        characterSprite.y+70 < objectBlock.y + 110){

          createjs.Sound.play("crash");
          createjs.Sound.volume = 0.4;


            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);


        console.log("Game Over");
        endGame()


    } else {
        console.log("Game On");
    }

    //collide obj 2
    if (characterSprite.x > objectBlock1.x &&
        characterSprite.x+ 70 < objectBlock1.x + 110 &&
        characterSprite.y > objectBlock1.y &&
        characterSprite.y+ 70 < objectBlock1.y + 110){

          createjs.Sound.play("crash");
          createjs.Sound.volume = 0.4;


            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);


        console.log("Game Over");
        endGame()

    } else {
        console.log("Game On");
    }

    //collide obj 3
    if (characterSprite.x > objectBlock2.x &&
        characterSprite.x+70 < objectBlock2.x+ 120&&
        characterSprite.y > objectBlock2.y &&
        characterSprite.y+70 < objectBlock2.y+ 120){

          createjs.Sound.play("crash");
          createjs.Sound.volume = 0.4;


            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);


        console.log("Game Over");
        endGame()

    } else {
        console.log("Game On");
    }
    //collide obj 3
    if (characterSprite.x > floor.x &&
        characterSprite.x+70 < floor.x+ 120 &&
        characterSprite.y > floor.y &&
        characterSprite.y+70 < floor.y+ 120){

            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);


        console.log("Game Over");
        endGame()

    } else {
        console.log("Game On");
    }
}

/////////////////////////////////Control Functions////////////////////////////////
function onKeyDown(e) {
    if (!e) {
        e = window.event;
    }
    console.log("Keycode of key pressed: "+e.keyCode);

    if(e.keyCode == KEYCODE_SPACE){
      characterSprite.y -= 60;
      createjs.Sound.play("jump");

      characterSprite.rotation -= 10;

    }
}

function onKeyUp(e) {
    if (!e) {
        e = window.event;
    }
    console.log("Keycode of key released: "+e.keyCode);

    if(e.keyCode == KEYCODE_SPACE){
      characterSprite.y += 3;

      characterSprite.rotation += 10;
    }
}

/////////////////////////////////Bitmap Functions ////////////////////////////////
function characterAddition() {
  console.log("Images has been added");
  characterSprite = new createjs.Bitmap("assets/character.png");
  characterSprite.x = 50;
  characterSprite.y = 50;
  characterSprite.scale = 1;

  stage.addChild(characterSprite)
}

function objectAddition() {
  console.log("Images has been added");
  objectBlock = new createjs.Bitmap("assets/iceBlock.png");
  objectBlock.x = 500;
  objectBlock.y = randRange(0,440);
  console.log(objectBlock.y);
  objectBlock.scale = .4;

  console.log("Images has been added 2");
  objectBlock1 = new createjs.Bitmap("assets/iceBlock1.png");
  objectBlock1.x = 500;
  objectBlock1.y = randRange(0,440);
  objectBlock1.scale = .4;

  console.log("Images has been added 3");
  objectBlock2 = new createjs.Bitmap("assets/iceBlock2.png");
  objectBlock2.x = 500;
  objectBlock2.y = randRange(0,440);
  objectBlock2.scale = .4;

  console.log("Floor is in place");
  floor = new createjs.Shape();
  floor.graphics.beginStroke(" ");
  floor.graphics.beginFill("#000000");
  floor.graphics.drawRect(-160, -1, 500, 2);

  floor.x = 0;
  floor.y = 455;

  stage.addChild(floor)
  stage.addChild(objectBlock)
  stage.addChild(objectBlock1)
  stage.addChild(objectBlock2)
}

/////////////////Random Number Gen////////////////////////
function randRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/////////////Sound assets///////////////////
function loadAssets() {
    console.log("Loading Assets...");

    createjs.Sound.registerSound("assets/jump.mp3", "jump");
    createjs.Sound.registerSound("assets/crash.mp3", "crash");
    createjs.Sound.registerSound("assets/intro.mp3", "intro");
    createjs.Sound.registerSound("assets/gameTrack.mp3", "track");

}
///////////////////score text////////////////
function scoreText() {
  scoreBoardText = new createjs.Text(scoreBoard, "30px Arial", "#000000");
  scoreBoardText.x = 10;
  scoreBoardText.y = 10;
  scoreBoardText.alpha = 0;

    createjs.Tween.get(scoreBoardText).to({alpha:1}, 2000).wait(1000);

  stage.addChild(scoreBoardText)
}
////////////////snow////////////////////////////
function rawRanPix(){
  //a function to create random pixels
  for(i = 1; i < 100; i++){
    snow = new createjs.Shape();
    snow.graphics.beginFill("#ffffff")
    snow.x = randRange(0,320);
    snow.y = randRange(0,455);

    snow.graphics.drawCircle(0,0,randRange(1,5))
    stage.addChild(snow);
  }
}
////////////////End Game/////////////////////////
function endGame() {
  console.log("Title has been written");
  endText = new createjs.Text("Game Over", "30px Arial", "#9E0200");
  endText.x = 95;
  endText.y = 100;
  endText.alpha = 0;

  createjs.Tween.get(endText).to({alpha:1}, 2000).wait(1000).to({x:90});

  setTimeout(() => { document.location.reload(); }, 2000);

  stage.addChild(endText);
}
function endGameBtt() {
  document.location.reload()
}
////////////////instructions/////////////
function playTitle() {
  console.log("Title has been written");
  playText = new createjs.Text("Press Play", "30px Arial", "#000000");
  playText.x = 95;
  playText.y = 100;
  playText.alpha = 1;

  console.log("Text has been written");
  playText1 = new createjs.Text("Tap SPACE to jump and avoid the ice.", "15px Arial", "#000000");
  playText1.x = 40;
  playText1.y = 150;scoreBoardText
  playText.alpha = 1;

  stage.addChild(playText)
  stage.addChild(playText1)
  stage.update();
}
