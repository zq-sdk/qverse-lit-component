import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupElementPlus } from './plugins/element-plus'
import './plugins/lit-components'

const app = createApp(App)

setupElementPlus(app)

app.use(router).mount('#app')
