import {createApp} from 'vue'
import App from './App.vue'
import router from "./routes";
import equipment from './store/equipment';

createApp(App)
    .use(equipment)
    .use(router)
    .mount('#app');