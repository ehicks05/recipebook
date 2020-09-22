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
      return response.json(); // todo: if we ever want something other than json back, just return the response?
    })
    .catch((error) => {
      console.log(error);
    });
}

export default authFetch;