<template>
    <header>
        <!-- <h1>Task tracker</h1> -->
        <h1>{{ title }}</h1>
        <Button
        @="$emit('toggle-add-task')"
        :text="showAddTask ? 'close' : 'add task'"
        :color="showAddTask ? 'red' : 'green'"/>
    </header>
</template>

<script>
import Button from './Button'
export default {
  name: 'Header',
  props: ['title', 'showAddTask'],
  components: {
    Button
  }
}
</script>
<style scoped>
    header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>
