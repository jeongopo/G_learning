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
  }
  preload() {
    /* map */
    this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxmon-town.json");
    /* 캐릭터 */
    this.load.spritesheet(
      "player1",
      "../assets/characters/Females/F_01_2.png",
      { frameWidth: 64, frameHeight: 68 }
    );
  }
  create() {
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
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    /* 캐릭터 */
    this.player = this.physics.add.sprite(
      spawnPoint.x,
      spawnPoint.y,
      "player1"
    );

    this.physics.add.collider(this.player, worldLayer);

    // //키 입력 설정
    // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    // this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    // this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    // this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //캐릭터 애니메이션 설정
    this.anims.create({
      key: "Idle",
      frames: this.anims.generateFrameNumbers("player1", { frames: [0] }),
      frameRate: 20,
    });

    this.anims.create({
      key: "Up_W",
      frames: this.anims.generateFrameNumbers("player1", {
        frames: [2, 6, 10],
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "Down_S",
      frames: this.anims.generateFrameNumbers("player1", { frames: [0, 4, 8] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "Left_A",
      frames: this.anims.generateFrameNumbers("player1", {
        frames: [3, 7, 11],
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "Right_D",
      frames: this.anims.generateFrameNumbers("player1", { frames: [1, 5, 9] }),
      frameRate: 8,
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
  }
  update(time, delta) {
    const speed = 300;
    const prevVelocity = this.player.body.velocity.clone();

    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play("Left_A", true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("Right_D", true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("Up_W", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("Down_S", true);
    } else {
      this.player.anims.play("Idle", true);

      // // If we were moving, pick and idle frame to use
      // if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
      // else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
      // else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
      // else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
    }
    // 키 입력 값에 따라 애니메이션을 실행하는 코드 . 상하좌우 순서.
    // if (this.keyW.isDown) {
    //   if (this.keyDownState != "W") this.player.play("Up_W");
    //   this.keyDownState = "W";
    //   this.player.y += -0.5 * delta;
    // } else if (this.keyS.isDown) {
    //   if (this.keyDownState != "S") this.player.play("Down_S");
    //   this.keyDownState = "S";
    //   this.player.y += 0.5 * delta;
    // } else if (this.keyA.isDown) {
    //   if (this.keyDownState != "A") this.player.play("Left_A");
    //   this.keyDownState = "A";
    //   this.player.x += -0.5 * delta;
    // } else if (this.keyD.isDown) {
    //   if (this.keyDownState != "D") this.player.play("Right_D");
    //   this.keyDownState = "D";
    //   this.player.x += 0.5 * delta;
    // } else if (
    //   this.keyW.isUp &&
    //   this.keyA.isUp &&
    //   this.keyS.isUp &&
    //   this.keyD.isUp
    // ) {
    //   this.keyDownState = "Idle";
    //   this.player.play("Idle");
    // }
  }
}
