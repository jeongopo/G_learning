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

let game = new Phaser.Game(config);

function preload() {
  //this.load.setBaseURL('http://jeongopo.dothome.co.kr');
  this.load.image('W_circle', "assets/circle.png");
  this.load.image('A_circle', "assets/circle2.png");
  this.load.image('S_circle', "assets/circle3.png");
  this.load.image('D_circle', "assets/circle4.png");
  this.load.image('line', "assets/line.png");
  this.load.audio('kirby', "assets/Kirby.mp3");
}

let textEval, line, music, startButton, ScoreText;
let keyW, keyA, keyS, keyD;
let speed = 3;
const timearr = [
  ['W', 300],
  ['A', 1600],
  ['S', 2900],
  ['W', 4000],
  ['W', 4400]
];
let circlearr = [];
let StartTime;
let lastTime = []; //WASD
let IsMusicOn = false;
let score = 0;
const scorenum = [500, 300, 100];
const evalTextContent = ["Perfect", "Good", "Bad"];

function create() {
  line = this.add.image(200, 300, 'line');
  this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#003366");
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  textEval = this.add.text(16, 16, '판정', {
    font: "bold 24px sans-serif",
    fill: '#FFF'
  });

  ScoreText = this.add.text(this.cameras.main.centerX, 20, '0', {
    font: "bold 24px sans-serif",
    fill: '#FFF'
  });

  startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '시작하려면 눌러주세요', {
      font: "bolder sans-serif",
      fontSize: '36px',
      fill: '#000'
    })
    .setOrigin(0.5)
    .setPadding(20)
    .setStyle({
      backgroundColor: '#FFF'
    })
    .setInteractive({
      useHandCursor: true
    })
    .on('pointerdown', startGame)
    .on('pointerover', () => startButton.setStyle({
      fill: '#003366'
    }))
    .on('pointerout', () => startButton.setStyle({
      fill: '#000'
    }));
  music = this.sound.add('kirby', {
    loop: false
  });
}

function startGame() {
  StartTime = new Date();
  lastTime[0] = new Date();
  lastTime[1] = new Date();
  lastTime[2] = new Date();
  lastTime[3] = new Date();
  IsMusicOn = true;

  startButton.destroy();
  setTimeout(() => {
    music.play();
  }, 1500);
}

function inGameGetTime() {
  return (new Date().getTime()) - StartTime.getTime();
}

function distractTime(i) {
  return (new Date().getTime()) - lastTime[i].getTime();
}

function update() {
  if (IsMusicOn) { //게임 시작 되면 update 시작
    for (var i = 0; i < timearr.length; i++) {
      if (timearr[i][1] <= inGameGetTime()) {
        console.debug(timearr[i][0] + " , " + timearr[i][1]);
        let tem;
        switch (timearr[i][0]) {
          case 'W':
            tem = this.add.image(800, 400, 'W_circle');
            break;
          case 'A':
            tem = this.add.image(800, 400, 'A_circle');
            break;
          case 'S':
            tem = this.add.image(800, 400, 'S_circle');
            break;
          case 'D':
            tem = this.add.image(800, 400, 'D_circle');
            break;
        }
        circlearr.push([timearr[i][0], tem]);
        timearr.splice(i, 1);
        i--;
        break;
      }
    }

    if (keyW.isDown) {
      if(distractTime(0)>=200)
        push_W_Key(); //W 판정
    }else if (keyA.isDown) {
      if(distractTime(1)>=200)
        push_A_Key(); //A 판정
    }else if (keyS.isDown) {
      if(distractTime(2)>=200)
      push_S_Key(); //S 판정
    }else if (keyD.isDown) {
      if(distractTime(3)>=200)
      push_D_Key(); //D 판정
    }

    for (var i = 0; i < circlearr.length; i++) { // MISS아니라면 움직이기
      if (circlearr[i][1].x < -100) {
        circlearr[i][1].destroy(false);
        circlearr.splice(i, 1);
        i--;
        textEval.setText("판정 : MISS");
      } else circlearr[i][1].x -= speed;

    }

    ScoreText.setText("점수 : " + score);
  }
}

function push_W_Key() {
  for (var i = 0; i < circlearr.length; i++) {
    if (circlearr[i][0] == "W") {
      if (evaluateNote(circlearr[i][1])) {
        circlearr[i][1].destroy(false);
        circlearr.splice(i, 1);
        i--;
        lastTime[0] = new Date();
        break;
      }
    }
  }
}

function push_A_Key() {
  for (var i = 0; i < circlearr.length; i++) {
    if (circlearr[i][0] == "A") {
      if (evaluateNote(circlearr[i][1])) {
        circlearr[i][1].destroy(false);
        circlearr.splice(i, 1);
        i--;
        lastTime[1] = new Date();
        break;
      }
    }
  }
}

function push_S_Key() {
  for (var i = 0; i < circlearr.length; i++) {
    if (circlearr[i][0] == "S") {
      if (evaluateNote(circlearr[i][1])) {
        circlearr[i][1].destroy(false);
        circlearr.splice(i, 1);
        i--;
        lastTime[2] = new Date();
        break;
      }
    }
  }
}

function push_D_Key() {
  for (var i = 0; i < circlearr.length; i++) {
    if (circlearr[i][0] == "D") {
      if (evaluateNote(circlearr[i][1])) {
        circlearr[i][1].destroy(false);
        circlearr.splice(i, 1);
        i--;
        lastTime[3] = new Date();
        break;
      }
    }
  }
}

function evaluateNote(note) {
  if (note.x > 300) return false;
  else if (note.x > 250) {
    textEval.setText("판정 : " + evalTextContent[2]);
    score += scorenum[2];
  }else if (note.x > 225) {
    textEval.setText("판정 : " + evalTextContent[1]);
    score += scorenum[1];
  }else if (note.x > 175) {
    textEval.setText("판정 : " + evalTextContent[0]);
    score += scorenum[0];
  }else if (note.x > 150) {
    textEval.setText("판정 : " + evalTextContent[1]);
    score += scorenum[1];
  }else {
    textEval.setText("판정 : " + evalTextContent[2]);
    score += scorenum[2];
  }
  return true;
}