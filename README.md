## 의식적인 훈련(Code Kata) 1 : &nbsp; 모듈러하게 개발하기 

_부제: 제약 조건 하에서 모듈라하게 ES6 개발하기 1 (스크립트 모듈 vs ~~ES6 Import~~)_

<br/>

> 최근에 린터, 번들러 없는 환경에서 프로그래밍을 하는 과제를 수행하게    
> 되었는데 그 과정에서 상당히 신선한 충격을 받았습니다. 
> 
> 자바스크립트의 어지러운 생태계에서 수없이 많은 도구와 툴을 사용하다가,  
> naked & afraid의 도전자처럼 한 두가지의 도구만 가지고 생존 게임을  
> 수행해야 하는 상황이 오니 긴장감이 높아지고 자연스럽게 프로그래밍에  
> 오롯이 집중할 수 있는 환경이 조성되었습니다.
> 
> 타입스크립트의 null safety와 autocompletion, autocorrect의   
> 타성에 젖어 소극적이고 수동적인 개발을 하고 있지는 않았나 하는 반성과 함께  
> 아래의 제약 조건 하에서 모듈러한 개발을 연습해보고자 합니다. 

<br/>

### 제약 조건

🔥 **_ _** :   

* __린터(linter) 기능 없이 개발하기__: ... 

    ```ts
    // 전역 경로: ~/Library/Application Support/Code/User/settings.json
    // 워크스페이스 경로: ./vscode/settings.json

        "javascript.validate.enable": false

    ```

* __트랜스파일러(babel) 없이 개발하기__: ...

* __번들러(babel) 없이 스크립트 모듈 기능으로 개발하기__: ...

    ```html

    <script type="module" src="./modules/...">

    ```

* __테스트(test) 없이 개발하기__: ...


* __제한 시간(3시간 단위)을 두고 개발하기__: ...







