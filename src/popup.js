'use strict';

export default class PopUp {
	constructor() {
		this.popUp = document.querySelector('.pop-up');
		this.popUpMassage = document.querySelector('.pop-up__massage');
		this.popUpRefresh = document.querySelector('.pop-up__refresh');
		this.popUpRefresh.addEventListener('click', () => {
			this.startGame && this.startGame();
			this.hide();
		});
	}
	setClickListener(startGame) {
		this.startGame = startGame;
		//setClickListener함수는 startGame 이라는 이름의 콜백 함수를 인자로 전달 받는데
		//타입스크립트가 아니라서 함수정의 자체를 알수가 없지만 (왕불편)
		//그래서 setClickListener함수를 호출할때 콜백함수 (startGame함수를 전달해준다.)
		//인자로 전달하면 이제 팝업 클래스의 this.startGame 변수에 startGame함수가 할당되어진다.
	}

	showWithText(text) {
		this.popUpMassage.innerText = text;
		this.popUp.classList.remove('pop-up---hide');
	}
	hide() {
		this.popUp.classList.add('pop-up---hide');
	}
}
