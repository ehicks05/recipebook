async function authFetch(url, options) {
    const responseJson = await fetch(url, {...options});
    // if (responseJson.url.endsWith('/login'))
    //     throw new Error('Not logged in');

    return await responseJson.json();
}

export default authFetch;