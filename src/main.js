import {createApp} from 'vue'
import App from './App.vue'
import router from "./routes";
import equipment from './store/equipment';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App)
    .use(equipment)
    .use(router)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app');