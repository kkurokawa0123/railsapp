import type { AxiosHeaders } from 'axios';

export const authStorage = {
  get: () => ({
    token: localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  }),
  set: (headers: AxiosHeaders) => {
    if (headers['access-token']) {
      localStorage.setItem('access-token', headers['access-token']);
      localStorage.setItem('client', headers['client']);
      localStorage.setItem('uid', headers['uid']);
    }
  },
  clear: () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  },
};
