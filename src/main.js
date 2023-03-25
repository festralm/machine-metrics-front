import {createApp} from 'vue'
import App from './App.vue'
import equipment from './store/equipment';

createApp(App)
    .use(equipment)
    .mount('#app');