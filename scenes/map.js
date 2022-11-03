export default class S_Map extends Phaser.Scene {
  constructor() {
    super("map");
    this.cursors;
    this.player; //플레이어 오브젝트
    this.keyW;
    this.keyA;
    this.keyS;
    this.keyD; //Phaser3 키 입력 리스너
    this.keyDownState; // String: 현재 입력중인 키
    this.characterNum = 1; // int: 캐릭터 스프라이트 번호
    this.coinText; // Text : 유저가 가지고 있는 coin 개수 Text 오브젝트
    this.ShopBtn; // Text: 상점 열기 위한 텍스트 오브젝트
    this.GameBtn;
    this.InStoreUI = false;
    this.InMusic = false;
    this.musicPoint;
    this.musicObject;
    this.storeObject;

      /**
     * @brief 특정 커스텀 번호로 캐릭터의 커스텀을 변경하는 함수
     *
     * @param {int} num 변경될 커스텀 번호
     */
       this.changeCharacter = (num) => {
        this.player.stop();
        this.characterNum = num + 1;
        this.player.setTexture("player" + this.characterNum);
        this.scene.get('userdata').UserCharacterImg.setTexture("Pre_player" + this.characterNum);
        this.scene.get("userdata").userCharacter = this.characterNum;
      };  

      this.EntryStore = ()=>{
        if(!this.InStoreUI){
          this.InStoreUI = true;
          if(confirm("상점에 입장하시겠습니까?")){
            this.scene.launch('shop');       
          }
        }
      }
      this.EntryMusic = () => {
        if(!this.InMusic){
          this.InMusic = true;
          if(confirm("음악 연주로 이동하시겠습니까?")){
            this.scene.start('select');
          }
        }
      }

  }
  preload() {
    /* map */
    this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxmon-town.json");
    /* 캐릭터 */
    this.load.spritesheet(
      "player1",
      "../assets/characters/Monsters/Pink_Monster_Walk_6.png",
      { frameWidth: 96, frameHeight: 96 }
    );
    this.load.spritesheet(
      "player2",
      "../assets/characters/Monsters/Owlet_Monster_Walk_6.png",
      { frameWidth: 96, frameHeight: 96 }
    );
    this.load.spritesheet(
      "player3",
      "../assets/characters/Monsters/Dude_Monster_Walk_6.png",
      { frameWidth: 96, frameHeight: 96 }
    );

    this.load.image("tem", "../img/RESULT_back.png");
  }
  create() {
    this.IsRight = true;

    /* map */
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tuxmon-sample-32px", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Below Layer", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Layer", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject(
      "Spawn Objects",
      (obj) => obj.name === "Spawn Point"
    );

    this.musicPoint = map.findObject(
      "Music Point",
      (obj) => obj.name === "Music Point"
    );
    if(this.musicPoint == null)  console.error("can't find \'MusicPoint\'");
    console.log(this.musicPoint);

    const storePoint = map.findObject(
      "Store Point",
      (obj) => obj.name === "Store Point"
    );
    if(storePoint == null)  console.error("can't find \'StorePoint\'");

    /* 캐릭터 */
    this.player = this.physics.add.sprite(
      spawnPoint.x,
      spawnPoint.y,
      "player" + this.characterNum
    );

    this.musicObject = this.physics.add.image(
      this.musicPoint.x,
      this.musicPoint.y,
      "tem"
    );
    this.storeObject = this.physics.add.image(
      storePoint.x,
      storePoint.y,
      "tem"
    );

    this.physics.add.collider(this.player, worldLayer);

    // //키 입력 설정
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.up);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.left);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.down);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.right);

    //캐릭터 애니메이션 설정
    this.anims.create({
      key: "Idle_1",
      frames: this.anims.generateFrameNumbers("player1", { frames: [0] }),
      frameRate: 20,
    });

    this.anims.create({
      key: "Walk_1",
      frames: this.anims.generateFrameNumbers("player1", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 30,
      repeat: -1,
    });

    //Player2 캐릭터 애니메이션
    this.anims.create({
      key: "Idle_2",
      frames: this.anims.generateFrameNumbers("player2", { frames: [0] }),
      frameRate: 20,
    });

    this.anims.create({
      key: "Walk_2",
      frames: this.anims.generateFrameNumbers("player2", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 30,
      repeat: -1,
    });

    //player3 캐릭터 애니메이션
    this.anims.create({
      key: "Idle_3",
      frames: this.anims.generateFrameNumbers("player3", { frames: [0] }),
      frameRate: 20,
    });

    this.anims.create({
      key: "Walk_3",
      frames: this.anims.generateFrameNumbers("player3", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 30,
      repeat: -1,
    });
    
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Debug graphics
    this.input.keyboard.once("keydown-D", (event) => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      worldLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      });
    });

    this.scene.get('userdata').showUserUI();
  }
  update(time, delta) {
    const speed = 300;
    const prevVelocity = this.player.body.velocity.clone();

    this.player.body.setVelocity(0);

    
    // Horizontal movement
    if (this.cursors.left.isDown) {
      if (this.keyDownState != "A")
      this.player.play("Walk_" + this.characterNum);
      if (this.IsRight) {
        this.player.toggleFlipX();
        this.IsRight = false;
      }
      this.keyDownState = "A";
      this.player.body.setVelocityX(-speed);
      this.IsRight = false;
    } else if (this.cursors.right.isDown) {
      if (this.keyDownState != "D")
        this.player.play("Walk_" + this.characterNum);
      if (!this.IsRight) this.player.toggleFlipX();
      this.keyDownState = "D";
      this.IsRight = true;
      this.player.body.setVelocityX(speed);
    }
    // Vertical movement
    else if (this.cursors.up.isDown) {
      if (this.keyDownState != "W")
        this.player.play("Walk_" + this.characterNum);
      this.player.body.setVelocityY(-speed);
      this.keyDownState = "W";
    } else if (this.cursors.down.isDown) {
      if (this.keyDownState != "S")
        this.player.play("Walk_" + this.characterNum);
      this.keyDownState = "S";
      this.player.body.setVelocityY(speed);
    }else if (
      this.keyW.isUp &&
      this.keyA.isUp &&
      this.keyS.isUp &&
      this.keyD.isUp
    ) {
      this.keyDownState = "Idle";
      this.player.play("Idle_" + this.characterNum);
    }
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);

    if(!this.physics.overlap(this.player, this.storeObject, this.EntryStore,null,this)){
      this.InStoreUI = false;
    }
    if(!this.physics.overlap(this.player,this.musicObject, this.EntryMusic, null,this)){
      this.InMusic = false;
    }
  }
}
