import {CST} from "../CST.js";
export class S_LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.LOAD, active: true 
        })
    }
    init(){}
    preload(){
        console.debug("시작");
    }
    create(){
        this.scene.start(CST.SCENES.TITLE);
    }
}