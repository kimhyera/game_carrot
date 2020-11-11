// 지정된 시간안에 모든당근을 클릭해야 이긴다.
//당근과 벌레를 클릭하면 숫자가 줄어든다 타이머도 동작한다.  gameRestart()
//지정된 시간안에 당근을 클릭못하면  you lost 팝업이 노출한다. gameEnd() 다른팝업


//1. 기본값 과 노드변수 전역변수를 정의한다.
//2. 주요 게임 함수를 만든다. startGame, stopGame, finishGame
//3. 주요게임안에 처리해야할 함수를만든다. 
	//a.startGame 
		//아이템이 랜덤하게 배치된다. (for 루프에서 전체 해결,item을 프로퍼티를 인자로 받는다 )
		//버튼이 스탑된다.
		//timer 시작 (setInterval) : timer 전역으로 
		//bg 오디오 play
	//b.stopGame
		//timer 멈춘다.
		//버튼을 감춘다
		//showPopupWithText (문자 받아서) 팝업을 설정한다. 
	//c.finishGame
		//timer 멈춘다.
		//이겼는지 전달받은 인자(변수)로 확인한다 
		//showPopupWithText(삼항연산자로 값을 전달한다.)
		//블리언으로 체크하고 사운드설정한다.
		//오디오를 stop();
//4. 이벤트 함수 만들어서 처리함.
	//GameButton click => paly
	//refreshButton click => 초기화 play , 팝업 감춘다. 
	//field click => 상태값 전달 target값으로 블리언하여 값을 찾는다. 당근인지 버그인지 
		// 당근 카운트에 남은 당근의 값을 전달한다. 


'use strict';
//기본값
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

//노드변수
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpMassage = document.querySelector('.pop-up__massage');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

//상태변수
let started = false;
let score = 0;
let timer = undefined;


gameBtn.addEventListener('click', function () {
	if (started) {
		stopGame();
	} else {
		startGame();
	}
	//started = !started;
});

field.addEventListener('click', onFieldClick);


popUpRefresh.addEventListener('click', function () {
	startGame();
	hidePopUp();
});

function startGame() {
	started = true;
	initGame();
	showStopButton();
	showTimerAndScore();
	startGameTimer();
	playSound(bgSound);
}

function stopGame() {
	started = false;
	stopGameTimer();

	hideGameButton();

	showPopupWithText('REPLAY?');
	playSound(alertSound);
	stopSound(bgSound);
}

function finishGame(win) {
	started = false;
	hideGameButton();
	if (win) {
		playSound(winSound);
	} else {
		playSound(bugSound);
	}

	stopGameTimer();
	stopSound(bgSound);
	showPopupWithText(win ? 'YOU WON' : 'YOU LOST');

	console.log(started);
}

function showStopButton() {
	const icon = gameBtn.querySelector('.fas ');

	icon.classList.add('fa-stop');
	icon.classList.remove('fa-play');

	gameBtn.style.visibility = 'visible';
}
function hideGameButton() {
	gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
	gameTimer.style.visibility = 'visible';
	gameScore.style.visibility = 'visible';
}

function startGameTimer() {
	let remainingTimeSec = GAME_DURATION_SEC;
	updateTimerText(remainingTimeSec); //시작하기전에 업데이트 처음에는 5초부터 시작해서 하나하나 줄어갈수있도록

	//timer 나중에 중지해야하기 떄문에 전역으로 처리한다.
	timer = setInterval(function () {
		//꾸준하게 되는게 아니라 우리가 지정한 시간에만 되기때문에
		// 5초동안 인터벌 유지
		if (remainingTimeSec <= 0) {
			clearInterval(timer);

			console.log('CARROT_COUNT === score', CARROT_COUNT === score);

			finishGame(false); //게임짐.
			//finishGame(CARROT_COUNT === score); //이긴지 졌는지 인자로 확인
			return;
		}
		updateTimerText(--remainingTimeSec);
	}, 1000);
}

function stopGameTimer() {
	clearInterval(timer);
}
function updateTimerText(time) {
	const miutes = time >= 60 ? 1 : 0; //Math.floor(time / 60); //3.2 이면 정수로 만들어 주는 함수
	const seconds = time % 60;
	gameTimer.innerText = ` ${miutes}:${seconds}`;
}

function showPopupWithText(text) {
	popUpMassage.innerText = text;
	popUp.classList.remove('pop-up---hide');
}

function hidePopUp() {
	popUp.classList.add('pop-up---hide');
}
function refreshGame() {
	popUp.classList.add('pop-up---hide');
	gameBtn.style.visibility = 'visible';
	startGame();
}
function initGame() {
	score = 0;
	field.innerHTML = ''; // 초기화: 리셋되면서 추가되게 설정함.
	gameScore.innerText = CARROT_COUNT;
	//1. 벌레와 당근을 생성한뒤 field 에 추가해줌
	addItem('carrot', CARROT_COUNT, 'img/carrot.png');
	addItem('bug', BUG_COUNT, 'img/bug.png');

	//
}
//인자로 클래스이름, 카운트 ,갯수,이미지경로 넘겨주면 여기서 포지션을 랜덤으로 생성해서 필드에다가 추가한다.

function onFieldClick(event) {
	if (!started) {
		return;
	}
	const target = event.target;
	console.log(target);
	if (target.matches('.carrot')) {
		//hasClass 와 같다
		//당근
		target.remove();
		score++;
		updateScoreBoard();
		playSound(carrotSound);
		console.log('CARROT_COUNT:', CARROT_COUNT, 'score:', score);
		if (score === CARROT_COUNT) {
			finishGame(true); //게임에서 이김
		}
	} else if (target.matches('.bug')) {
		finishGame(false); //게임짐.
	}
}

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}
function stopSound(sound) {
	sound.pause();
}
function updateScoreBoard() {
	gameScore.innerText = CARROT_COUNT - score;
}
function addItem(className, count, imgPath) {
	//필드안에 범위안에서 랜덤하게
	const x1 = 0;
	const y1 = 0;
	const x2 = fieldRect.width - CARROT_SIZE;
	const y2 = fieldRect.height - CARROT_SIZE;

	//이렇게 하는거구나..;;;

	for (let i = 0; i < count; i++) {
		const item = document.createElement('img');
		item.setAttribute('class', className);
		item.setAttribute('src', imgPath);
		item.style.position = 'absolute';

		const x = randomNumber(x1, x2);
		const y = randomNumber(y1, y2);

		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		field.appendChild(item);

	}

	
	

	function randomNumber(min, max) {
		//두 값 사이의 정수 난수 생성하기
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
}


class Counter {
	constructor(runEveryFiveTimes){
		this.counter = 0;
		this.callback = runEveryFiveTimes;
	}
	increase(runIf5Times){
		this.counter++;
		console.log(this.counter)
		if(this.counter % 5 === 0){
			//5의 배수 
		
			this.callback && this.callback(this.counter);

			// if(this.callback){
			// 	this.callback(this.counter);

			// }
			

		}
	}
}



const coolCounter = new Counter();

const alertCounter = new Counter();



function pringSomething(num){
	console.log('yo',+ num);
}
function alertNum(num){
	console.log('alertNum',+ num);
}


coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
