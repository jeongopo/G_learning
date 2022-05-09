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

        this.canvasWidth = 1200;
        this.canvasHeight = 853;

        this.timearr = [ //[키,노트 타임]. 일단 W로만 만들어놓음
            ['W', 1500],
            ['W', 2800],
            ['W', 4200],
            ['W', 5400],
            ['W', 5800]
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
            for (var i = 0; i < this.circleObjectArr.length; i++) {
                if (this.circleObjectArr[i][0] == "W") {
                    if (this.evaluateNote(this.circleObjectArr[i][1])) {
                        this.circleObjectArr[i][1].destroy(false);
                        this.circleObjectArr.splice(i, 1);
                        i--;
                        this.lastTime[0] = new Date();
                        break;
                    }
                }
            }
        }
        this.push_A_Key = () => {
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
        this.load.image('W_circle', "../assets/img/circle.png");
        this.load.image('A_circle', "../assets/img/circle2.png");
        this.load.image('S_circle', "../assets/img/circle3.png");
        this.load.image('D_circle', "../assets/img/circle4.png");

        this.load.image('ingame_back', "../assets/img/ingame_back.png");
        this.load.image('upperbar_blue', "../assets/img/upperbar_blue.png");
        this.load.image('ingame_noteline', "../assets/img/ingame_noteline.png");
        this.load.image('backarrowbtn', "../assets/img/backarrowbtn.png");

        this.load.image('C_match', "../assets/img/C_match.png");
        this.load.image('C_tam', "../assets/img/C_tam.png");
        this.load.image('Img_tam', "../assets/img/Img_tam.png");

        this.load.audio('kirby', "../assets/bgm/Kirby.mp3");
    }
    create() {
        //#region 디자인
        /* 그라데이션 코드로 짜려다가 실패한 부분
        var graphicsInstance = this.add.graphics();
        graphicsInstance.fillGradientStyle(0xff0000, 0xff0000, 0x0000ff, 0x0000ff, 1);

        graphics.fillCircle(300, 300, 200);

        graphicsInstance.fillGradientStyle(0xAEFAFF, 0xAEFAFF, 0xA0C6FF, 0xA0C6FF, 1);
        graphicsInstance.fillRect(0, 0, canvasWidth, canvasHeight);
        */

        //오브젝트 배치
        this.add.image(600, 426, 'ingame_back');
        this.add.image(600, 60, 'upperbar_blue');
        this.add.image(600, 260, 'ingame_noteline');
        this.add.image(200, 260, 'C_match');
        this.add.image(900, 600, 'Img_tam');
        this.add.image(100, 60, 'backarrowbtn');

        //텍스트 배치
        this.textEval = this.add.text(this.cameras.main.centerX, this.canvasHeight/2, '', {
            fontFamily: "NanumSquareRoundExtraBold",
            fill: '#FBFF4F',
            fontSize: '30px',
            stroke: '#000',
            strokeThickness: 10,
        }).setOrigin(0.5);
        this.musicName = this.add.text(this.cameras.main.centerX, 60, '라데츠키 행진곡', {
                fontFamily: "NanumSquareRoundExtraBold",
                fill: '#FFF',
                fontSize: '30px',
                align: 'center'
            })
            .setOrigin(0.5);
        this.scoreText = this.add.text(this.canvasWidth-150, 60, '0 POINTS', {
                fontFamily: "NanumSquareRoundExtraBold",
                fill: '#FFF',
                fontSize: '30px',
                align: 'left'
            })
            .setOrigin(0.5);
        //#endregion

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.backMusic = this.sound.add('kirby', {
            loop: false
        });
        this.startGame();
    }



    update(time, delta) {
        if (this.IsMusicOn) { //게임 시작 되면 update 시작
            for (var i = 0; i < this.timearr.length; i++) {
                if (this.timearr[i][1] <= this.inGameGetTime()) {
                    let tem;
                    switch (this.timearr[i][0]) {
                        default:
                            tem = this.add.image(1300, 260, 'C_tam');
                            break;
                    }
                    this.circleObjectArr.push([this.timearr[i][0], tem]);
                    this.timearr.splice(i, 1);
                    i--;
                    break;
                }
            }
        }

        if (this.keyW.isDown) {
            console.log(this.inGameGetTime());
            if (this.distractTime(0) >= 200) {
                this.push_W_Key(); //W 판정
            } else if (this.keyA.isDown) {
                if (this.distractTime(1) >= 200)
                    this.push_A_Key(); //A 판정
            } else if (this.keyS.isDown) {
                if (this.distractTime(2) >= 200)
                    this.push_S_Key(); //S 판정
            } else if (this.keyD.isDown) {
                if (this.distractTime(3) >= 200)
                    this.push_D_Key(); //D 판정
            }
        }
        for (var i = 0; i < this.circleObjectArr.length; i++) { // MISS아니라면 움직이기
            if (this.circleObjectArr[i][1].x < -100) {
                this.circleObjectArr[i][1].destroy(false);
                this.circleObjectArr.splice(i, 1);
                i--;
                this.textEval.setText("MISS");
            } else this.circleObjectArr[i][1].x -= this.speed * delta;

        }

        this.scoreText.setText(this.score + " POINTS");
    }
}