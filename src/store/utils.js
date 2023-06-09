import {updateKeycloakToken} from "@/main";

export async function fetchWithResponseCheck(url, init, throwException) {
    let response = await fetchAuthenticated(url, init)
    if (response.status === 401) {
        await updateKeycloakToken()
        if (window.localStorage.getItem('keycloakToken')) {
            response = fetchAuthenticated(url, init)
        }
    } else if (!throwException && response.status === 403) {
        window.location = "/forbidden"
    } else if (!throwException && response.status === 404) {
        console.log(404)
        console.log(url)
        console.log(init)
        window.location = "/not-found"
    } else if (!response.ok) {
        throw response;
    }
    return response;
}

async function fetchAuthenticated(url, init) {
    let token = window.localStorage.getItem('keycloakToken')
    if (!token) {
        token = await updateKeycloakToken()
    }
    if (init) {
        init.headers = {
            ...init.headers,
            'Authorization': 'Bearer ' + token,
        }
    } else {
        init = {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }
    }
    return await fetch(url, init);
}
