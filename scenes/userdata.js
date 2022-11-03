/**
 * @author 남현정
 * @class 유저에게 필요한 데이터 값을 저장하는 클래스
 */
export default class S_UserData extends Phaser.Scene {
  constructor() {
    super({
      key: "userdata",
      active: true,
    });

    this.username; // string : 유저의 이름
    this.gold; // int : 유저가 가지고 있는 골드 소지량
    this.userCharacter; // int : 유저가 설정한 캐릭터
    this.customdata = [true, false, false]; //bool : 유저가 커스텀을 가지고 있다면 true, 아니라면 false
    this.Experiences; // int : 유저의 누적 경험치
    this.leveldata = [0, 10, 20, 30, 40, 1000];
    this.UserLevel;
    this.UserCharacterImg;

    /**
     * @brief 유저 데이터 초기에 초기화해주는 함수
     * @detail 초기 골드 300
     *
     * @param name 유저의 이름 string 값
     */
    this.init = (name) => {
      this.username = name;
      this.gold = 300;
      this.Experiences = 0;
      this.userCharacter = 1;
    };

    this.GetUserLevel = () => {
      var level = 1;
      var sum = 0;
      for (var i = 0; i < this.leveldata.length; i++) {
        sum += this.leveldata[i];
        if (this.Experiences < sum) {
          level = i;
          break;
        }
      }
      return level;
    };

    this.HasCustom = (num) => {
      return this.customdata[num];
    };
    this.BuyCustom = (num, _gold) => {
      this.customdata[num] = true;
      this.gold -= _gold;
    };
    this.GetReward = (_ex, _gold) => {
      this.Experiences += _ex;
      this.gold += _gold;
      console.log(
        "보상획득 , EX : " +
          this.Experiences +
          ", level : " +
          this.GetUserLevel() +
          ", gold : " +
          this.gold
      );
    };

    this.showUserUI = () => {
      //if (!this.UserNameTag) {
      this.UserNameTag = this.add.image(300, 100, "TOWN_Name");
      this.characterNum = this.userCharacter;
      this.UserCharacterImg = this.add.image(
        140,
        80,
        "Pre_player" + this.characterNum
      );
      this.UserLevel = this.add.text(200, 20, this.GetUserLevel() + "레벨", {
        fontFamily: "Noto Sans KR",
        fill: "#000000",
        fontSize: "32px",
        fontWeight: "bold",
        background: "FFF",
      });

      this.UserNameText = this.add.text(230, 80, this.username, {
        fontFamily: "Noto Sans KR",
        fill: "#000000",
        fontSize: "32px",
        fontWeight: "bold",
        background: "FFF",
      });

      this.coinText = this.add
        .text(1200, 50, "💰 Coin : " + this.gold, {
          fontFamily: "Noto Sans KR",
          fill: "#FFF",
          fontSize: "40px",
          stroke: "#7E972E",
          strokeThickness: 10,
        })
        .setOrigin(0.5);
    };
    //};
  }

  preload() {
    this.load.image(
      "Pre_player1",
      "../assets/characters/Monsters/Preview/Pink_Monster_Preview.png"
    );
    this.load.image(
      "Pre_player2",
      "../assets/characters/Monsters/Preview/Owlet_Monster_Preview.png"
    );
    this.load.image(
      "Pre_player3",
      "../assets/characters/Monsters/Preview/Dude_Monster_Preview.png"
    );
    this.load.image("TOWN_Name", "../assets/img/TOWN_Name.png");
  }
}
