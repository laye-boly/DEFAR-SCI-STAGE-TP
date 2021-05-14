<template>
    <div class="task">
        <div v-for="task in tasks" :key="task.id">
          <!-- On reprend l'événement emis depuis le composant enfant Task et on emet un autre événemnt vers
          le composant parent -->
            <Task @toggle-reminder="$emit('toggle-reminder', task.id )" @delete-task="$emit('delete-task', task.id)" :task="task" />
        </div>

    </div>

</template>

<script>
import Task from './Task'
export default {
  name: 'Tasks',
  props: {
    tasks: Array,
    laye: String
  },
  components: {
    Task
  },
  emits: ['delete-task', 'toggle-reminder'] // Tableau qui contient les événement émis vers le parent
}
</script>
