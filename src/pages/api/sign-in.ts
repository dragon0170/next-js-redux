import { NextApiRequest, NextApiResponse } from 'next';
import { serverAjax } from 'ajax';
import Proxy, { HttpMethod } from 'proxy';
import * as HttpStatus from 'http-status-codes';

const proxy = new Proxy(serverAjax);

const postError = new Map()
  .set(HttpStatus.BAD_REQUEST, {
    showAlert: true,
    message: '비밀번호를 확인해주세요.',
  })
  .set(HttpStatus.NOT_FOUND, {
    showAlert: true,
    message: '이메일을 확인해주세요.',
  });

proxy.addMethodWithCustomErrorData(HttpMethod.POST, postError);

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  proxy.serve(req, res);
};
