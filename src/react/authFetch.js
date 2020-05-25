function authFetch(url, options) {
    return fetch(url, {...options})
        .then(response => {
            if (response.url.endsWith('/login')) {
                throw new Error('Not logged in.');
            }
            return response.json()
        })
        .catch((error) => {
            console.log(error);
        });
}

export default authFetch;