import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Noty from '@/components/Noty'

createApp(App)
  .use(store)
  .use(router)
  .component('Noty', Noty)
  .mount('#app')
