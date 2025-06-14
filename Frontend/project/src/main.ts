import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '@/assets/styles.scss'

createApp(App).use(vuetify).mount("#app");
const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')
