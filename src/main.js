'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js'; //전부다 import sound 부터
import { GameBuider, Reason } from './game.js';

const game = new GameBuider()
.gameDuration(5)
.carrotcount(5)
.bugCount(3)
.build();
//게임 체이닝 하여 처리함.

//팝업js
const gameFinishBanner = new PopUp();




game.setGameStopListener((reason) => {

	let message;
	switch (reason) {
		case Reason.cancel:
			message = 'Replay? ';
			sound.playAlert();
			break;
		case Reason.win:
			message = 'YOU WON 😁';
			sound.playWin();
			break;
		case Reason.lose:
			message = 'YOU LOST 😓';
			sound.playBug();
			break;
		default:
			throw new Error('not valid reason');
	}
	gameFinishBanner.showWithText(message);
});


gameFinishBanner.setClickListener(() => {
	game.start();
});
