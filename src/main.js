import {createApp} from 'vue'
import App from './App.vue'
import router from "./routes";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import store from "./store";
import Keycloak from "keycloak-js";

const initOptions = {
    realm: 'Machinemetrics',
    clientId: 'frontend',
    url: process.env.VUE_APP_KEYCLOAK_URL,
    resource: "frontend",
    "public-client": true,
    "confidential-port": 0,
    checkLoginIframe: false,
}
const TOKEN_MIN_VALIDITY_SECONDS = 70

const keycloak = new Keycloak(initOptions)

export async function authenticateAgainstKeycloak() {
    await keycloak.init({onLoad: 'login-required'}).then((auth) => {
        if (!auth) {
            window.location.reload()
        }
    }).catch(() => {
        console.error("Authenticated Failed");
    });
    await router.push('/')
}

export async function updateKeycloakToken() {
    await keycloak.updateToken(TOKEN_MIN_VALIDITY_SECONDS).then(function (refreshed) {
        if (refreshed) {
            if (keycloak.token) {
                window.localStorage.setItem('keycloakToken', keycloak.token)
            }
        }
    }).catch(function () {
        console.log('Failed to refresh the token, or the session has expired');
        window.location.reload()
    });
    return keycloak.token
}

function instantiateVueApp() {
    const app = createApp(App);
    app.config.globalProperties.$keycloak = keycloak;
    app
        .use(store)
        .use(router)
        .component('VueDatePicker', VueDatePicker)
        .mount('#app');
}

if (!window.localStorage.getItem('keycloakToken')) {
    authenticateAgainstKeycloak().then(() => {
        instantiateVueApp()
    })
} else {
    instantiateVueApp()
}
