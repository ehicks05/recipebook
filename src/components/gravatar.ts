import md5 from 'md5';

export const toGravatarHash = (email: string) =>
  md5(email.trim().toLocaleLowerCase());

export const toGravatarUrl = (email: string) =>
  `https://gravatar.com/avatar/${toGravatarHash(email)}?s=256&d=retro`;
