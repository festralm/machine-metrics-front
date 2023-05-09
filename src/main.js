import {createApp} from 'vue'
import App from './App.vue'
import router from "./routes";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import store from "./store";
import Keycloak from "keycloak-js";

// Параметры для подключения к Keycloak
let initOptions = {
    url: process.env.VUE_APP_KEYCLOAK_URL, // Адрес Keycloak
    realm: 'Machinemetrics', // Имя нашего realm в Keycloak
    clientId: 'login-app', // Идентификатор клиента в Keycloak

    // Перенаправлять неавторизованных пользователей на страницу входа
    onLoad: 'login-required'
}

const keycloak = Keycloak(initOptions)

const TOKEN_MIN_VALIDITY_SECONDS = 70
// Инициализировать Keycloak JS Adapter
keycloak.init({onLoad: initOptions.onLoad}).then((auth) => {
    if (!auth) {
        // Если пользователь не авторизован - перезагрузить страницу
        window.location.reload();
    } else {
        console.log("Authenticated");

        // Если авторизован - инициализировать приложение Vue
        createApp(App)
            .use(store)
            .use(router)
            .component('VueDatePicker', VueDatePicker)
            .mount('#app');

        window.onfocus = async () => {
            await keycloak.updateToken(TOKEN_MIN_VALIDITY_SECONDS)
            return keycloak.token
        }
    }

    // Пытаемся обновить токен каждые 6 секунд
    // setInterval(() => {
    //     // Обновляем токен, если срок его действия истекает в течении 70 секунд
    //     keycloak.updateToken(70).then((refreshed) => {
    //         if (refreshed) {
    //             console.log('Token refreshed' + refreshed);
    //         } else {
    //             console.log('Token not refreshed, valid for '
    //                 + Math.round(keycloak.tokenParsed.exp
    //                     + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
    //         }
    //     }).catch(() => {
    //         console.error('Failed to refresh token');
    //     });
    // }, 6000)

}).catch(() => {
    console.error("Authenticated Failed");
});

//
// if (!window.localStorage.getItem('keycloakToken')) {
//     authenticateAgainstKeycloak().then(() => {
//         instantiateVueApp()
//     })
// } else {
//     instantiateVueApp()
// }
//
// export async function authenticateAgainstKeycloak() {
//     await keycloak.init({onLoad: initOptions.onLoad}).then((auth) => {
//         if (!auth) {
//             window.location.reload()
//         } else {
//             console.log('Authenticated')
//
//             // window.onfocus = () => {
//             //     updateToken()
//             // }
//             // window.onfocus = async () => {
//             //     await keycloak.updateToken(TOKEN_MIN_VALIDITY_SECONDS)
//             //     return keycloak.token
//             // }
//         }
//
//         if (keycloak.token) {
//             window.localStorage.setItem('keycloakToken', keycloak.token)
//         }
//     })
//     await router.push('/')
//
// }
//
// function instantiateVueApp() {
//     createApp(App)
//         .use(store)
//         .use(router)
//         .component('VueDatePicker', VueDatePicker)
//         .mount('#app');
//
// }
