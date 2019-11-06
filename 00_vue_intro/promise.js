// 외부에 요청 보내서 그 결과 출력하는 코드 작성하는 과정
// 1. 몇 초 뒤에 데이터가 응답되면,
// 2. 데이터를 변수에 저장해서 출력함

// 데이터 반환받기 위한 함수 작성
// function getData() {
//     let data  // data는 json으로 가져오는 값이어서 data 값이 변할 수 있으므로 const 대신 let 씀 (let data = null 같은 개념)

//     setTimeout(() => {
//         console.log('요청 보냈어요~')
//         data = {'data': 'somedata'}
//     }, 100);  // 0.1초 후에 실행됨
//     return data
// }


// // 위의 함수 통해서 데이터 받겠다
// function printData() {
//     let response1 = getData()
//     console.log(response1)
// }

// printData()

// 터미널에 $ node 00_vue_intro/promise.js 로 확인해 보면
// 요청 보내고 바로 undefined된 data 를 보내주고 0.1초 뒤에 Timeout 내 data 출력됨
// undefined
// 요청 보냈어요~ 로 출력되는 것


// 위의 문제를 해결하기 위해서는 ..? [콜백함수 이용]
// function getDataCallback(callback) {  // 2. callback 으로 함수가 넘어옴 즉, callback = getDataCallback의 function(data) 함수
//     setTimeout(() => {
//       console.log('요청 보냈습니다~~')
//       const data = {'data': 'somedata'}  
//       callback(data)  // data 꺼내올 때 그 데이터를 callback 함수에 넣어서 실행해줘 3. 다 끝나고 저 함수 실행하게 됨
//     }, 100)  // 0.1초 끝나고 데이터 가져옴
// }

// // 1. 출력하는 작업을 하는 함수를 인자로 넘김(데이터 꺼내온 뒤 작업하는 함수를 전달; 데이터 도착후 할 작업이 여기서 시행되게 됨)
// getDataCallback(function(data) {
//   console.log(data)
  // console.log(1)
  // getDataCallback(function(data2) {
  //   console.log(2)
  // }) 
// })
// 그러나 이 방식은 계속 안에서 안에서 안에서 쭉쭉 코드를 작성하게 되니까 nested 구조를 띄게 됨...비효율적인거 같은데 좀 더 좋은 방법 없나??(콜백 hell)


// 그래서 Promise 등판함
// [Promise 활용]((1)다짐 반환 후, (2)다짐 내용 들어가는 구조(데이터 요청한 뒤, 어떻게 할 거야!=> promise 안 쪽 함수에 표현한다))
function getDataPromise() {  // axios.get(DATA_URL) 와 비슷한 역할 수행할 예정
  // promise 바로 반환부터 하고 시작함(국룰)
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (true) {
      console.log('요청보냈어요!')
      const data = {'data': 'somedata'}
      resolve(data)   // 사용자가 사용할 수 있도록 데이터를 전달해 준다 .then으로 꺼낼 수 있는 객체가 됨
    } else {
      reject('조건에 통과하지 못했어요!')
    }
  }, 100)
})
}
// console.log(getDataPromise())

// getDataPromise()  // 함수 실행하면 .then으로 data 꺼낼 수 있게됨
//   .then(response => {  // response === resolve(data)
//     console.log(response)
//     return response.data
//   })
//   .then((data) => {
//     console.log(data)  // 위의 then에서 받은 response.data 에서 data 가져오는 것
//     console.log(2)
//   })
//   .then(() => {
//     console.log(3)
//   })
//   .catch(error => {
//     console.error(error)
//   })  // then 하면서 하나라도 통과가 안되면 바로 .catch로 넘어가니까 catch는 마지막에 하나만 작성해도 됨
// 콜백은 사용할 수록 깊이가 깊어지는 데 (nested 구조), promise는 .then으로 그냥 쭉쭉 작성하면 됨


// 그냥 맨위처럼 동기적으로 코드를 치되, 비동기적으로 구현할 수 있는 방법이 있을까? async, await
const handleData = async function() {  // async === 비동기적인 작업을 동기적으로 처리한다
  const response = await getDataPromise()  // .then없이 response 받을 때까지 기다리겠다(await)
  console.log(response)
}

handleData()