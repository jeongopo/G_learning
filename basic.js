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

function create() {
    this.add.image(400, 300, 'circle');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'circle');
}

function update() {
    
}