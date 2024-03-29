import S_InGame from "./ingame.js";
import S_Result from "./result.js";

export default class S_Select extends Phaser.Scene {
  constructor() {
    super("select");
  }

  preload() {
    this.load.image("hand", "../assets/img/hand.png");
    this.load.image("heartnote", "../assets/img/heartnote.png");
    this.load.image("select_back_arrow", "../assets/img/select_back_arrow.png");

    this.load.image("select_bgm1", "assets/img/select_rhythm.png");
    this.load.image("select_bgm2", "assets/img/button/bgm2_btn.png");
    this.load.image("select_bgm3", "assets/img/button/bgm3_btn.png");
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
          this.scene.start("map");
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

    // 리듬악기노래 선택버튼
    const select_rhythm = this.add.image(
      this.cameras.main.centerX,
      420,
      "select_bgm1"
    );
    select_rhythm.setInteractive({ cursor: "pointer" }).on(
      "pointerdown",
      () => {
        //this.scene.start('loading');
        this.scene.get("soundmanager").playSE("CLICK");
        this.scene.get("userdata").InGameMusic = 1;
        this.scene.start("select_instrument");
      },
      this
    );

    // 다른 노래 선택버튼
    const select_rhythm2 = this.add.image(
      this.cameras.main.centerX,
      550,
      "select_bgm2"
    );
    select_rhythm2.setInteractive({ cursor: "pointer" }).on(
      "pointerdown",
      () => {
        //this.scene.start('loading');
        this.scene.get("soundmanager").playSE("CLICK");
        this.scene.get("userdata").InGameMusic = 2;
        this.scene.start("select_instrument");
      },
      this
    );

    const select_rhythm3 = this.add.image(
      this.cameras.main.centerX,
      680,
      "select_bgm3"
    );
    select_rhythm3.setInteractive({ cursor: "pointer" }).on(
      "pointerdown",
      () => {
        //this.scene.start('loading');
        this.scene.get("soundmanager").playSE("CLICK");
        this.scene.get("userdata").InGameMusic = 3;
        this.scene.start("select_instrument");
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
