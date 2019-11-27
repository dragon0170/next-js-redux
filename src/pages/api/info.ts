import { NextApiRequest, NextApiResponse } from 'next';
import { serverAjax } from 'ajax';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      try {
        const response = await serverAjax.post('sign-in', {
          email: 'kevin@gmail.com',
          password: 'kevin1234',
        });
        res.status(200).json({ nickname: 'kevin' });
      } catch (error) {
        if (error.response.status !== 500) {
          res.status(error.response.status).json({
            msg: '이메일 또는 패스워드를 확인해주세요.',
            showModal: true,
          });
        } else {
          res
            .status(error.response.status)
            .json({ message: '잠시 후에 시도해주세요.', showModal: true });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
