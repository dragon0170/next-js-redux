import { AxiosResponse } from 'axios';
import { clientAjax } from 'ajax';

export function signInAPI(params: {
  jwt?: string;
  email: string;
  password: string;
}): Promise<AxiosResponse> {
  return clientAjax.post(
    'sign-in',
    {
      email: params.email,
      password: params.password,
    },
    params.jwt
      ? {
          headers: {
            Cookie: `jwt=${params.jwt};`,
          },
        }
      : { withCredentials: true },
  );
}
