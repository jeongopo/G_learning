import S_InGame from "./ingame.js";
import S_Result from "./result.js";

export default class S_SelectInstrument extends Phaser.Scene {
  constructor() {
    super("select_instrument");
  }

  preload() {
    this.load.image("hand", "../assets/img/hand.png");
    this.load.image("heartnote", "../assets/img/heartnote.png");
    this.load.image("select_back_arrow", "../assets/img/select_back_arrow.png");

    this.load.image("select_rhythm", "assets/img/select_rhythm.png");
    this.load.image("select_other", "assets/img/select_other.png");

    this.load.image("tambourine_btn", "assets/img/button/tambourine_btn.png");
    this.load.image("castanets_btn", "assets/img/button/castanets_btn.png");
    this.load.image("triangle_btn", "assets/img/button/triangle_btn.png");
    this.load.image("smalldrum_btn", "assets/img/button/smalldrum_btn.png");
  }
  create() {
    // 상단 MGMG 텍스트
    const titleText = this.add
      .text(this.cameras.main.centerX, 100, "MGMG", {
        fontFamily: "Noto Sans KR",
        fill: "#2C2340",
        fontSize: "80px",
        fontWeight: "bold",
      })
      .setOrigin(0.5);

    // 설명 텍스트
    const selectText = this.add
      .text(
        this.cameras.main.centerX,
        250,
        "Select the music you want to learn !",
        {
          fontFamily: "Noto Sans KR",
          fill: "#2C2340",
          fontSize: "40px",
        }
      )
      .setOrigin(0.5);

    // 뒤로가기 버튼
    const select_back_arrow = this.add.image(80, 95, "select_back_arrow");
    select_back_arrow
      .setScale(0.4)
      .setInteractive({ cursor: "pointer" })
      .on(
        "pointerdown",
        () => {
          this.scene.start("select");
        },
        this
      )
      .on("pointerover", () => select_back_arrow.setScale(0.4))
      .on("pointerout", () => select_back_arrow.setScale(0.5));

    // 손 이미지
    const hand = this.add.image(450, 500, "hand");
    hand.setScale(1.3).alpha = 0.5;

    // 하트 음표 이미지
    const heartnote = this.add.image(1000, 500, "heartnote");
    heartnote.setScale(0.5).alpha = 1.0;

    // 악기 선택버튼
    const tambourine_btn = this.add.image(
      this.cameras.main.centerX,
      380,
      "tambourine_btn"
    );
    tambourine_btn.setInteractive({ cursor: "pointer" }).on(
      "pointerdown",
      () => {
        this.scene.get('soundmanager').playSE("CLICK");
        this.scene.start("loading", { instrument: "tambourine" });
      },
      this
    );

    const castanets_btn = this.add.image(
      this.cameras.main.centerX,
      510,
      "castanets_btn"
    );
    castanets_btn.setInteractive({ cursor: "pointer" }).on(
      "pointerdown",
      () => {
        this.scene.get('soundmanager').playSE("CLICK");
        this.scene.start("loading", { instrument: "castanets" });
      },
      this
    );

    const triangle_btn = this.add.image(
      this.cameras.main.centerX,
      640,
      "triangle_btn"
    );
    triangle_btn.setInteractive({ cursor: "pointer" }).on(
      "pointerdown",
      () => {
        this.scene.get('soundmanager').playSE("CLICK");
        this.scene.start("loading", { instrument: "triangle" });
      },
      this
    );

    const smalldrum_btn = this.add.image(
      this.cameras.main.centerX,
      770,
      "smalldrum_btn"
    );
    smalldrum_btn.setInteractive({ cursor: "pointer" }).on(
      "pointerdown",
      () => {
        this.scene.get('soundmanager').playSE("CLICK");
        this.scene.start("loading", { instrument: "smalldrum" });
      },
      this
    );

    // 하단 설명 텍스트
    const bottomText = this.add
      .text(
        this.cameras.main.centerX,
        900,
        "Web environment G-learning game project based on motion recognition",
        {
          fontFamily: "Noto Sans KR",
          fill: "#2C2340",
          fontSize: "24px",
        }
      )
      .setOrigin(0.5);
  }
}
