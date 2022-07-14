import ENVS from './envs';

const API_URL =
  ENVS.MODE === 'production'
    ? (ENVS.VITE_API_URL as string)
    : 'http://localhost:8989';

export default API_URL;
