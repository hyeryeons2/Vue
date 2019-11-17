<template>
  <div>
    <!-- input 의 값이 바뀔 때 마다 onInput 메서드를 실행한다. -->
    <input type="text" @input="onInput"/>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    // "inputChange" 이벤트 발생했음을 알린다. 그리고 input 의 value 를 넘겨준다.
    onInput: function(event) {
      this.$emit('inputChange', event.target.value)
    }
  }
}
</script>

<style scoped>
  input {
    width: 75%;
  }
  
  div {
    text-align: center;
    margin: 20px;
  }
</style>