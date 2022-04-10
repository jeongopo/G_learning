var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  audio: {
    disableWebAudio: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0
      }
    }
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.setBaseURL('http://jeongopo.dothome.co.kr');
  this.load.image('circle', "assets/circle.png");
  this.load.image('line', "assets/line.png");
  this.load.audio('kirby',"assets/Kirby.mp3");
}

var platforms;
var circle, textEval, eval, cursors, line, music, startButton,ScoreText ;
var speed = 3;
var timearr = [300, 1600, 2900, 4000, 4400];
var circlearr = [];
var NoteCreateIndex = 0;
var StartTime,lastTime;
var IsMusicOn = false;
var score=0;
var scorenum=[500,300,100];

function create() {
  line = this.add.image(200, 300, 'line');
  this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#003366");
  cursors = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  textEval = this.add.text(16, 16, '판정', {
    font: "bold 24px sans-serif",
    fill: '#FFF'
  });
  eval = "MISS";

ScoreText =this.add.text(this.cameras.main.centerX, 20, '0', {
    font: "bold 24px sans-serif",
    fill: '#FFF'
  });
	
  startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '시작하려면 눌러주세요', {
    font: "bolder sans-serif",
   fontSize:'36px',
    fill: '#000'
  })
    .setOrigin(0.5)
    .setPadding(20)
    .setStyle({ backgroundColor: '#FFF' })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', startGame)
    .on('pointerover', () => startButton.setStyle({ fill: '#003366' }))
    .on('pointerout', () => startButton.setStyle({ fill: '#000' }));
  music = this.sound.add('kirby',{loop:false});
}

function startGame(){
  StartTime = new Date();
  lastTime=new Date();
  IsMusicOn=true;
  startButton .destroy(); 
  setTimeout(  ()=>{music.play();},1500);
}

function inGameGetTime() {
  return (new Date().getTime()) - StartTime.getTime();
}

function distractTime(){
  return (new Date().getTime())-lastTime.getTime();
}

function update() {
  if (IsMusicOn) {
    for (var i = 0; i < timearr.length; i++) {
      if (timearr[i] <= inGameGetTime()) {
        var tem = this.add.image(800, 400, 'circle');
        circlearr.push(tem);
        timearr.splice(i, 1);
        i--;
        break;
      }
    }

    if (cursors.isDown) {
      for (var i = 0; i < circlearr.length; i++) {
        if (evaluateNote(circlearr[i])) {
          circlearr[i].destroy(false);
          circlearr.splice(i, 1);
          i--;
          textEval.setText("판정 : " + eval);
          break;
        }
      }
    }
    for (var i = 0; i < circlearr.length; i++) {
      if (circlearr[i].x < -100) {
        eval = "MISS";
        circlearr[i].destroy(false);
        circlearr.splice(i, 1);
        i--;
        textEval.setText("판정 : " + eval);
      } else circlearr[i].x -= speed;
    }
  ScoreText.setText("점수 : "+score);

  }
}


function evaluateNote(note) {
  if (note.x > 300) return false;
  else if(distractTime()<100) return false;
  else if (note.x > 250) {
    eval = "Bad";  
  score+=scorenum[2];
  } else if (note.x > 225) {
    eval = "Great";
  score+=scorenum[1];
  } else if (note.x > 175) {
    eval = "Perfect";
  score+=scorenum[0];
  } else if (note.x > 150) {
    eval = "Great";  
  score+=scorenum[1];
  } else {
    eval = "Bad";
   score+=scorenum[2];
 }
  lastTime=new Date();
  return true;
}