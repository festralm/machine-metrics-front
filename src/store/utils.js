export async function fetchWithResponseCheck(url, init) {
    let response = await fetch(url, init);
    if (!response.ok) {
        throw response;
    }
    return response;
}
