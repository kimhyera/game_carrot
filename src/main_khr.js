'use strict'

//기본값
const CARROT_SIZE = 80;
const CARROT_COUNT = 7;
const BUG_COUNT = 7;
const GAME_DURATION = 7;



//노드변수
const gameButton = document.querySelector('.game__button');
const icon = gameButton.querySelector('.fas');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameField = document.querySelector('.game__field');
const popup = document.querySelector('.pop-up');
const popupRefresh = document.querySelector('.pop-up__refresh');
const popupMassage = document.querySelector('.pop-up__massage');
const bgSound = new Audio('sound/bg.mp3')
const carrotSound = new Audio('sound/carrot_pull.mp3')
const bugSound = new Audio('sound/bug_pull.mp3')
const alertSound = new Audio('sound/alert.wav')
const winSound = new Audio('sound/game_win.mp3')


//전역변수 
let started =false;
let score= 0;
let timer = undefined;



// 주요함수 
function playGame(){
    initGame();
    showGameButton();
    showTimerAndScore();
    startGameTimer();
    hidePopUp();
    //사운드 
    playSound(bgSound);

}

function stopGame(){
    stopGameTimer();
    hideGameButton();
    showPopupWithText('Restart?');
    stopSound(bgSound);
    playSound(bugSound);


}

function finishGame(win){
    stopGameTimer();
    hideGameButton();
    stopSound(bgSound);

    if(win){
        playSound(winSound)
    }else{
        playSound(bugSound)
    }
    showPopupWithText(win? `You win<i class="fas fa-kiss-wink-heart"></i>` : `You Lost <i class="fas fa-poo"></i>`);
    

}


//상세 함수
//시작
function initGame(){
	score = 0;
	gameField.innerHTML = ''; // 초기화: 리셋되면서 추가되게 설정함.
	gameScore.innerText = CARROT_COUNT;
    
    createItem('carrot', CARROT_COUNT,'img/carrot.png');
    createItem('bug',BUG_COUNT,'img/bug.png');
    
   function createItem(className, count,imgPath){
       const x = gameField.clientWidth -CARROT_SIZE;
       const y = gameField.clientHeight -CARROT_SIZE;


     for(let i =0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class',className)
        item.setAttribute('src',imgPath);
        item.style.position = 'absolute';
        item.style.left = `${Math.floor(Math.random() * x)}px`
        item.style.top = `${Math.floor(Math.random() * y)}px`
   
        gameField.appendChild(item)
     }

   }
}

function showGameButton(){
    gameButton.style.visibility ='visible'

    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');


}

function showTimerAndScore(){
    gameTimer.style.visibility ='visible';
    gameScore.style.visibility ='visible';


    
}
//타이머 인터벌 
function startGameTimer(){

    let time = GAME_DURATION;
    gameTimer.innerText = '0:0';
    timer = setInterval(function(){

        if(time <= 0){
            stopGame();
            
    showPopupWithText('You win <i class="fas fa-kiss-wink-heart"></i>');
            return
        }
        --time;

        const miutes = time >= 60 ? 1: 0; 
        const seconds = time % 60;

        gameTimer.innerText = `${miutes}:${seconds} `

        

    },1000);

    

}

function playSound(sound){
    sound.currentTime =0;
    sound.play();
}

function hidePopUp(){
    
    popup.classList.add('pop-up---hide');
}

//중지
function stopGameTimer(){
    clearInterval(timer)

}
function hideGameButton(){
    
    gameButton.style.visibility ='hidden'

}
function showPopupWithText(text){
    popup.classList.remove('pop-up---hide');
    popupMassage.innerHTML = text;

}

function stopSound(sound){
    sound.pause();
}

//게임끝남

//이벤트 리스너
gameButton.addEventListener('click',function(){
    
    if(!started){
        started = true;
        playGame();
        
    }else{
        started = false;
        stopGame();
    }
    console.log(started);
});

popupRefresh.addEventListener('click',function(){
    
    started = true;
    playGame();
})

gameField.addEventListener('click',function(event){
    if (!started) {
		return;
	}
	const target = event.target;
    console.log(target);
	if (target.matches('.carrot')) {//matches: hasClass
		//당근
		target.remove();
		score++;
        gameScore.innerText = CARROT_COUNT - score;
		playSound(carrotSound);
		console.log('CARROT_COUNT:', CARROT_COUNT, 'score:', score);
		if (score === CARROT_COUNT) {
			finishGame(true); //게임에서 이김
		}
	} else if (target.matches('.bug')) {
		finishGame(false); //게임짐
	}
})