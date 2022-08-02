import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';

interface ILoggedInUser {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
}

export const acceptToken: (h: IncomingHttpHeaders) => Promise<ILoggedInUser | undefined> = async (headers) => {
  // const userJwt = headers.authorization;
  const userJwt =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjU4NjI5NDk4LCJzdWIiOiJiYzhkYjMyZC02MzBhLTQ1MzAtYjY1My01NTZkMzE5MzYwYzYiLCJlbWFpbCI6InNoaWNrczI1NUB5YWhvby5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.3dirbycn6Em-caRWpywy3vj7i_j81wcu9zCkWBcIVEc';

  if (!userJwt) {
    return undefined;
  }

  let result;

  await jwt.verify(userJwt.split(' ')[1], 'f8045481-74f0-4d03-bf23-fb14d1e7894d', (_err, user) => {
    if (user) {
      result = user;
    }
  });

  return result;
};

export const padNumber = (num: number) => {
  if (num >= 10) {
    return num.toString();
  }

  return `0${num}`;
};

export const getNow = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = padNumber(now.getMonth() + 1);
  const day = padNumber(now.getDate());

  const hour = padNumber(now.getHours());
  const minute = padNumber(now.getMinutes());
  const sec = padNumber(now.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${sec}`;
};
