/**
 * @author 남현정
 * @file 상점 UI에서 캐릭터를 구매하고 변경하는 코드
 */
export default class S_Shop extends Phaser.Scene {
    constructor() {
        super('shop');
        this.CustomBtn1, this.CustomBtn2, this.CustomBtn3;
        this.ClostBtn;
        const Prices = [ 100, 300, 500];
    }

    create() {
        // 캐릭터 커스텀 버튼 1
        if(this.CustomBtn1 == null){
            this.CustomBtn1 = this.add.text(500, 500, '1번 장착', {
                fontFamily: "Noto Sans KR",
                fill: '#000000',
                fontSize: '50px',
                fontWeight: 'bold',
                background: 'FFF'
            });
            this.CustomBtn1.setScale(0.5)
                .setInteractive({
                    cursor: 'pointer'
                })
                .on('pointerdown', (event) => {
                    this.scene.get('town').changeCharacter(1);
                }, this)
                .on('pointerover', (event) => {
                    this.CustomBtn1.setScale(0.6);
                })
                .on('pointerout', () => this.CustomBtn1.setScale(0.5));
        }
        // 캐릭터 커스텀 버튼 2
        if(this.CustomBtn2 == null){
            this.CustomBtn2 = this.add.text(600, 500, '2번 장착', {
                fontFamily: "Noto Sans KR",
                fill: '#000000',
                fontSize: '50px',
                fontWeight: 'bold',
                background: 'FFF'
            });
            this.CustomBtn2.setScale(0.5)
                .setInteractive({
                    cursor: 'pointer'
                })
                .on('pointerdown', (event) => {
                    this.scene.get('town').changeCharacter(2);
                }, this)
                .on('pointerover', (event) => {
                    this.CustomBtn2.setScale(0.6);
                })
                .on('pointerout', () => this.CustomBtn2.setScale(0.5));
        }
        // 캐릭터 커스텀 버튼 3
        if(this.CustomBtn3 == null){
            this.CustomBtn3 = this.add.text(700, 500, '3번 장착', {
                fontFamily: "Noto Sans KR",
                fill: '#000000',
                fontSize: '50px',
                fontWeight: 'bold',
                background: 'FFF'
            });
            this.CustomBtn3.setScale(0.5)
                .setInteractive({
                    cursor: 'pointer'
                })
                .on('pointerdown', (event) => {
                    this.scene.get('town').changeCharacter(3);
                }, this)
                .on('pointerover', (event) => {
                    this.CustomBtn3.setScale(0.6);
                })
                .on('pointerout', () => this.CustomBtn3.setScale(0.5));
        }
        // 상점 닫기 버튼
        if(this.ClostBtn == null){
            this.ClostBtn = this.add.text(1000, 300, 'X', {
                fontFamily: "Noto Sans KR",
                fill: '#000000',
                fontSize: '50px',
                fontWeight: 'bold',
                background: 'FFF'
            });
            this.ClostBtn.setScale(0.5)
                .setInteractive({
                    cursor: 'pointer'
                })
                .on('pointerdown', (event) => {
                    this.scene.sleep('shop');
                }, this)
                .on('pointerover', (event) => {
                    this.ClostBtn.setScale(0.6);
                })
                .on('pointerout', () => this.ClostBtn.setScale(0.5));
        }
    }
}