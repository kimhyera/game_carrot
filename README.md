# game_carrot
 당근 뽑는 게임  https://kimhyera.github.io/game_carrot
 
### 주요기능
<pre>
1. 지정된 시간안에 모든당근을 클릭해야 이긴다. 

2. 지정된 시간안에 당근을 클릭못하면 게임에서 진다.

3. 버그를 클릭하면 게임에서 진다.

</pre>


### 작업 방법 
<pre>
1. class 컴퍼넌트 활용한다.

2. setState함수를 통해 업데이트 해준다. (배열의 불변성을 위해 ...연산자 활용)

3. createRef()로 돔에 접근한다.

4. 최적화작업- pureComponent 사용한다.
5. 최적화작업 - 유효성검사를 하여 item 만 바꾸고 새로운 오브젝트를 업데이트 처리한다.
</pre>

