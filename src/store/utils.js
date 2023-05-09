import {updateToken} from '@/plugins/keycloak-util'

export async function fetchWithResponseCheck(url, init) {
    const token = await updateToken()
    init.headers = {
        ...options.headers,
        'Authorization': 'Bearer ' + token,
    }
    let response = await fetch(url, init);
    if (!response.ok) {
        throw response;
    }
    return response;
}
