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

  console.log(input);
  console.log(init);

  return fetch(input, { ...init, credentials: "include" })
    .then((response) => {
      if (!response.ok) throw new Error(buildErrorMessage(response));
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export default authFetch;
