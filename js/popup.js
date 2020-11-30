'use strict'

import { Reason } from './main.js';
import {
    Sound
} from './sound.js'

export class Popup{
    constructor() {
        //변수
        this.massage = document.querySelector('.pop-up__massage');
        this.popup = document.querySelector('.pop-up');
		this.sound = new Sound();
      
    }
    showPopup(reason){
    	let message;
	   switch (reason) {
		case Reason.cancel:
			message = 'Replay? ';
			this.sound.playAlert();
			break;
		case Reason.win:
			message = 'YOU WON 😁';
			
			this.sound.playWin();
			break;
		case Reason.lose:
			message = 'YOU LOST 😓';
			this.sound.playBug();
			break;
		default:
			throw new Error('not valid reason');
	}

        this.massage.innerText = message;
        this.popup.classList.remove( 'pop-up---hide');

	}
	hidePopup(){
        this.popup.classList.add('pop-up---hide');

	}
	

}