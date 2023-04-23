import { Request, Response } from 'express';

export default {

  // 获取版本号
  'GET /open/version': (req: Request, res: Response) => {
    res.send('1.0.0');
  },

  // 登录接口
  'POST /user/login': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
      res.send({
        success: true,
        data:{
          username:username,
          token:'123456',
          authorities:['admin'],
          avatar:'/logo.svg'
        }
      });
  },
};
