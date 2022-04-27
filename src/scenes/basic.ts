import {CST} from "../CST";
import {NoteTime} from "../NoteTime";

export class S_InGame extends Phaser.Scene {
  textEval:Phaser.GameObjects.Text;
  line:Phaser.GameObjects.Image;
  ScoreText:Phaser.GameObjects.Text;
  keyW : Phaser.Input.Keyboard.Key
  keyA : Phaser.Input.Keyboard.Key;
  keyS : Phaser.Input.Keyboard.Key;
  keyD : Phaser.Input.Keyboard.Key;
  music : Phaser.Sound.BaseSound;
  circlearr;
  IsMusicOn:Boolean = false;
  score:integer = 0;
  noteTime:NoteTime;
  timearr = [
    ['W', 300],
    ['A', 1600],
    ['S', 2900],
    ['W', 4000],
    ['W', 4400]
  ];
  speed : integer = 3;
  scorenum : integer[] = [500, 300, 100];
  evalTextContent : String[] = ["Perfect", "Good", "Bad"];

  constructor() {
    super({
      key: CST.SCENES.INGAME,
      active: false
    });

    
   
  }

  init(data) {
    this.noteTime = new NoteTime();
  }
  preload() {
    this.load.image('W_circle', "assets/circle.png");
    this.load.image('A_circle', "assets/circle2.png");
    this.load.image('S_circle', "assets/circle3.png");
    this.load.image('D_circle', "assets/circle4.png");
    this.load.image('line', "assets/line.png");
    this.load.audio('kirby', "assets/Kirby.mp3");
  }
  create() {
    this.line = this.add.image(200, 300, 'line');
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#003366");
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.textEval = this.add.text(16, 16, '판정', {
      font: "bold 24px sans-serif",
    });

    this.ScoreText = this.add.text(this.cameras.main.centerX, 20, '0', {
      font: "bold 24px sans-serif",
    });

    

    this.sound.add('kirby', {loop: false});
    this.startGame();
  }



  update(time:Number, delta:Number) {

    if (this.IsMusicOn) { //게임 시작 되면 update 시작
      //#region 노트 생성  
      for (var i = 0; i < this.timearr.length; i++) {
        if (this.timearr[i][1] <= this.noteTime.inGameGetTime()) {
          let tem;
          switch (this.timearr[i][0]) {
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
          this.circlearr.push([this.timearr[i][0], tem]);
          this.timearr.splice(i, 1);
          i--;
          break;
        }
      }
      //#endregion

      //#region 키 입력 
      if (this.keyW.isDown) {
        //if (distractTime(0) >= 300)
        this.push_W_Key(); //W 판정
      } else if (this.keyA.isDown) {
        // if (distractTime(1) >= 300)
        this.push_A_Key(); //A 판정
      } else if (this.keyS.isDown) {
        //if (distractTime(2) >= 300)
        this.push_S_Key(); //S 판정
      } else if (this.keyD.isDown) {
        //if (distractTime(3) >= 300)
        this.push_D_Key(); //D 판정
      }
      //#endregion

      for (var i = 0; i < this.circlearr.length; i++) { // MISS아니라면 움직이기
        if (this.circlearr[i][1].x < -100) {
          this.circlearr[i][1].destroy(false);
          this.circlearr.splice(i, 1);
          i--;
          this.textEval.setText("판정 : MISS");
        } else this.circlearr[i][1].x -= this.speed;

      }

      this.ScoreText.setText("점수 : " + this.score);
    }
  }


  startGame() {
    this.noteTime.setStartTime();
    this.noteTime.SetLastTime(0);
    this.noteTime.SetLastTime(1);
    this.noteTime.SetLastTime(2);
    this.noteTime.SetLastTime(3);
    this.IsMusicOn = true;

    //this.startButton.destroy();
    setTimeout(() => {
      this.music.play();
    }, 1500);
  }




  push_W_Key() {
    for (var i = 0; i < this.circlearr.length; i++) {
      if (this.circlearr[i][0] == "W") {
        if (this.evaluateNote(this.circlearr[i][1])) {
          this.circlearr[i][1].destroy(false);
          this.circlearr.splice(i, 1);
          i--;
          //this.lastTime[0] = new Date();
          break;
        }
      }
    }
  }

  push_A_Key() {
    for (var i = 0; i < this.circlearr.length; i++) {
      if (this.circlearr[i][0] == "A") {
        if (this.evaluateNote(this.circlearr[i][1])) {
          this.circlearr[i][1].destroy(false);
          this.circlearr.splice(i, 1);
          i--;
          //this.lastTime[1] = new Date();
          break;
        }
      }
    }
  }

  push_S_Key() {
    for (var i = 0; i < this.circlearr.length; i++) {
      if (this.circlearr[i][0] == "S") {
        if (this.evaluateNote(this.circlearr[i][1])) {
          this.circlearr[i][1].destroy(false);
          this.circlearr.splice(i, 1);
          i--;
          //this.lastTime[2] = new Date();
          break;
        }
      }
    }
  }

  push_D_Key() {
    for (var i = 0; i < this.circlearr.length; i++) {
      if (this.circlearr[i][0] == "D") {
        if (this.evaluateNote(this.circlearr[i][1])) {
          this.circlearr[i][1].destroy(false);
          this.circlearr.splice(i, 1);
          i--;
          //his.lastTime[3] = new Date();
          break;
        }
      }
    }
  }

  evaluateNote(note) {
    if (note.x > 300) return false;
    else if (note.x > 250) {
      this.textEval.setText("판정 : " + this.evalTextContent[2]);
      this.score += this.scorenum[2];
    } else if (note.x > 225) {
      this.textEval.setText("판정 : " + this.evalTextContent[1]);
      this.score += this.scorenum[1];
    } else if (note.x > 175) {
      this.textEval.setText("판정 : " + this.evalTextContent[0]);
      this.score += this.scorenum[0];
    } else if (note.x > 150) {
      this.textEval.setText("판정 : " + this.evalTextContent[1]);
      this.score += this.scorenum[1];
    } else {
      this.textEval.setText("판정 : " + this.evalTextContent[2]);
      this.score += this.scorenum[2];
    }
    return true;
  }
}