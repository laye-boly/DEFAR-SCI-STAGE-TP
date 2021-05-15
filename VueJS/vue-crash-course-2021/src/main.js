import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // On importe le router

// On passe notre router en parametre à la méthode use de notre App
createApp(App).use(router).mount('#app')
