import apiUrl from './apiUrl';

function authFetch(
  input: Request | string,
  init?: RequestInit | undefined,
  json = true
) {
  function buildErrorMessage(response: Response) {
    let message = '';
    if (response.status === 401) message = 'authenticated';
    if (response.status === 403) message = 'authorized';
    return `${input} - not ${message}`;
  }

  console.log(`${input} ${init || ''}`);

  return fetch(apiUrl + input, { ...init, credentials: 'include' })
    .then(response => {
      if (!response.ok) throw new Error(buildErrorMessage(response));
      return json ? response.json() : response;
    })
    .catch(error => {
      console.log(`${input} - ${error}`);
    });
}

export default authFetch;
