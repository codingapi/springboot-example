import { Request, Response } from 'express';

export default {
  'GET /api/server/list': (req: Request, res: Response) => {
    res.send({
      success: true,
      data: {
        list:[
          {
            name:'test1',
            url:'http://localhost:8081',
          },
          {
            name:'test2',
            url:'http://localhost:8082',
          }
        ],
        total:0
      }
    });
  },

  'POST /api/server/save': (req: Request, res: Response) => {
    res.send({
      success: true,
    });
  },

  'POST /api/server/del': (req: Request, res: Response) => {
    res.send({
      success: true,
    });
  }
};
