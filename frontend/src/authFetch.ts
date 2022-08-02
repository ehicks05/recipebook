import API_URL from './apiUrl';

const LOCAL_STORAGE_KEY = 'supabase.auth.token';

/**
 * https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
 */
const authFetch = async (
  endpoint: string,
  { body, ...customConfig }: any = {}
) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${
      JSON.parse(token).currentSession.access_token
    }`;
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await window.fetch(`${API_URL}${endpoint}`, config);
    if (response.ok) {
      return response.json();
    }

    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  } catch (e) {
    return Promise.reject(e);
  }
};

export default authFetch;
