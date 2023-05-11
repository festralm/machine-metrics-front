import {createApp} from 'vue'
import App from './App.vue'
import router from "./routes";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import store from "./store";
import Keycloak from "keycloak-js";

const initOptions = {
    realm: 'master',
    clientId: 'frontend',
    url: process.env.VUE_APP_KEYCLOAK_URL,
    resource: "frontend",
    "public-client": true,
    "confidential-port": 0,
    checkLoginIframe: false,
}
const TOKEN_MIN_VALIDITY_SECONDS = 70

var keycloakGlobal

// if (!window.localStorage.getItem('keycloakToken')) {
    authenticateAgainstKeycloak().then(() => {
        instantiateVueApp()
    })
// } else {
//     instantiateVueApp()
// }

function instantiateVueApp() {
    const app = createApp(App);
    app
        .use(store)
        .use(router)
        .component('VueDatePicker', VueDatePicker);
    app.mount('#app');
}

async function authenticateAgainstKeycloak() {
    keycloakGlobal = new Keycloak(initOptions)
    await keycloakGlobal.init({onLoad: 'login-required'}).then((auth) => {
        if (!auth) {
            window.location.reload()
        }
    }).catch(() => {
        console.error("Authenticated Failed");
    });
}

export async function updateKeycloakToken() {
    await keycloakGlobal.updateToken(TOKEN_MIN_VALIDITY_SECONDS).then(function (refreshed) {
        if (refreshed) {
            if (keycloakGlobal.token) {
                window.localStorage.setItem('keycloakToken', keycloakGlobal.token)
            }
        }
    }).catch(function () {
        console.log('Failed to refresh the token, or the session has expired');
        window.location.reload()
    });
    return keycloakGlobal.token
}

export async function logout() {
    keycloakGlobal.logout()
}