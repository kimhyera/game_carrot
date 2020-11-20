'use strict';
//기능: 아이템들을 원래 자리에 배치하고 클릭 핸들링
const carrotSound = new Audio('./sound/carrot_pull.mp3');
import * as sound from './sound.js'; //전부다 import sound 부터

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
	carrot: 'carrot',
	bug: 'bug'
})
export  class Field {
	constructor(carrotCount, bugCount) {
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.field = document.querySelector('.game__field');
		this.fieldRect = this.field.getBoundingClientRect();
		this.field.addEventListener('click', this.onClick);
		//field 에서 아이템이 클릭이 되면 this.콜백함수가 호출
		//!!중요 자바스크립트에서는 함수로 어딘가에게 전달할때 this라는 것은 어떤 클래스안에 있는 함수를 다른 콜백으로 전달할때는 그함수가 포함되어져 있는 클래스 정보가 사라진다.그래서 클래스와 이함수를 묶을수있는 this 와 함수를 묶을수 있는 바인딩이 필요하다

		//해결: this 바인딩을 처리한다.(클래스와 바인딩처리)
		//세가지 방법
		//1. this.onClick = this.onClick.bind(this); 함수야 이클래스와 바인딩해 .
		//2.this.field.addEventListener('click', (event) => this.onClick(event));// arrow functon 사용
		//3. onClick 을 멤버변수로 반들고 onlick 은 arrow function 을 가리키고 있다.
	}
	init() {
		this.field.innerHTML = ''; // 초기화: 리셋되면서 추가되게 설정함.

		this._addItem('carrot', this.carrotCount, 'img/carrot.png');
		this._addItem('bug', this.bugCount, 'img/bug.png');
	}
	setClickListener(onItemClick) {
		this.onItemClick = onItemClick;
	}
	_addItem(className, count, imgPath) {
		//프라이빗 멤버 변수를 못만드므로 통상적으로 _언더스코어를 쓴다. _ 사용하면 외부에서 쓰면 안된다고 인식한다.
		//필드안에 범위안에서 랜덤하게
		const x1 = 0;
		const y1 = 0;
		const x2 = this.fieldRect.width - CARROT_SIZE;
		const y2 = this.fieldRect.height - CARROT_SIZE;

	

		for (let i = 0; i < count; i++) {
			const item = document.createElement('img');
			item.setAttribute('class', className);
			item.setAttribute('src', imgPath);
			item.style.position = 'absolute';

			const x = randomNumber(x1, x2);
			const y = randomNumber(y1, y2);

			item.style.left = `${x}px`;
			item.style.top = `${y}px`;
			this.field.appendChild(item);
		}
	}
	onClick = (event) => {
		const target = event.target;

		if (target.matches('.carrot')) {
			//당근
			target.remove();

			sound.playCarrot();
			this.onItemClick && this.onItemClick(ItemType.carrot);
		} else if (target.matches('.bug')) {
			sound.playBug();
			this.onItemClick && this.onItemClick(ItemType.bug);
		}
	};
}

function randomNumber(min, max) {
	//두 값 사이의 정수 난수 생성하기
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
