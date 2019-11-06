<template>
<!-- 컴포넌트 최상위에는 반드시 하나의 요소만 존재해야 함 -->
  <div>
    <TodoList category="탈싸피"/>
    <TodoList category="싸피"/>
    <TodoList category="기타"/>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
export default {
  components: {
    TodoList
  }
}
</script>

<style>

</style>