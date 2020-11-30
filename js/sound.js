'use strict'


function soundPlay(sound){
    sound.play();
     
}
function soundStop(sound){
    sound.currentTime = 0;
    sound.pause();
     
}

export class Sound{
    constructor() {
        //변수
        this.bg = new Audio('../sound/bg.mp3');
        this.alert = new Audio('../sound/alert.wav');
        this.carrot = new Audio('../sound/carrot_pull.mp3');
        this.bug = new Audio('../sound/bug_pull.mp3');
        this.win = new Audio('../sound/game_win.mp3');

    }

    playBg(){

        soundPlay(this.bg);


    }
    stopBg(){
        soundStop(this.bg);
    }

 
    playCarrot(){
        soundPlay(this.carrot);

    }

    playBug(){
        soundPlay(this.bug);

    }
    playWin(){
        soundPlay(this.win);

    }
    playAlert(){
        soundPlay(this.alert);

    }

}