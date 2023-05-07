import {createApp} from 'vue'
import App from './App.vue'
import router from "./routes";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import store from "./store";

createApp(App)
    .use(store)
    .use(router)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app');