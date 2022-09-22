export default class S_Town extends Phaser.Scene {
    constructor(){
      super('town');
      this.player; //플레이어 오브젝트
      this.keyW; this.keyA; this.keyS; this.keyD; //Phaser3 키 입력 리스너
      this.keyDownState; // String: 현재 입력중인 키
    }
  
    preload() {
        this.load.spritesheet('player1', "../assets/characters/Females/F_01_2.png",{ frameWidth : 64, frameHeight : 68});
    }

    create() {
        this.player = this.add.sprite(300,300,"player1");

        //키 입력 설정
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //캐릭터 애니메이션 설정
        this.anims.create({
            key: 'Idle',
            frames: this.anims.generateFrameNumbers('player1', { frames : [0]}),
            frameRate: 20,
        });

        this.anims.create({
            key: 'Up_W',
            frames: this.anims.generateFrameNumbers('player1', { frames : [2, 6, 10]  }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'Down_S',
            frames: this.anims.generateFrameNumbers('player1', { frames : [0, 4, 8]  }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'Left_A',
            frames: this.anims.generateFrameNumbers('player1', { frames : [3, 7, 11]  }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'Right_D',
            frames: this.anims.generateFrameNumbers('player1', { frames : [1, 5, 9]  }),
            frameRate: 8,
            repeat: -1
        });

    }

    update(time, delta) {
        // 키 입력 값에 따라 애니메이션을 실행하는 코드 . 상하좌우 순서.
        if(this.keyW.isDown){ 
            if(this.keyDownState!= "W") this.player.play('Up_W');
            this.keyDownState = "W";
            this.player.y += -0.5 * delta;
        }else if(this.keyS.isDown){
            if(this.keyDownState!= "S") this.player.play('Down_S');
            this.keyDownState = "S";
            this.player.y += 0.5 * delta;
        }else if(this.keyA.isDown){
            if(this.keyDownState!= "A" ) this.player.play('Left_A');
            this.keyDownState = "A";
            this.player.x += -0.5 * delta;

        }else if(this.keyD.isDown){
            if(this.keyDownState!= "D" ) this.player.play('Right_D');
            this.keyDownState = "D";
            this.player.x += 0.5 * delta;
        }else if(this.keyW.isUp && this.keyA.isUp && this.keyS.isUp && this.keyD.isUp ) {
            this.keyDownState = "Idle";
            this.player.play('Idle');
        }
    } //update()
}