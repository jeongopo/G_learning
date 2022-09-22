import S_InGame from "./ingame.js";
import S_Result from "./result.js";
import S_Select from './select.js';
import S_Loading from './loading.js';
import S_Town from './town.js';
export default class S_Title extends Phaser.Scene {
    constructor() {
        super({
            key: 'title',
            active: true
        });
    }

    preload() {
        this.load.image('hand', "../assets/img/hand.png");
        this.load.image('title_startBtn', "../assets/img/startBtn.png");
        // this.load.image('title_back', "../assets/img/title_back.png");
        // this.load.image('title_btnback', "../assets/img/title_btnback.png");
    }
    create() {
        // 타이틀씬 손 이미지
        const hand = this.add.image(750, 400, 'hand');
        hand.setScale(1.3)
            .alpha = 0.6;

        //타이틀 텍스트
        const titleText = this.add.text(this.cameras.main.centerX, 300, 'MGMG', {
            fontFamily: "Noto Sans KR",
            fill:'#2C2340',
            fontSize: '150px',
            fontWeight: 'bold',
        })
        .setOrigin(0.5);

        //타이틀씬 시작버튼
        const startBtn = this.add.image(this.cameras.main.centerX, 760, 'title_startBtn');
        startBtn.setScale(0.5)
                .setInteractive({ cursor: 'pointer'})
                .on('pointerdown', (event) => {
                    //this.scene.start('select');
                    this.scene.start('town');
                }, this)
                .on('pointerover', (event) => {
                    startBtn.setScale(0.6);
                })
                .on('pointerout', () => startBtn.setScale(0.5));

        // 하단 설명 텍스트
        const bottomText = this.add.text(this.cameras.main.centerX, 920, 'Web environment G-learning game project based on motion recognition', {
            fontFamily: "Noto Sans KR",
            fill:'#2C2340',
            fontSize: '24px',
        })
        .setOrigin(0.5);
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
    scene : [S_Title,S_InGame,S_Result,S_Select,S_Loading,S_Town]
};

const game = new Phaser.Game(config);
