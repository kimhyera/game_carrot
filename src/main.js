'use strict';
import PopUp from './popup.js';
import GameBuider from './game.js';

//팝업js

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
	game.start();
});

//게임 체이닝 하여 처리함.

const game = new GameBuider()
.gameDuration(5)
.carrotcount(5)
.bugCount(3)
.build();

game.setGameStopListener((reason) => {
	console.log(reason);

	let message;
	switch (reason) {
		case 'cancel':
			message = 'Replay? ';
			break;
		case 'win':
			message = 'YOU WON 😁';
			break;
		case 'lose':
			message = 'YOU LOST 😓';
			break;
		default:
			throw new Error('not valid reason');
	}
	gameFinishBanner.showWithText(message);
});
