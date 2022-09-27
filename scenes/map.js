export default class S_Map extends Phaser.Scene {
    constructor(){
        super('map');
        this.player; //플레이어 오브젝트
        this.keyW; this.keyA; this.keyS; this.keyD; //Phaser3 키 입력 리스너
        this.keyDownState; // String: 현재 입력중인 키
    }
    preload(){
        /* 캐릭터 */
        this.load.spritesheet('player1', "../assets/characters/Females/F_01_2.png",{ frameWidth : 64, frameHeight : 68});
        
        /* map */
        this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px.png");
        this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxmon-town.json");
    }
    create(){
        /* map */
        const map = this.make.tilemap({ key: "map" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tuxmon-sample-32px", "tiles");
      
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createLayer("Below Layer", tileset, 0, 0);
        const worldLayer = map.createLayer("World", tileset, 0, 0);
        const aboveLayer = map.createLayer("Above Layer", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
        aboveLayer.setDepth(10);
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        // player = this.physics.add
        // .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
        // .setSize(30, 40)
        // .setOffset(0, 24);
        

        /* 캐릭터 */
        this.player = this.physics.add.sprite(spawnPoint.x,spawnPoint.y,"player1");
        this.physics.add.collider(this.player, worldLayer);

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

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }
    update(time, delta){
        //this.player.body.setVelocity(0);

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

        
    }
}
