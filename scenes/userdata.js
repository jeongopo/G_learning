/**
 * @author 남현정
 * @class 유저에게 필요한 데이터 값을 저장하는 클래스 
 */
export default class S_UserData extends Phaser.Scene {
    constructor(){
        super({
            key : 'userdata',
            active : true
        });

        this.username; // string : 유저의 이름
        this.gold; // int : 유저가 가지고 있는 골드 소지량

        /**
         * @brief 유저 데이터 초기에 초기화해주는 함수
         * @detail 초기 골드 300
         * 
         * @param name 유저의 이름 string 값
         */
        this.init = (name)=>{
            this.username = name;
            this.gold = 300;
        }
    }
}