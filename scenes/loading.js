/**
 * @author 남현정, 지수빈
 * @file 리듬게임 로딩 전 출력 코드
 */
export default class S_Loading extends Phaser.Scene {
  constructor() {
    super("loading");
    this.camera;
    this.instrument == null;

    this.startGame = () => {
      setTimeout(() => {
        this.camera.style.display = "none";
        this.scene.start("inGame", { instrument: this.instrument });
      }, 2500);
    };
  }
  init(data) {
    this.instrument = data.instrument;
  }

  preload() {
    this.load.image("hand", "../assets/img/hand.png");
    this.load.image("humanshape", "../assets/img/HumanShape.png");
  }
  create() {
    // 설명 텍스트
    const selectText = this.add
      .text(
        this.cameras.main.centerX,
        130,
        "얼굴을 화면 가운데에 위치해 주세요!",
        {
          fontFamily: "Noto Sans KR",
          fill: "#2C2340",
          fontSize: "55px",
          fontWeight: "800",
        }
      )
      .setOrigin(0.5);

    /*
    // 손 이미지
    const hand = this.add.image(this.cameras.main.centerX, 500, "hand");
    hand.setScale(1.3).alpha = 0.5;
    */

    const human = this.add
      .image(this.cameras.main.centerX, 585, "humanshape")
      .setScale(0.8)
      .setAlpha(0.8);
    this.camera = document.querySelector(".camera");
    this.camera.style.display = "block";
    const input_video = document.querySelector(".input_video");
    input_video.style.display = "none";
    const output_canvas = document.querySelector(".output_canvas");
    output_canvas.style =
      "position: absolute; top: 50%; left: 50%; width:50%; transform: translate(-50%,-40%); border-radius: 15px; opacity:0.5;";
    this.startGame();
  }
}
