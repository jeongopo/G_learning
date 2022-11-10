/**
 * @author 남현정
 * @file 상점 UI에서 캐릭터를 구매하고 변경하는 코드
 */
export default class S_Shop extends Phaser.Scene {
  constructor() {
    super("shop");
    this.customBtn = [];
    this.ClostBtn;
    this.Prices = [100, 300, 500];

    /**
     * @breif num 번호의 커스텀을 가지고 특정 행동이 가능한지 판단하고, 가능하다면 실행한다
     * @param {int} num 변경할 커스텀 번호
     **/
    this.checkPossibleAction = (num) => {
      if (this.scene.get("userdata").HasCustom(num) == true) {
        this.customBtn[this.scene.get("map").characterNum - 1].setText("장착");
        this.customBtn[num].setText("장착 중");
        this.scene.get("map").changeCharacter(num);
        alert("커스텀을 변경했습니다!");
      } else {
        //커스텀 구매
        if (confirm("커스텀 " + num + "번을 구매하시겠습니까?") == true) {
          if (this.scene.get("userdata").gold >= this.Prices[num]) {
            this.scene.get("userdata").BuyCustom(num, this.Prices[num]);
            this.customBtn[this.scene.get("map").characterNum - 1].setText(
              "장착"
            );
            this.customBtn[num].setText("장착 중");
            this.scene
              .get("userdata")
              .coinText.setText("💰 Coin : " + this.scene.get("userdata").gold);
            if (confirm("구매 완료! 바로 변경하시겠습니까?") == true) {
              this.scene.get("map").changeCharacter(num);
            }
          } else alert("소지중인 골드가 부족합니다!");
        }
      }
    };
  }

  preload() {
    this.load.image(
      "player1",
      "../assets/characters/Monsters/Preview/Pink_Monster_Preview.png"
    );
    this.load.image(
      "player2",
      "../assets/characters/Monsters/Preview/Owlet_Monster_Preview.png"
    );
    this.load.image(
      "player3",
      "../assets/characters/Monsters/Preview/Dude_Monster_Preview.png"
    );
    this.load.image("background", "../assets/img/SHOP_back.png");
  }

  create() {
    const background = this.add.image(750, 530, "background").setScale(0.8);
    this.customBtn = [];
    // 캐릭터 커스텀 버튼 1
    this.customBtn.push(
      this.add.text(392, 705, "장착", {
        fontFamily: "Noto Sans KR",
        fill: "#000000",
        fontSize: "48px",
        fontWeight: "bold",
        background: "FFF",
      })
    );
    this.customBtn[0]
      .setScale(0.5)
      .setInteractive({
        cursor: "pointer",
      })
      .on(
        "pointerdown",
        (event) => {
          this.checkPossibleAction(0);
        },
        this
      )
      .on("pointerover", (event) => {
        this.customBtn[0].setScale(0.6);
      })
      .on("pointerout", () => this.customBtn[0].setScale(0.5));
    this.add.image(470, 605, "player1");
    this.customBtn[0].setAlign("center");
    this.customBtn[0].setFixedSize(300, 0);

    // 캐릭터 커스텀 버튼 2
    this.customBtn.push(
      this.add.text(675, 705, "2번 구매", {
        fontFamily: "Noto Sans KR",
        fill: "#000000",
        fontSize: "50px",
        fontWeight: "bold",
        background: "FFF",
      })
    );
    this.customBtn[1]
      .setScale(0.5)
      .setInteractive({
        cursor: "pointer",
      })
      .on(
        "pointerdown",
        (event) => {
          this.checkPossibleAction(1);
        },
        this
      )
      .on("pointerover", (event) => {
        this.customBtn[1].setScale(0.6);
      })
      .on("pointerout", () => this.customBtn[1].setScale(0.5));
    this.customBtn[1].setAlign("center");
    this.customBtn[1].setFixedSize(300, 0);
    this.add.image(750, 605, "player2");

    // 캐릭터 커스텀 버튼 3
    this.customBtn.push(
      this.add.text(960, 705, "3번 구매", {
        fontFamily: "Noto Sans KR",
        fill: "#000000",
        fontSize: "50px",
        fontWeight: "bold",
        background: "FFF",
      })
    );
    this.customBtn[2]
      .setScale(0.5)
      .setInteractive({
        cursor: "pointer",
      })
      .on(
        "pointerdown",
        (event) => {
          this.checkPossibleAction(2);
        },
        this
      )
      .on("pointerover", (event) => {
        this.customBtn[2].setScale(0.6);
      })
      .on("pointerout", () => this.customBtn[2].setScale(0.5));
    this.customBtn[2].setAlign("center");
    this.customBtn[2].setFixedSize(300, 0);
    this.add.image(1035, 605, "player3");

    // 상점 닫기 버튼
    this.ClostBtn = this.add.text(1090, 305, "✖", {
      fontFamily: "Noto Sans KR",
      fill: "#ffffff",
      fontSize: "80px",
      fontWeight: "bold",
      background: "FFF",
    });
    this.ClostBtn.setScale(0.5)
      .setInteractive({
        cursor: "pointer",
      })
      .on(
        "pointerdown",
        (event) => {
          this.scene.sleep("shop");
        },
        this
      )
      .on("pointerover", (event) => {
        this.ClostBtn.setScale(0.6);
      })
      .on("pointerout", () => this.ClostBtn.setScale(0.5));

    for (var i = 0; i < 3; i++) {
      if (this.scene.get("userdata").HasCustom(i) == true)
        this.customBtn[i].setText("장착");
      else {
        this.customBtn[i].setText("💰 " + this.Prices[i]);
      }
      if (this.scene.get("map").characterNum - 1 == i)
        this.customBtn[i].setText("장착 중");
    }
  }
}
