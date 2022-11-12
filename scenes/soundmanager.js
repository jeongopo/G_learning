/**
 * @author 남현정
 * @class BGM, SE 출력 담당하는 클래스
 *
 **/
export default class S_SoundManager extends Phaser.Scene {
  constructor() {
    super({
      key: "soundmanager",
      active: true,
    });

    this.SE_Source = [];
    this.BGM_Source;

    this.playBGM = (key) => {
      switch (key) {
        case "map":
          this.BGM_Source.play();
          break;
      }
    };

    this.stopBGM = () => {
      this.BGM_Source.stop();
    };

    this.playSE = (key) => {
      switch (key) {
        case "CLICK":
          this.SE_Source[0].play();
          break;
        case "BACK":
          this.SE_Source[1].play();
          break;
        case "BUY":
          this.SE_Source[2].play();
          break;
        case "FINISHGAME":
          this.SE_Source[3].play();
          break;
      }
    };
  }

  preload() {
    this.load.audio("map_BGM", "./assets/bgm/BGM_Caketown.mp3");

    this.load.audio("SE_Back", "./assets/bgm/SE_Back.ogg");
    this.load.audio("SE_Select", "./assets/bgm/SE_Select.ogg");
    this.load.audio("SE_BuyItem", "./assets/bgm/SE_BuyItem.wav");
    this.load.audio("SE_FinishGame", "./assets/bgm/SE_FinishGame.ogg");
  }

  create() {
    this.BGM_Source = this.sound.add("map_BGM", {
      loop: false,
    });

    this.SE_Source.push(this.sound.add("SE_Select", { loop: false }));
    this.SE_Source.push(this.sound.add("SE_Back", { loop: false }));
    this.SE_Source.push(this.sound.add("SE_BuyItem", { loop: false }));
    this.SE_Source.push(this.sound.add("SE_FinishGame", { loop: false }));
  }
}
