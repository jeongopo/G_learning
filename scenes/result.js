export default class S_Result extends Phaser.Scene {
  constructor() {
    super("result");
    this.rewardGold = [0, 100, 200, 300, 400, 500];
    this.rewardEx = [0, 3, 5, 10, 15, 20];
  }

  preload() {
    this.load.image("RESULT_background", "../assets/img/RESULT_back.png");

    this.load.image("retryBtn", "../assets/img/RESULT_retryBtn.png");
    this.load.image("menuBtn", "../assets/img/RESULT_menuBtn.png");
  }

  create() {
    this.add.image(720, 512, "RESULT_background");
    this.add
      .image(this.cameras.main.centerX - 200, 700, "retryBtn")
      .setInteractive({ cursor: "pointer" })
      .on(
        "pointerdown",
        () => {
          document.getElementById("phaser_canvas").childNodes[2].style.zIndex =
            -1;
          this.scene.sleep("inGame");
          this.scene.start("select");
        },
        this
      );

    this.add
      .image(this.cameras.main.centerX + 200, 700, "menuBtn")
      .setInteractive({ cursor: "pointer" })
      .on(
        "pointerdown",
        () => {
          document.getElementById("camera_canvas").style.display = "none";
          document.getElementById(
            "phaser_canvas"
          ).childNodes[2].style.zIndex = 0;
          this.cameras.main.fade(2000, 0, 0, 0);

          this.scene.sleep("inGame");
          this.scene.start("map");
          this.scene.wake("userdata");
        },
        this
      );

    let scoreArr = this.scene.get("inGame").getScoreArr();
    this.add.text(
      this.cameras.main.centerX,
      380,
      scoreArr[0] +
        "\n" +
        scoreArr[1] +
        "\n" +
        scoreArr[2] +
        "\n" +
        scoreArr[3],
      {
        fontFamily: "Noto Sans KR",
        fill: "#211b31",
        fontSize: "40px",
        align: "center",
      }
    );

    let totalScore = scoreArr[0] * 500 + scoreArr[1] * 300 + scoreArr[2] * 100;
    let grade = "";
    let gradenum = 0;
    if (totalScore >= 2000) {
      grade = "S";
      gradenum = 4;
    } else if (totalScore >= 1500) {
      grade = "A";
      gradenum = 3;
    } else if (totalScore >= 1000) {
      grade = "B";
      gradenum = 2;
    } else {
      if (totalScore >= 500) {
        grade = "C";
        gradenum = 1;
      } else grade = "F";
    }

    this.scene
      .get("userdata")
      .GetReward(this.rewardEx[gradenum], this.rewardGold[gradenum]);

    this.add
      .text(this.cameras.main.centerX + 235, 530, totalScore, {
        font: "bold 70px Arial",
        fill: "#FFF",
      })
      .setOrigin(0.5);

    this.add
      .text(this.cameras.main.centerX + 235, 430, grade, {
        font: "bold 140px Arial",
        fill: "#ff1b83",
        align: "center",
      })
      .setOrigin(0.5);

    setTimeout(() => {
      alert(
        "경험치 " +
          this.rewardEx[gradenum] +
          ", 코인 " +
          this.rewardGold[gradenum] +
          "개를 획득했습니다!"
      );
    }, 1000);
  }
}
