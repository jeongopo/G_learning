import S_InGame from "./ingame.js";
import S_Result from "./result.js";
import S_Select from "./select.js";
import S_Loading from "./loading.js";
import S_Map from "./map.js";
import S_Shop from "./shop.js";
import S_UserData from "./userdata.js";
import S_SoundManager from "./soundmanager.js";
import S_SelectInstrument from "./select_instrument.js";
export default class S_Title extends Phaser.Scene {
  constructor() {
    super({
      key: "title",
      active: true,
    });
  }

  preload() {
    this.load.image("hand", "../assets/img/hand.png");
    this.load.image("title_startBtn", "../assets/img/startBtn.png");
    this.load.image("title", "../assets/img/MGMG.png");
    // this.load.image('title_btnback', "../assets/img/title_btnback.png");
  }
  create() {
    // 타이틀씬 손 이미지
    const hand = this.add.image(750, 400, "hand");
    hand.setScale(1.3).alpha = 0.6;

    //타이틀 텍스트
    const titleText = this.add
      .image(this.cameras.main.centerX + 10, 320, "title")
      .setOrigin(0.5);

    //타이틀씬 시작버튼
    const startBtn = this.add.image(
      this.cameras.main.centerX,
      760,
      "title_startBtn"
    );
    startBtn
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(
        "pointerdown",
        (event) => {
          //this.scene.start("select");
          //this.scene.start('town');
          this.scene.get("soundmanager").playSE("CLICK");
          this.scene.get("userdata").init("USER");
          this.scene.start("map");
        },
        this
      )
      .on("pointerover", (event) => {
        startBtn.setScale(0.6);
      })
      .on("pointerout", () => startBtn.setScale(0.5));

    // 하단 설명 텍스트
    const bottomText = this.add
      .text(
        this.cameras.main.centerX,
        920,
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

const config = {
  type: Phaser.WEBGL,
  width: 1440,
  height: 1024,
  audio: {
    disableWebAudio: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
  // backgroundColor: "#E9FFB1",
  transparent: true,
  parent: "phaser_canvas",
  dom: {
    createContainer: true,
  },
  scene: [
    S_Title,
    S_InGame,
    S_Result,
    S_Select,
    S_SelectInstrument,
    S_Loading,
    S_Map,
    S_Shop,
    S_UserData,
    S_SoundManager,
  ],
};

const game = new Phaser.Game(config);
