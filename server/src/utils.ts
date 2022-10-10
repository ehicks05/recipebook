import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';

interface ILoggedInUser {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
}

const JWT_KEY = process.env.JWT_TOKEN;
const ADMIN_EMAILS = ['hicksteam1@gmail.com', 'shicks255@yahoo.com'];

export const acceptToken: (h: IncomingHttpHeaders) => Promise<ILoggedInUser | undefined> = async (headers) => {
  const userJwt = headers.authorization;

  if (!userJwt) {
    return undefined;
  }

  let result;

  jwt.verify(userJwt.split(' ')[1], `${JWT_KEY}`, (_err, user) => {
    if (user) {
      result = user;
    }
  });

  return result;
};

export const isAdmin: (email: string) => boolean = (email) => {
  return ADMIN_EMAILS.includes(email);
};
