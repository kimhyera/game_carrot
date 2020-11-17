'use strict';
import PopUp from './popup.js';
import { GameBuider, Reason } from './game.js';


//팝업js

const gameFinishBanner = new PopUp();
//게임 체이닝 하여 처리함.

const game = new GameBuider()
.gameDuration(5)
.carrotcount(5)
.bugCount(3)
.build();

game.setGameStopListener((reason) => {

	let message;
	switch (reason) {
		case Reason.cancel:
			message = 'Replay? ';
			break;
		case Reason.win:
			message = 'YOU WON 😁';
			break;
		case Reason.lose:
			message = 'YOU LOST 😓';
			break;
		default:
			throw new Error('not valid reason');
	}
	gameFinishBanner.showWithText(message);
});


gameFinishBanner.setClickListener(() => {
	game.start();
});
