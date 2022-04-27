/** @type {import("./typings/phaser")} */
import * as Phaser from 'phaser';
import { S_InGame } from './scenes/basic.js';
import { S_LoadScene } from './scenes/LoadScene';
import { S_Title } from './scenes/title.js';

const game: Phaser.Game=new Phaser.Game({
    width:1000,
    height:600,
    scene:[
        S_LoadScene,S_Title,S_InGame
    ]
})