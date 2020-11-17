'use strict';
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}
function stopSound(sound) {
	sound.pause();
}

//공통적으로 쓰기 때문에 클래스에 정의 하지 않음
//그리고 사용자가 일일이 인자를 전달하지 않게 유용한 함수를 만든다.

export function playCarrot() {
	playSound(carrotSound);
}

export function playBug() {
	playSound(bugSound);
}
export function playAlert() {
	playSound(alertSound);
}
export function playWin() {
	playSound(winSound);
}

export function playBackground() {
	playSound(bgSound);
}

export function playStopBackground() {
	stopSound(bgSound);
}
