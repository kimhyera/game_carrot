'use strict';

//게임 시작
//게임 멈춤
//완료 게임
//타이머
import {Field ,ItemType} from './field.js';
import * as sound from './sound.js'; //전부다 import sound 부터

export const Reason = Object.freeze({
	win :'win',
	lose:'lose',
	cancel: 'cancel',
})

//Builder Pattern
//1.인자가 3개 이상 넘어가는 경우 알수 없으므로 게임 빌더를 만든다.
//2. 오브젝트를 간단명료 하게 가독성이 좋게 만든다.  
//3. Game클래스는 안보이게 처리함.
export  class GameBuider{
	gameDuration(duration){
		this.gameDuration = duration;
		return this; //클래스자체를 리턴 
	}

	carrotcount(num){ 
		this.carrotcount = num;
		return this; 
	}

	bugCount(num){
		this.bugCount = num;
		return this;
	}

	build(){
		return new Game(
			this.gameDuration,//
			this.carrotcount,//
			this.bugCount
		)
	}
}
 class Game {
	constructor(gameDuration, carrotCount, bugCount) {
		//상태변수
		this.gameDuration = gameDuration;
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		//돔요소

		this.gameTimer = document.querySelector('.game__timer');
		this.gameScore = document.querySelector('.game__score');
		this.popUp = document.querySelector('.pop-up');
		this.gameBtn = document.querySelector('.game__button');

		//메서드
		this.gameBtn.addEventListener('click', () => {
			if (this.started) {
				this.stop(Reason.cancel);
			} else {
				this.start();
			}
			//started = !started;
		});
		//Field js
		this.gameField = new Field(carrotCount, bugCount);
		this.gameField.setClickListener(this.onItemClick);

		//전역변수
		this.started = false;
		this.score = 0;
		this.timer = undefined;
	}
	setGameStopListener(onGameStop) {
		//게임이 끝났을때 알려줄수 있도록 콜백을 받아오는것
		this.onGameStop = onGameStop;
	}
	start() {
		this.started = true;
		this.initGame();
		this.showStopButton();
		this.showTimerAndScore();
		this.startGameTimer();

		sound.playBackground();
	}

	stop(reason) {
		this.started = false;
		this.stopGameTimer();
		this.hideGameButton();
		sound.playStopBackground();
	
	
		this.onGameStop && this.onGameStop(reason);
	}

	onItemClick = (item) => {
		if (!this.started) return;

		if (item === ItemType.carrot) {
			this.score++;
			this.updateScoreBoard();

			if (this.score === this.carrotCount) {
				this.stop(Reason.win); //게임에서 이김
			}
		} else if (item === ItemType.bug) {
			this.stop(Reason.lose); //게임짐.
		}
	};

	showStopButton() {
		const icon = this.gameBtn.querySelector('.fas ');

		icon.classList.add('fa-stop');
		icon.classList.remove('fa-play');

		this.gameBtn.style.visibility = 'visible';
	}
	hideGameButton() {
		this.gameBtn.style.visibility = 'hidden';
	}

	showTimerAndScore() {
		this.gameTimer.style.visibility = 'visible';
		this.gameScore.style.visibility = 'visible';
	}

	startGameTimer() {
		let remainingTimeSec = this.gameDuration;
		this.updateTimerText(remainingTimeSec); //시작하기전에 업데이트 처음에는 5초부터 시작해서 하나하나 줄어갈수있도록

		//timer 나중에 중지해야하기 떄문에 전역으로 처리한다.
		this.timer = setInterval(() => {
			//꾸준하게 되는게 아니라 우리가 지정한 시간에만 되기때문에
			// 5초동안 인터벌 유지
			if (remainingTimeSec <= 0) {
				clearInterval(this.timer);

				this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose); //게임짐.
				return;
			}
			this.updateTimerText(--remainingTimeSec);
		}, 1000);
	}

	stopGameTimer() {
		clearInterval(this.timer);
	}
	updateTimerText(time) {
		const miutes = time >= 60 ? 1 : 0; //Math.floor(time / 60); //3.2 이면 정수로 만들어 주는 함수
		const seconds = time % 60;
		this.gameTimer.innerText = ` ${miutes}:${seconds}`;
	}

	refreshGame() {
		popUp.classList.add('pop-up---hide');
		this.gameBtn.style.visibility = 'visible';
		this.startGame();
	}
	initGame() {
		this.score = 0;
		this.gameScore.innerText = this.carrotCount;
		this.gameField.init();

		//
	}
	//인자로 클래스이름, 카운트 ,갯수,이미지경로 넘겨주면 여기서 포지션을 랜덤으로 생성해서 필드에다가 추가한다.

	updateScoreBoard() {
		this.gameScore.innerText = this.carrotCount - this.score;
	}
}
