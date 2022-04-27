import {CST} from "../CST";

export class S_Title extends Phaser.Scene {
    startButton;
    constructor() {
      super({
        key: CST.SCENES.TITLE      });
    }
    init(){
    }

    create() {
      this.startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '시작하려면 눌러주세요', {
        font: "bolder sans-serif",
        fontSize: '36px',
      })
      .setOrigin(0.5)
      .setPadding(20)
      .setStyle({
        backgroundColor: '#FFF'
      })
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', ()=>{
        this.scene.start(CST.SCENES.INGAME)
      })
      .on('pointerover', () => this.startButton.setStyle({
        fill: '#003366'
      }))
      .on('pointerout', () => this.startButton.setStyle({
        fill: '#000'
      }));
    }
    update() {
  
    }
    changeScene(){
      
    }
  }
  