<template>
    <div>
        <div v-if="showAddTask">
            <AddTask @add-task="addTask"/>
        </div>
        <Tasks
            v-bind:tasks="tasks"
            @delete-task="deleteTask"
            @toggle-reminder="toggleReminder"
        />
    </div>
</template>

<script>
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'

export default {
  name: 'Home',
  props: {
    showAddTask: Boolean
  },
  components: {
    Tasks,
    AddTask
  },
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    async deleteTask (id) {
      if (confirm('Are you sure?')) {
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'DELETE'
        })
        res.status === 200 ? (this.tasks = this.tasks.filter(task => task.id !== id)) : alert('Error deleting task')
      }
    },
    async toggleReminder (id) {
      // console.log('dbclick ' + id)
      const taskToggle = await this.fetchTask(id)
      const updTask = { ...taskToggle, reminder: !taskToggle.reminder }
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()
      // console.log(data)
      this.tasks.map(task => {
        if (task.id === data.id) {
          if (task.reminder) {
            task.reminder = false
          } else {
            task.reminder = true
          }
        }
        return task
      })
    },
    async addTask (newTask) {
      // this.tasks = [...this.tasks, newTask] //equivalent à
      // this.tasks.push(newTask)
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
      const data = await res.json()
      alert(data)
      this.tasks = [...this.tasks, data]
    },
    async fetchTasks () {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data
    },
    async fetchTask (id) {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
    }
  },
  async created () {
    this.tasks = await this.fetchTasks()
  }
}
</script>
