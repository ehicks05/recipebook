function authFetch(input: Request | string, init?: RequestInit | undefined) {
  // todo: make use of these in production
  // const csrfHeader = document.head.querySelector("[name~=_csrf_header][content]");
  // const csrfToken = document.head.querySelector("[name~=_csrf][content]");

  function buildErrorMessage(response: Response) {
    let message = "";
    if (response.status === 401) message = "authenticated";
    if (response.status === 403) message = "authorized";
    return "Must be " + message + " to access '" + input + "'";
  }

  return fetch(input, init)
    .then((response) => {
      if (!response.ok) throw new Error(buildErrorMessage(response));
      try {
        return response.json();
      } catch (e) {
        console.log(e);
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export default authFetch;
