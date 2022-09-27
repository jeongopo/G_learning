export default class S_Town extends Phaser.Scene {
    constructor(){
      super('town');
      this.player; //플레이어 오브젝트
      this.keyW; this.keyA; this.keyS; this.keyD; //Phaser3 키 입력 리스너
      this.keyDownState; // String: 현재 입력중인 키
      this.IsRight = true; // Bool : 오른쪽을 보고 있으면 True
      this.characterNum = 1; // int: 캐릭터 스프라이트 번호
      this.coin = 0; this.coinText; // int : 유저가 가지고 있는 coin 개수

      this.changeCharacter = (num) => {
        this.player.stop();
        this.characterNum = num;
        this.player.setTexture("player"+this.characterNum);
      };
    }
  
    preload() {
        this.load.spritesheet('player1', "../assets/characters/Monsters/Pink_Monster_Walk_6.png",{ frameWidth : 32, frameHeight : 32});
        this.load.spritesheet('player2', "../assets/characters/Monsters/Owlet_Monster_Walk_6.png",{ frameWidth : 32, frameHeight : 32});
        this.load.spritesheet('player3', "../assets/characters/Monsters/Dude_Monster_Walk_6.png",{ frameWidth : 32, frameHeight : 32});
    }

    create() {
        //UI 구성
        this.coinText = this.add.text(1300,50,"Coin : " +this.coin, {
            fontFamily: "Noto Sans KR",
            fill: '#FFF',
            fontSize: '50px',
            stroke: '#7E972E',
            strokeThickness: 10,
        })
        .setOrigin(0.5);

        this.player = this.add.sprite(300,300,"player1");

        //키 입력 설정
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //캐릭터 애니메이션 설정
        this.anims.create({
            key: 'Idle_1',
            frames: this.anims.generateFrameNumbers('player1', { frames : [0]}),
            frameRate: 20,
        });

        this.anims.create({
            key: 'Walk_1',
            frames: this.anims.generateFrameNumbers('player1', { frames : [0,1,2,3,4,5]  }),
            frameRate: 30,
            repeat: -1
        });

        //Player2 캐릭터 애니메이션
        this.anims.create({
            key: 'Idle_2',
            frames: this.anims.generateFrameNumbers('player2', { frames : [0]}),
            frameRate: 20,
        });

        this.anims.create({
            key: 'Walk_2',
            frames: this.anims.generateFrameNumbers('player2', { frames : [0,1,2,3,4,5]  }),
            frameRate: 30,
            repeat: -1
        });

        //player3 캐릭터 애니메이션
        this.anims.create({
            key: 'Idle_3',
            frames: this.anims.generateFrameNumbers('player3', { frames : [0]}),
            frameRate: 20,
        });

        this.anims.create({
            key: 'Walk_3',
            frames: this.anims.generateFrameNumbers('player3', { frames : [0,1,2,3,4,5]  }),
            frameRate: 30,
            repeat: -1
        });


        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    }

    update(time, delta) {
        // 키 입력 값에 따라 애니메이션을 실행하는 코드 . 상하좌우 순서.
        if(this.keyW.isDown){ 
            if(this.keyDownState!= "W") this.player.play('Walk_'+this.characterNum);
            this.keyDownState = "W";
            this.player.y += -0.5 * delta;
        }else if(this.keyS.isDown){
            if(this.keyDownState!= "S") this.player.play('Walk_'+this.characterNum);
            this.keyDownState = "S";
            this.player.y += 0.5 * delta;
        }else if(this.keyA.isDown){
            if(this.keyDownState!= "A" ) this.player.play('Walk_'+this.characterNum);
            if(this.IsRight){
                this.player.toggleFlipX();
                this.IsRight = false;
            }
            this.keyDownState = "A";
            this.player.x += -0.5 * delta;
            
        }else if(this.keyD.isDown){
            if(this.keyDownState!= "D" ) this.player.play('Walk_'+this.characterNum);
            if(!this.IsRight) this.player.toggleFlipX();
            this.keyDownState = "D";
            this.player.x += 0.5 * delta;
            this.IsRight = true;
        }else if(this.keyW.isUp && this.keyA.isUp && this.keyS.isUp && this.keyD.isUp ) {
            this.keyDownState = "Idle";
            this.player.play('Idle_'+this.characterNum);
        }

        // 키 입력에 따라 캐릭터 이미지를 커스터마이징. (123)
        if(this.keyOne.isDown){
            this.changeCharacter(1);
        }else if(this.keyTwo.isDown){
            this.changeCharacter(2);
        }else if(this.keyThree.isDown)  this.changeCharacter(3);
        

    } //update()
}