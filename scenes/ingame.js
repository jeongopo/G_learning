import {checkPos} from "../lib/script.js"


export default class S_InGame extends Phaser.Scene {
    constructor() {
        super('inGame');
        //#region 변수정의
        this.line;
        this.textEval;
        this.scoreText;
        this.backMusic;
        this.keyW, this.keyA, this.keyS, this.keyD;
        this.IsMusicOn = false;
        this.startTime;
        this.musicName;
        this.emitter;

        this.canvasWidth = 1200;
        this.canvasHeight = 853;

        this.timearr = [ //[키,노트 타임]. 일단 W로만 만들어놓음
            ['W', 17000],
            ['A', 17400],
            ['W', 17800],

            ['W', 20600],
            ['W', 21000],
            ['W', 21400],

            ['W', 23400],
            ['W', 23600],
            ['W', 23800],

            ['W', 25000],
            ['W', 25200],
            ['W', 25400],

            ['W', 27800],
            ['W', 28200],
            ['W', 28600],
            // ['W', 5400],
            // ['W', 5800]
        ];
        this.scorenumarr = [500, 300, 100]; //판정별 점수
        this.evaltextcontent = ["Perfect!", "Good!", "Bad!"]; //판정별 대사
        this.circleObjectArr = [];
        this.lastTime = [];

        this.speed = 0.5;
        this.score = 0;
        //#endregion

        //#region 함수정의
        this.startGame = () => {
            this.startTime = new Date();
            this.lastTime[0] = new Date();
            this.lastTime[1] = new Date();
            this.lastTime[2] = new Date();
            this.lastTime[3] = new Date();
            this.IsMusicOn = true;

            setTimeout(() => {
                console.log("노래 시작");
                this.backMusic.play();
            }, 1500);
            return;
        };

        this.push_W_Key = () => {
            console.log("W 키 함수 실행 " + this.circleObjectArr.length);
            for (var i = 0; i < this.circleObjectArr.length; i++) {
                if (this.circleObjectArr[i][0] == "W") {
                if (this.evaluateNote(this.circleObjectArr[i][1])) {
                    this.circleObjectArr[i][1].destroy(false);
                    this.circleObjectArr.splice(i, 1);
                    i--;
                    this.lastTime[0] = new Date();
                    console.log("push_W_Key")
                    break;
                }
                }
            }
        }
        this.push_A_Key = () => {
            //console.log("A 키 함수 실행 "+this.circleObjectArr.length);

            for (var i = 0; i < this.circleObjectArr.length; i++) {
                if (this.circleObjectArr[i][0] == "A") {
                if (this.evaluateNote(this.circleObjectArr[i][1])) {
                    this.circleObjectArr[i][1].destroy(false);
                    this.circleObjectArr.splice(i, 1);
                    i--;
                    this.lastTime[1] = new Date();
                    break;
                }
                }
            }
        }
        this.push_S_Key = () => {
            //console.log("S 키 함수 실행 "+this.circleObjectArr.length);
            for (var i = 0; i < this.circleObjectArr.length; i++) {
                if (this.circleObjectArr[i][0] == "S") {
                if (this.evaluateNote(this.circleObjectArr[i][1])) {
                    this.circleObjectArr[i][1].destroy(false);
                    this.circleObjectArr.splice(i, 1);
                    i--;
                    this.lastTime[2] = new Date();
                    break;
                }
                }
            }
        }
        this.push_D_Key = () => {
            //console.log("D 키 함수 실행 "+this.circleObjectArr.length);
            for (var i = 0; i < this.circleObjectArr.length; i++) {
                if (this.circleObjectArr[i][0] == "D") {
                if (this.evaluateNote(this.circleObjectArr[i][1])) {
                    this.circleObjectArr[i][1].destroy(false);
                    this.circleObjectArr.splice(i, 1);
                    i--;
                    this.lastTime[3] = new Date();
                    break;
                }
                 }
            }
        }

        this.inGameGetTime = () => {
            return (new Date().getTime()) - this.startTime.getTime();
        }

        this.distractTime = (i) => {
            return (new Date().getTime()) - this.lastTime[i].getTime();
        }

        this.getScore = (num) => {
            this.textEval.setText(this.evaltextcontent[num]);
            this.score += this.scorenumarr[num];
        }

        this.evaluateNote = (note) => {
            if (note.x > 300) return false;
            else if (note.x > 250) {
                this.getScore(2);
            } else if (note.x > 225) {
                this.getScore(1);
            } else if (note.x > 175) {
                this.getScore(0);
            } else if (note.x > 150) {
                this.getScore(1);
            } else {
                this.getScore(2);
            }
            return true;
        }
        //#endregion 함수정의
    }

    preload() {
        this.load.image('upperbar', "./assets/img/upperbar_darkpurple.png");
        this.load.image('noteline', "./assets/img/noteline.png");
        this.load.image('back_arrow', "./assets/img/back_arrow.png");

        this.load.image('C_match', "./assets/img/circle_match.png");
        this.load.image('C_tam', "./assets/img/circle_tam.png");

        this.load.image('tambourine', "./assets/img/tambourine.png");

        this.load.audio('rhythm_music', "./assets/bgm/rhythm_music.mp3");
    }
    create() {
        console.log("create");
        //#region 디자인
        /* 그라데이션 코드로 짜려다가 실패한 부분
        var graphicsInstance = this.add.graphics();
        graphicsInstance.fillGradientStyle(0xff0000, 0xff0000, 0x0000ff, 0x0000ff, 1);

        graphics.fillCircle(300, 300, 200);

        graphicsInstance.fillGradientStyle(0xAEFAFF, 0xAEFAFF, 0xA0C6FF, 0xA0C6FF, 1);
        graphicsInstance.fillRect(0, 0, canvasWidth, canvasHeight);
        */

        //오브젝트 배치
        const upperbar = this.add.image(720, 70, 'upperbar').setScale(0.5);
        const noteline = this.add.image(720, 260, 'noteline').setScale(0.5);

        const c_match = this.add.image(200, 260, 'C_match').setScale(0.5);
        const c_tam = this.add.image(900, 600, 'C_tam').setScale(0.5);
        const tambourine = this.add.image(1080, 700, 'tambourine').setScale(0.4);
        tambourine.angle= 45;

        const back_arrow = this.add.image(100, 70, 'back_arrow').setScale(0.5);

        // 카메라 위치관련 ... 
        const camera = document.querySelector('.camera');
        camera.style.display = 'block';
        const input_video = document.querySelector('.input_video');
        input_video.style.display = 'none';
        const output_canvas = document.querySelector('.output_canvas');
        output_canvas.style = 'position: absolute; top: 65%; left: 33%; width:30%; transform: translate(-50%,-50%); border-radius: 20px';
        
        //텍스트 배치
        this.textEval = this.add.text(this.cameras.main.centerX, this.canvasHeight / 2, '', {
            fontFamily: "Noto Sans KR",
            fill: '#FBFF4F',
            fontSize: '30px',
            stroke: '#000',
            strokeThickness: 10,
        }).setOrigin(0.5);

        this.musicName = this.add.text(this.cameras.main.centerX, 70, '리듬악기 노래', {
                fontFamily: "Noto Sans KR",
                fill: '#FFF',
                fontSize: '50px',
                align: 'center'
            })
            .setOrigin(0.5);
        this.scoreText = this.add.text(this.canvasWidth+80, 73, '0 POINTS', {
                fontFamily: "Noto Sans KR",
                fill: '#FFF',
                fontSize: '35px',
                align: 'left'
            })
            .setOrigin(0.5);
        //#endregion

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);



        this.backMusic = this.sound.add('rhythm_music', {
            loop: false
        });
        this.startGame();
        this.emitter = new Phaser.Events.EventEmitter();
        this.emitter.on('PushW', () => {
            this.push_W_Key();
        }, this);

        for (var i = 0; i < this.timearr.length; i++) {
            let tem = this.add.image(1300, 260, 'C_tam').setScale(0.5);
            this.circleObjectArr.push([this.timearr[i][0], tem,this.timearr[i][1]]);
            console.log([this.timearr[i][0], tem,this.timearr[i][1]]);
        }
    }

    update(time, delta) {
        if (this.IsMusicOn) { //게임 시작 되면 update 시작
            switch(checkPos){
                case 1 :  this.push_W_Key();
                break;
                case 2 : this.push_A_Key();
                break;
                case 3 : this.push_S_Key();
                break;
                case 4: this.push_D_Key();
                break;
            }

            for (var i = 0; i < this.circleObjectArr.length; i++) { // MISS아니라면 움직이기
                if (this.circleObjectArr[i][1].x < -100) {
                    this.circleObjectArr[i][1].destroy(false);
                    this.circleObjectArr.splice(i, 1);
                    i--;
                    this.textEval.setText("MISS");
                } else if (this.circleObjectArr[i][2] <= this.inGameGetTime()) {
                    this.circleObjectArr[i][1].x -= this.speed * delta;
                }

            }
            //this.scoreText.setText(this.inGameGetTime());
            this.scoreText.setText(this.score + " POINTS");
        }
    }

}