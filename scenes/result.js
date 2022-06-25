export default class S_Result extends Phaser.Scene {

    constructor(){
        super('result');
    }

    preload() {
        this.load.image('background', "../assets/img/RESULT_back.png")

        this.load.image('retryBtn', "../assets/img/RESULT_retryBtn.png");
        this.load.image('menuBtn', "../assets/img/RESULT_menuBtn.png");
    }

    create() {
        console.log("결과창 create");
        this.add.image(720, 512, 'background');
        this.add.image(this.cameras.main.centerX-200, 700, 'retryBtn')
                .setInteractive({ cursor: 'pointer'})
                .on('pointerdown', () => {
                    this.scene.restart('inGame');;
                }, this);

        this.add.image(this.cameras.main.centerX+200, 700, 'menuBtn')
                .setInteractive({ cursor: 'pointer'})
                .on('pointerdown', () => {
                    this.scene.start('title');
                    this.scene.remove('inGame');
                    document.getElementById("camera_canvas").style.display="none";
                    this.cameras.main.fade(2000, 0, 0, 0);
                }, this);

        let scoreArr= this.scene.get('inGame').getScoreArr();
        this.add.text(this.cameras.main.centerX,380,scoreArr[0]+"\n"+scoreArr[1]+"\n"+scoreArr[2]+"\n"+scoreArr[3],{
            fontFamily: "Noto Sans KR",
            fill: '#211b31',
            fontSize: '40px',
            align: 'center'
        });

        let totalScore=scoreArr[0]*500+scoreArr[1]*300+scoreArr[2]*100;
        let grade="";
        if(totalScore>=2000)    grade="S";
        else if(totalScore>=1500) grade="A";
        else if(totalScore>=1000) grade="B";
        else {
            if(totalScore>=500) grade="C";
            else grade="F";
        }

        this.add.text(this.cameras.main.centerX+235,530,totalScore,{
            font: "bold 70px Arial",
            fill: '#FFF',
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.centerX+235,430,grade,{
            font: "bold 140px Arial",
            fill: '#ff1b83',
            align: 'center'
        }).setOrigin(0.5);;
    }

}
