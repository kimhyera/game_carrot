'use strict'
import {
    Field
} from './field.js'

 import {
     Popup
 } from './popup.js'

 import {
    Sound
} from './sound.js'

//obj 나중에 프로퍼티 변경 방지를 위해 처리해야할것 탐색함.

export const Reason = { 
    win : 'win',
    lose : 'lose',
    cancle : 'cancle'

}

export const itemType = {
    carrot : 'carrot',
    bug : 'bug'

}

// export const ItemType = Object.freeze({
// 	carrot: 'carrot',
// 	bug: 'bug'
// })


class Game{
    constructor(gameDuration,carrotCount,bugCount) {
        //상태변수
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        //노드변수
        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.popupMassage = document.querySelector('.pop-up__massage');
        this.btnRefresh = document.querySelector('.pop-up__refresh');
        this.field = document.querySelector('.game__field');

        //기본값
        
        this.started = false;
        this.score = 0;
        this.timer = undefined;
        
        

        //이벤트
        this.gameBtn.addEventListener('click',()=>{
            if(!this.started){
                this.start();
            }else{
                this.stop(Reason.cancel);
            }
        });
        this.btnRefresh.addEventListener('click',()=>{
            this.popup.hidePopup();
            this.start();
        })
        this.field.addEventListener('click',(event)=>{
            this.onItemClick(event);
        });


        


        //연결하기 
            this.field = new Field(this.carrotCount, this.bugCount);
        
           this.popup = new Popup();
          
            this.sound = new Sound();

    } start(){
        console.log('시작');
        this.started = true;
        
    this.score = 0;
    
		this.gameScore.innerText = this.carrotCount;
         this.field.init();// 게임 아이템 생성 
        this.btnStop(); // 버튼은 -> 스탑으로
        this.sound.playBg();
        this.setTimer();
        this.showScore();


    }

    stop(reason){
        console.log('멈춤',this.score);
        this.started = false;
        this.btnHide(); 
        clearInterval(this.timer);
        
      
        this.sound.stopBg()
        this.popup.showPopup(reason)

        

    }
    btnStop(){
        
        this.gameBtn.style.visibility = 'visible'
    
		const icon = this.gameBtn.querySelector('.fas ');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');

    } 
    btnHide(){
        this.gameBtn.style.visibility = 'hidden'
    
		const icon = this.gameBtn.querySelector('.fas ');
        icon.classList.remove('fa-stop');
        icon.classList.add('fa-play');

    }
    onItemClick(event){
       const target = event.target
        

            if(target.matches(`.${itemType.carrot}`)){
                console.log('당근');
                
        this.sound.playCarrot();
                target.remove();
                this.score++
                this.gameScore.innerText = this.carrotCount - this.score;
                if(this.score === this.carrotCount){
                    
				this.stop(Reason.win); 
                }
                
    
            }else if(target.matches(`.${itemType.bug}`)){
                console.log('벌레');
                this.sound.playBug();
                this.stop(Reason.lose);
                
                
            }
    
            
    }
    showScore(){
        this.gameScore.style.visibility = "visible";
        this.gameScore.innerText = this.carrotCount;

    }

    setTimer(){
        this.gameTimer.style.visibility= 'visible';

        
		let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec); //시작하기전에 업데이트 처음에는 5초부터 시작해서 하나하나 줄어갈수있도록

        this.timer = setInterval(() => {
			//꾸준하게 되는게 아니라 우리가 지정한 시간에만 되기때문에
			// 5초동안 인터벌 유지
			if (remainingTimeSec === 0) {
                clearInterval(this.timer);

				this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose); //게임짐.
				return;
			}
			this.updateTimerText(--remainingTimeSec);
		}, 1000);


    



        

        

    }  
  updateTimerText(time) {
        const miutes = Math.floor(time / 60); //Math.floor(time / 60); //3.2 이면 정수로 만들어 주는 함수
        const seconds = time % 60;
        this.gameTimer.innerText = ` ${miutes}:${seconds}`;
    }


    


}







      
window.onload = () => {
    new Game(5,5,5);
    }