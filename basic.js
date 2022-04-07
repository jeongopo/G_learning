var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('circle', "assets/circle1.png");
}

var platforms;
var circle;
function create() {
    circle=this.add.image(0, 0, 'circle');
}

function update() {
    var cursors = this.input.keyboard.createCursorKeys();
    if(cursors.w.isDown){
        circle.setVelocityX(-160);
    }
}