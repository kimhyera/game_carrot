'use strict';
import PopUp from './popup.js';
import Game from './game.js';

//팝업js

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
	game.start();
});

//게임

const game = new Game(3, 2, 2);
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
