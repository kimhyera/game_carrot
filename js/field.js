'use strict'


import { itemType } from './main.js';

const itemSize = 80;


export class Field{
    constructor(carrotCount,bugCount) {
        //변수
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldX = this.field.clientWidth - itemSize ;
        this.fieldY = this.field.clientHeight - itemSize;

    }
    init(){

        this.field.innerHTML = '';
        
        console.log(itemType.carrot);

        this._additem(itemType.carrot,this.carrotCount,'../img/carrot.png');
        this._additem(itemType.bug,this.bugCount,'../img/bug.png');
    }
    _additem(name,count,itemPath){

        for(let i = 0; i < count; i ++ ){
            const item = document.createElement('img');
            item.className = name;
            item.src = itemPath;
            
        item.style.position = 'absolute';
        // item.style.left = `${Math.floor(Math.random() * this.fieldX)}px`
        // item.style.top = `${Math.floor(Math.random() *  this.fieldY)}px`

      

		const x = getRandomInt(0, this.fieldX);
		const y = getRandomInt(0, this.fieldY);

        

		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		this.field.appendChild(item);



        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
          }

    }




}


