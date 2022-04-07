var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
  physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.setBaseURL('http://jeongopo.dothome.co.kr');
    this.load.image('circle', "assets/smallcircle2.png");
}

var platforms;
var circle, textEval,eval,cursors;
var key;

function create() {
    circle=this.add.image(300, 400, 'circle');
  cursors = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    textEval=this.add.text(16, 16, '판정', { font:"bold 24px sans-serif", fill: '#FFF' });
  eval="MISS";
}

function update() {
  circle.setVelocityX(3);
    if(cursors.isDown){
        console.log("W를 누름");
	eval="Perfect";
    }
  textEval.setText("판정 : "+eval);
}