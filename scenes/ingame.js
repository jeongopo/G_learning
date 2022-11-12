import { checkPos } from "../lib/script.js";

/**
 * @author 남현정, 지수빈
 * @file 리듬게임을 진행하는 씬 코드
 */
export default class S_InGame extends Phaser.Scene {
  constructor() {
    super("inGame");
    //#region 변수정의
    this.backMusic;
    this.keyW, this.keyA, this.keyS, this.keyD, this.debugD;
    this.IsMusicOn = false;
    this.startTime;
    this.musicName;

    this.matchSound;
    this.instrument;
    this.instrumentObject;
    this.RefInGameMusic; //userdata에서 받아온 현재노래 index값
    this.musicEndTime;

    //UI 오브젝트
    this.scoreText;
    this.textEval;
    this.posText;
    this.line;
    this.back_arrow;

    this.canvasWidth = 1200;
    this.canvasHeight = 853;

    this.timearr = []; //노래에 맞는 노트값으로 변경
    this.notedata1 = [
      //[키,노트 타임]
      ["W", 12300],
      ["A", 14200],
      ["S", 16100],
      ["D", 18000],
      ["W", 19800],
      ["S", 21600],
      ["A", 23400],
    ];

    this.notedata2 = [
      //[키,노트 타임]
      ["A", 5500],
      ["S", 7400],
      ["D", 8400],
      ["W", 9400],
      ["D", 11400],
      ["A", 12200],
      ["S", 13200],
      ["D", 15000],
      ["A", 16000],
      ["D", 17000],
      ["S", 19000],
      ["W", 20000],
      ["S", 21000],
      ["A", 22000],
      ["W", 22700],
      ["D", 23700],
      ["S", 24700],
      ["A", 25500],
      ["W", 26400],
    ];

    this.notedata3 = [
      //[키,노트 타임]
      ["S", 2200],
      ["A", 3400],
      ["D", 4700],
      ["S", 5700],
      ["W", 7200],
      ["D", 8400],
      ["S", 9400],
      ["D", 10800],

      ["S", 11800],
      ["W", 13000],
      ["D", 14200],
      ["A", 15500],

      ["W", 16500],
      ["S", 17700],
      ["A", 18900],
      ["D", 20000],

      ["S", 21300],
      ["A", 22500],
      ["D", 23800],
      ["S", 24900],

      ["W", 26300],
      ["D", 27500],
      ["S", 28600],
      ["D", 29800],
    ];

    this.scorenumarr = [500, 300, 100]; //판정별 점수
    this.evaltextcontent = ["Perfect!", "Good!", "Bad!"]; //판정별 대사
    this.circleObjectArr = [];
    this.scoreArr = [0, 0, 0, 0];

    this.songName = [, "리듬악기 노래", "펄펄 눈이 옵니다", "작은 별"];
    this.speed = 0.5;
    this.score = 0;
    this.IsGameEnd = false;

    //#endregion

    //#region 함수정의

    /**
     * @brief 변수값들 초기화하는 함수
     */
    this.initdata = () => {
      this.IsGameEnd = false;
      this.score = 0;
      this.IsGameEnd = false;
      this.scoreArr = [0, 0, 0, 0];
    };
    /**
     * @brief 게임 시작 시의 변수 값, 오브젝트들 스폰하는 함수
     */
    this.startGame = () => {
      setTimeout(() => {
        if (this.IsGameEnd) return;
        this.backMusic.play();
        this.IsMusicOn = true;
        this.startTime = new Date();
      }, 1500);

      for (var i = 0; i < this.timearr.length; i++) {
        let tem;
        switch (this.timearr[i][0]) {
          case "W":
            tem = this.add.image(1800, 280, "C_upLeft").setScale(0.5);
            break;
          case "A":
            tem = this.add.image(1800, 280, "C_downLeft").setScale(0.5);
            break;
          case "S":
            tem = this.add.image(1800, 280, "C_upRight").setScale(0.5);

            break;
          case "D":
            tem = this.add.image(1800, 280, "C_downRight").setScale(0.5);
            break;
        }
        this.circleObjectArr.push([
          this.timearr[i][0],
          tem,
          this.timearr[i][1],
        ]);
        document.getElementById("camera_canvas").style.display = "block";
      }

      return;
    };

    /**
     * @brief W 케이스에 대해 노트 판정을 진행시키고, 오브젝트 제거하는 함수
     */
    this.push_W_Key = () => {
      for (var i = 0; i < this.circleObjectArr.length; i++) {
        if (this.circleObjectArr[i][0] == "W") {
          if (this.evaluateNote(this.circleObjectArr[i][1])) {
            this.circleObjectArr[i][1].destroy(false);
            this.circleObjectArr.splice(i, 1);
            i--;
            break;
          }
        }
      }
    };
    /**
     * @brief A 케이스에 대해 노트 판정을 진행시키고, 오브젝트 제거하는 함수
     */
    this.push_A_Key = () => {
      for (var i = 0; i < this.circleObjectArr.length; i++) {
        if (this.circleObjectArr[i][0] == "A") {
          if (this.evaluateNote(this.circleObjectArr[i][1])) {
            this.circleObjectArr[i][1].destroy(false);
            this.circleObjectArr.splice(i, 1);
            i--;
            break;
          }
        }
      }
    };
    /**
     * @brief S 케이스에 대해 노트 판정을 진행시키고, 오브젝트 제거하는 함수
     */
    this.push_S_Key = () => {
      for (var i = 0; i < this.circleObjectArr.length; i++) {
        if (this.circleObjectArr[i][0] == "S") {
          if (this.evaluateNote(this.circleObjectArr[i][1])) {
            this.circleObjectArr[i][1].destroy(false);
            this.circleObjectArr.splice(i, 1);
            i--;
            break;
          }
        }
      }
    };
    /**
     * @brief D 케이스에 대해 노트 판정을 진행시키고, 오브젝트 제거하는 함수
     */
    this.push_D_Key = () => {
      for (var i = 0; i < this.circleObjectArr.length; i++) {
        if (this.circleObjectArr[i][0] == "D") {
          if (this.evaluateNote(this.circleObjectArr[i][1])) {
            this.circleObjectArr[i][1].destroy(false);
            this.circleObjectArr.splice(i, 1);
            i--;
            break;
          }
        }
      }
    };

    /**
     * @brief 현재 게임 진행 시간 계산하여 반환하는 함수
     * @return 현재까지의 진행 시간을 int로 반환
     */
    this.inGameGetTime = () => {
      return new Date().getTime() - this.startTime.getTime();
    };

    /**
     * @brief 판정 결과를 출력하면서 점수 계산하는 함수
     * @param {int} num 0 : Perfect, 1 : Good , 2 : Bad
     */
    this.getScore = (num) => {
      this.textEval.setText(this.evaltextcontent[num]);
      this.scoreArr[num]++;
      this.score += this.scorenumarr[num];
    };

    /**
     * @brief 노트 평가하는 코드
     * @detail BAD : x > 300 or x < 100,
     * Good : x > 250 or x < 150,
     * Perfect : 150 < x < 250,
     *
     * @param {object} note 현대 평가하려는 코드
     *
     * @return 판정이 가능하면 True, 불가능하면 False
     */
    this.evaluateNote = (note) => {
      if (note.x > 300) return false;
      else if (note.x > 250) {
        this.textEval.setStyle({
          fill: "#73d481",
        });
        this.matchSound.play();
        this.getScore(1);
      } else if (note.x > 150) {
        this.textEval.setStyle({
          fill: "#23a4f6",
        });
        this.matchSound.play();
        this.getScore(0);
      } else if (note.x > 100) {
        this.textEval.setStyle({
          fill: "#73d481",
        });
        this.matchSound.play();
        this.getScore(1);
      } else {
        this.textEval.setStyle({
          fill: "#FBFF4F",
        });
        this.getScore(2);
      }
      return true;
    };

    this.getScoreArr = () => {
      return this.scoreArr;
    };
    //#endregion 함수정의
  }
  init(data) {
    this.instrument = data.instrument;
  }
  preload() {
    this.load.image("upperbar", "./assets/img/upperbar_darkpurple.png");
    this.load.image("noteline", "./assets/img/noteline.png");
    this.load.image("back_arrow", "./assets/img/back_arrow.png");

    this.load.image("C_match", "./assets/img/circle_match.png");

    this.load.image("C_downLeft", "./assets/img/donwLeft_arrow.png");
    this.load.image("C_downRight", "./assets/img/donwRight_arrow.png");
    this.load.image("C_upRight", "./assets/img/upRight_arrow.png");
    this.load.image("C_upLeft", "./assets/img/upLeft_arrow.png");

    this.load.image("tambourine", "./assets/img/instrument/tambourine.png");
    this.load.image("triangle", "./assets/img/instrument/triangle.png");
    this.load.image("castanets", "./assets/img/instrument/castanets.png");
    this.load.image("smalldrum", "./assets/img/instrument/smalldrum.png");

    this.load.audio("SE_tambourine", "./assets/sounds/SE_tambourine.mp3");
    this.load.audio("SE_triangle", "./assets/sounds/SE_triangle.mp3");
    this.load.audio("SE_castanets", "./assets/sounds/SE_castanets.mp3");
    this.load.audio("SE_smalldrum", "./assets/sounds/SE_smalldrum.mp3");

    this.load.audio("BGM1", "./assets/bgm/BGM_리듬악기연주.mp3");
    this.load.audio("BGM2", "./assets/bgm/BGM_눈.mp3");
    this.load.audio("BGM3", "./assets/bgm/BGM_작은별.mp3");
  }
  create() {
    console.log(this.instrument);
    document.getElementById("camera_canvas").style.display = "none";
    document.getElementById("phaser_canvas").childNodes[2].style.zIndex = -1;
    this.RefInGameMusic = this.scene.get("userdata").InGameMusic;
    console.log(this.RefInGameMusic);
    this.IsGameEnd = false;
    //#region 디자인

    //오브젝트 배치
    if (this.instrumentObject == null) {
      this.instrumentObject = this.add.image(1080, 700, this.instrument);
      if (this.instrument === "tambourine") {
        this.instrumentObject.setScale(0.4);
        this.instrumentObject.angle = 45;
      } else if (this.instrument === "castanets") {
        this.instrumentObject.setScale(0.8);
      } else if (this.instrument === "triangle") {
        this.instrumentObject.setScale(0.8);
      } else if (this.instrument === "smalldrum") {
        this.instrumentObject.setScale(0.9);
      }
    } else {
      this.instrumentObject.setTexture(this.instrument);
      if (this.instrument === "tambourine") {
        this.instrumentObject.setScale(0.4);
        this.instrumentObject.angle = 45;
      } else if (this.instrument === "castanets") {
        this.instrumentObject.setScale(0.8);
      } else if (this.instrument === "triangle") {
        this.instrumentObject.setScale(0.8);
      } else if (this.instrument === "smalldrum") {
        this.instrumentObject.setScale(0.9);
      }
    }

    const upperbar = this.add.image(720, 70, "upperbar").setScale(0.5);
    const noteline = this.add.image(720, 280, "noteline").setScale(0.5);
    const c_match = this.add.image(200, 280, "C_match").setScale(0.5);

    //if (this.back_arrow == null) {
    this.back_arrow = this.add
      .image(100, 70, "back_arrow")
      .setInteractive({
        cursor: "pointer",
      })
      .setScale(0.5)
      .on(
        "pointerdown",
        () => {
          this.IsGameEnd = true;
          document.getElementById("camera_canvas").style.display = "none";
          this.backMusic.stop();
          document.getElementById(
            "phaser_canvas"
          ).childNodes[2].style.zIndex = 0;
          //this.scene.sleep("ingame");
          this.scene.start("select");
        },
        this
      );
    //}

    //텍스트 배치
    if (this.textEval == null) {
      this.textEval = this.add
        .text(this.cameras.main.centerX, this.canvasHeight / 2 + 30, "", {
          fontFamily: "Noto Sans KR",
          fill: "#FBFF4F",
          fontSize: "30px",
          stroke: "#000",
          strokeThickness: 10,
        })
        .setOrigin(0.5);
    } else this.textEval.setText("");

    if (this.scoreText == null) {
      this.scoreText = this.add
        .text(1280, 73, "0 POINTS", {
          fontFamily: "Noto Sans KR",
          fill: "#FFF",
          fontSize: "35px",
          align: "left",
        })
        .setOrigin(0.5);
    } else this.scoreText.setText("0 POINTS");

    if (this.posText == null) {
      this.posText = this.add
        .text(this.cameras.main.centerX, this.cameras.main.centerY, " ", {
          fontFamily: "Noto Sans KR",
          fill: "#FBFF4F",
          fontSize: "50px",
          stroke: "#000",
          strokeThickness: 10,
        })
        .setOrigin(0.5);
    } else this.posText.setText("");

    this.initdata();

    //#endregion
    // 카메라 위치관련
    const camera = document.querySelector(".camera");
    camera.style.display = "block";
    const input_video = document.querySelector(".input_video");
    input_video.style.display = "none";
    const output_canvas = document.querySelector(".output_canvas");
    output_canvas.style =
      "position: absolute; top: 65%; left: 33%; width:30%; transform: translate(-50%,-50%); border-radius: 15px";
    this.matchSound = this.sound.add(`SE_${this.instrument}`, {
      loop: false,
      volume: 2,
    });

    //#region 노래별 세팅

    if (this.musicName == null) {
      this.musicName = this.add
        .text(
          this.cameras.main.centerX,
          70,
          this.songName[this.RefInGameMusic],
          {
            fontFamily: "Noto Sans KR",
            fill: "#FFF",
            fontSize: "50px",
            align: "center",
          }
        )
        .setOrigin(0.5);
    }
    this.musicName.setText(this.songName[this.RefInGameMusic]);

    const songName = "BGM" + this.RefInGameMusic;
    console.log(songName);
    this.backMusic = this.sound.add(songName, {
      loop: false,
    });

    switch (this.RefInGameMusic) {
      case 1:
        this.timearr = this.notedata1;
        this.musicEndTime = 30000;
        break;
      case 2:
        this.timearr = this.notedata2;
        this.musicEndTime = 31800;
        break;
      case 3:
        this.timearr = this.notedata3;
        this.musicEndTime = 34000;
    }

    //#endregion
    this.startGame();

    this.debugD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  }

  update(time, delta) {
    if (this.debugD.isDown && this.IsGameEnd != true) {
      this.scoreArr = [7, 7, 0, 0];
      this.IsGameEnd = true;
      this.scene.launch("result");
      this.IsMusicOn = false;
      document.getElementById("camera_canvas").style.display = "none";
      document.getElementById("phaser_canvas").childNodes[2].style.zIndex = 0;
      this.backMusic.stop();
    }
    if (this.keyA.isDown) {
      console.log(this.inGameGetTime());
    }
    if (this.IsMusicOn) {
      //게임 시작 되면 update 시작
      switch (checkPos) {
        case 1:
          this.push_W_Key();
          this.posText.setText("↖");
          break;
        case 2:
          this.push_A_Key();
          this.posText.setText("↙");
          break;
        case 3:
          this.push_S_Key();
          this.posText.setText("↗");
          break;
        case 4:
          this.push_D_Key();
          this.posText.setText("↘");
          break;
        default:
          this.posText.setText(" ");
          break;
      }

      for (var i = 0; i < this.circleObjectArr.length; i++) {
        // MISS아니라면 움직이기
        if (this.circleObjectArr[i][1].x < -100) {
          this.circleObjectArr[i][1].destroy(false);
          this.circleObjectArr.splice(i, 1);
          i--;
          this.textEval.setText("MISS");
          this.scoreArr[3]++;
        } else if (this.circleObjectArr[i][2] <= this.inGameGetTime()) {
          this.circleObjectArr[i][1].x -= this.speed * delta;
        }
      }
      this.scoreText.setText(this.score + " POINTS");

      if (this.inGameGetTime() > this.musicEndTime && !this.IsGameEnd) {
        console.log("노래 종료");
        this.IsGameEnd = true;
        this.scene.launch("result");
        this.IsMusicOn = false;
        document.getElementById("camera_canvas").style.display = "none";
        document.getElementById("phaser_canvas").childNodes[2].style.zIndex = 0;
        this.backMusic.stop();
      }
    }
  }
}
