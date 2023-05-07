export async function fetchWithResponseCheck(url, init) {
    const response = await fetch(url, init)
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response;
}
