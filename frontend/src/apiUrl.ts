const API_URL =
  process.env.NODE_ENV === 'production'
    ? (process.env.REACT_APP_API_URL as string)
    : 'http://localhost:8080';

export default API_URL;
