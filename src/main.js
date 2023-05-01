import {createApp} from 'vue'
import App from './App.vue'
import router from "./routes";
import equipment from './store/equipment';
import dataService from './store/data-service';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App)
    .use(equipment, dataService)
    .use(router)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app');