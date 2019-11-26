import { AxiosResponse } from 'axios';
import { clientAjax } from 'ajax';

export function getInfoAPI(): Promise<AxiosResponse> {
  return clientAjax.get('info');
}
