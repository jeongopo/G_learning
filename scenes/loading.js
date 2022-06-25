export default class S_Loading extends Phaser.Scene {
  constructor(){
    super('loading');

  this.startGame = () => {
    setTimeout(() => {
      this.scene.start('inGame');
      this.scene.remove('loading')
    }, 2500);
  }
}

  preload() {
      this.load.image('hand', "../assets/img/hand.png");
  }
  create() {
    // 설명 텍스트
    const selectText = this.add.text(this.cameras.main.centerX, 150, 'Loading Hand Tracking ...', {
      fontFamily: "Noto Sans KR",
      fill: '#2C2340',
      fontSize: '50px',
    })
    .setOrigin(0.5);

    // 손 이미지
    const hand = this.add.image(this.cameras.main.centerX, 500, 'hand');
    hand.setScale(1.3)
        .alpha = 0.5;

    this.startGame();
  }
  
}