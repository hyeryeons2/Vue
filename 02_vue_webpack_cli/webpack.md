# webpack

### # 프로젝트 시작을 위한 설치

```bash
# 1. node project 시작
$ npm init
```

```
package name: (02_vue_webpack_cli) 뜨면 끝날때까지 계속 엔터!
```

- 이 작업이 끝나면 `package.json` 파일이 생성됨

```bash
# 2. vue 설치
$ npm install vue  # === "npm i vue" 라고 해도 설치 됨(shortcut, i===install)
```

- `package.json`  파일 내 맨 끝에 ` "dependencies":  "vue": "^2.6.10"  }`이 생겼다면 제대로 된 것

-  `.gitignore` 하기
  - `.gitignore` 파일 만들고 `node_modules/`

```bash
# 3. webpack 설치
# -D 는 개발환경에서만 사용하겠다.
# webpack은 개발자의 편의성을 위한 툴
$ npm i -D webpack webpack-cli
```

- `package.json` 파일 맨 끝에서 `  "devDependencies": { "webpack": "^4.41.2", "webpack-cli": "^3.3.10 }` 이 생겼다면제대로 된 것

```bash
# 4. webpack 설정파일 생성
$ touch webpack.config.js
```

- `webpack.config.js`라는 이름으로 파일 하나가 생성됨

---



### # 이제, 진짜 프로젝트 시작을 위한 세팅

```js
// node.js 에서는 이 module 에서 특정 값을 expert 하기 위해 module.exports 에 export 할 값들을 정의한다.
module.exports = {
    entry: '',
    module: {},
    plugins: {},
    output: {},
}
```

-  `src` 폴더 생성하기
  - 역할: 소스 코드 저장하는 곳
  - `src` 폴더 내 `main.js` 파일 생성(`main.js === main.entry` 라고 생각하면 쉬움)

- `webpack.config.js` 로 돌아가서 다음 코드를 추가한다(`module`호출, `entry`, `output` 추가)

  ```js
  //node.js에서 모듈 호출하기
  const path = require('path')
  
  module.exports = {
      entry: {
          app: path.join(__dirname, 'src', 'main.js'),
      },
      module: {},
      plugins: {},
      output: {
          filename: 'app.js',
          path.join(__dirname, 'dist'),
      },
  }
  ```

  

---

### # main.js

- `main.js`의 내용을 입력하고 같은 폴더 내 `App.vue` 생성했는데도 `vue` 파일로 인식하지 못한다면 ? `extensions` 에서 `Vetur` `install` 하기 

  - 설치하면 `App.vue` 생성 시 아이콘이 생성됨

- 다시 `main.js`로 가서

  ```js
  import Vue from 'vue'
  import App from './App.vue'
  
  new Vue({
    render: (createElement) => {
      return createElement(App)
    }
  })
  
  ```

  - `arrow function`을 주로 사용함

  - 이렇게까지 줄일 수 있다.

    ```js
    new Vue({
      render: h => h(App)
    })
    ```

    - 왜 `createElement` 대신, `h` 쓰나?

      [참고] https://css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/ 

  ```js
  import Vue from 'vue'
  import App from './App.vue'
  
  new Vue({
    render: h => h(App) <- App은 최상위 컴포넌트
  }).$mount('#app')  <- app이라는 id를 가진 태그한테 html 문서를 그리겠다. 
  ```

  

### App.vue

```
<치고 탭 하면 <templates>로 자동완성
```

- ctrl shift p 해서 settings쳐서 open JSON에서 

```JSON
    "[vue]": {
        "editor.tabSize": 2
    },
```

```vue
<template>
  <h1>여기가 바로 최상위 컴포넌트!</h1>
</template>

<script>
export default {
  
}
</script>
<style>

</style>

```

```bash
# 5. webpack 은 js 파일만 변환 가능, 때문에 vue 파일 및 template를 webpack이 변환할 수 있도록 도와주는 툴
$ npm install -D vue-loader vue-template-compiler

```

- 

```js
// 맨 위에 
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//module.exports의 module 과 plugins에 추가하기
   module: {
        rules: [
            {
            test: /\.vue$/,
            use: 'vue-loader',
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
```

- package.json 의 scripts 의 test 줄은 지우고, 

  ```js
    "scripts": {
      "build": "webpack"
    },
  ```

  ```ba
  $ npm run build
  ```

  - `webpack`이 main.js와 `App.vue`를 bundling 통해 하나의 파일로 압축해서 dist 폴더 내 app.js라는 파일로 줌

- `public` 이라는 폴더를 생성한다

  - `public` 폴더 내 `html` 파일 만들어서 `app.js` 사용할 것임

  - index.html 만들고

    ```html
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div id="app"></div><!-- mount$app -->
      <script src="../dist/app.js"></script> <!-- app.js 호출 -->
    </body>
    </html>
    
    ```

  - runserver하고 출력된 것 확인했는데 terminal에서 다음의 메세지가 발생하게 됨

    ```bash
    WARNING in configuration
    The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
    You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
    
    ```

    

  - 오류 고치고자 그러나 사람들이 vue 뜯어보고 값 바꾸는 거 막기 위해

  ```
  module.exports = {
      mode: 'development',  // 상업용은 production
      
  ```

  - $ npm run build 하면 메세지 없어짐

- src 폴더> components 폴더 > TodoList.html 작성하기

  ```vue
  <template>
    <div class="todo-list">
      <h2>{{ category }}</h2>
      <input type="text" v-model="newTodo" />
      <button v-on:click="addTodo">+</button>
      <ul>
        <li v-for="todo in todos" v-bind:key="todo.id">
          <span>{{ todo.content }}</span>
          <button v-on:click="removeTodo(todo.id)">x</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      'category': {
        type: String,
        required: true
      }
    },
    data: function() {
      return {
        todos: [],
        newTodo: ""
      };
    },
    methods: {
      addTodo: function() {
        if (this.newTodo) {
          this.todos.push({
            id: new Date().getTime(),
            content: this.newTodo
          });
          this.newTodo = "";
        }
      },
      removeTodo: function (target_id) {
        const newTodos = this.todos.filter(todo => {
          return todo.id !== target_id
        })
        this.todos = newTodos
        }
    }
  };
  </script>
  
  <style>
  #app {
    color: darkgrey;
  }
  #title {
    color: skyblue;
  }
  .todo-list {
    display: inline-block;
    width: 31%;
  }
  </style>
  
  ```

- App.vue

  ```vue
  <template>
  <!-- 컴포넌트 최상위에는 반드시 하나의 요소만 존재해야 함 -->
    <div>
      <TodoList category="탈싸피"/>
      <TodoList category="싸피"/>
      <TodoList category="기타"/>
    </div>
  </template>
  
  <script>
  export default {
    
  }
  </script>
  
  <style>
  
  </style>
  ```

  

- css loader 설치

  ```bash
  $ npm install vue-style-loader css-loader -D
  # -D는 맨 뒤에 있어도 됨
  ```

- webpack.config.js의 module의 rules에 추가해주기

  ```js
      module: {
          rules: [
              {
              test: /\.vue$/,
              use: 'vue-loader',
              },
              {
                  test: /\.css$/,
                  use: ['vue-style-loader', 'css-loader']
              }
          ]
      },
          
  ```

  