import { AxiosResponse } from 'axios';
import { clientAjax } from 'ajax';

export function signInAPI(): Promise<AxiosResponse> {
  return clientAjax.post('sign-in', {
    email: 'kevin@gmail.com',
    password: 'kevin1234',
  });
}
