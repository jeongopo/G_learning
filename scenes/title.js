import S_InGame from "./ingame.js";

export default class S_Title extends Phaser.Scene {
    constructor() {
        super({
            key: 'title',
            active: true
        });
    }

    preload() {
        this.load.image('hand', "../assets/img/hand.png")
        // this.load.image('title_back', "../assets/img/title_back.png");
        // this.load.image('title_btnback', "../assets/img/title_btnback.png");
    }
    create() {
        this.add.image(770, 512, 'hand');
        //this.add.image(600, 426, 'title_btnback');
        let titleText = this.add.text(this.cameras.main.centerX, 300, 'MGMG', {
            fontFamily: "Noto Sans KR",
            fill:'#2C2340',
            fontSize: '90px',
        })
        .setOrigin(0.5);

        titleText.fontWeight = 'bold'

        let startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY+300, 'START', {
                fontFamily: 'Noto Sans KR',
                stroke: '#FFFFFF',
                strokeThickness : 10,
                fill: '#000',
                fontSize: '75px'
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
                fontFamily: "NotoSans",
                stroke: '#000',
                strokeThickness : 10,
                fill: '#FFF',
                fontSize: '75px'
            }))
            .on('pointerout', () => startButton.setStyle({
                fontFamily: "NotoSans",
                stroke: '#FFFFFF',
                strokeThickness : 10,
                fill: '#000',
                fontSize: '75px'
            }));

            
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1440,
    height: 1024,
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
    backgroundColor: '#E9FFB1',
    parent: 'phaser_canvas',
    dom: {
        createContainer: true
    },
    scene : [S_Title,S_InGame]
};

var game = new Phaser.Game(config);
