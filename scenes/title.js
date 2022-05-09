import S_InGame from "./ingame.js";

export default class S_Title extends Phaser.Scene {
    constructor() {
        super({
            key: 'title',
            active: true
        });
    }

    preload() {
        this.load.image('title_back', "../assets/img/title_back.png");
        this.load.image('title_btnback', "../assets/img/title_btnback.png");
    }
    create() {
        this.add.image(600, 426, 'title_back');
        this.add.image(600, 426, 'title_btnback');
        startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'START', {
                fontFamily: "NanumSquareRoundExtraBold",
                stroke: '#FFFFFF',
                strokeThickness : 10,
                fill: '#000',
                fontSize: '55px'
            })
            .setOrigin(0.5)
            .setPadding(20)
            .setInteractive({
                useHandCursor: true
            })
            .on('pointerdown', () => {
                this.scene.start('inGame');
            })
            .on('pointerover', () => startButton.setStyle({
                fontFamily: "NanumSquareRoundExtraBold",
                stroke: '#000',
                strokeThickness : 10,
                fill: '#FFF',
                fontSize: '55px'
            }))
            .on('pointerout', () => startButton.setStyle({
                fontFamily: "NanumSquareRoundExtraBold",
                stroke: '#FFFFFF',
                strokeThickness : 10,
                fill: '#000',
                fontSize: '55px'
            }));

            
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 853,
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 0
            }
        }
    },
    backgroundColor: '#FFF',
    parent: 'phaser_canvas',
    scene : [S_Title,S_InGame]
};

var game = new Phaser.Game(config);