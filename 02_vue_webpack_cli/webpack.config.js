const VueLoaderPlugin = require('vue-loader/lib/plugin')  // module.exports랑 한 세트
//node.js에서 모듈 호출하기
const path = require('path')

module.exports = {
  mode: 'development',  // 상업용은 production
  // 모든 파일들의 시작점을 정하는 곳 === entry
  entry: {
    // __dirname 은 최상위 위치 (django의 base dir과 비슷한 개념)
    app: path.join(__dirname, 'src', 'main.js'),
  },
  // webpack은 기본적으로 js 만 변환 가능, 따라서 css 나 html 등은 모듈을 통해서 webpack이 이해할 수 있도록
  // 변환이 필요함. 변환 내용을 작성하는 곳 === module
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
    ]
  },
  // webpack을 통해 bundle 된 결과를 추가 처리하는 부분을 작성하는 곳 === plugins
  plugins: [
    new VueLoaderPlugin(),
  ],
  // webpack을 통해 bundle 된 결과물이 정의되는 곳 === output
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
}