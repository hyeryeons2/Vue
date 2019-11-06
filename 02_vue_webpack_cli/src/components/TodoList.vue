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
.todo-list {
  display: inline-block;
  width: 31%;
}
</style>
