import { Request, Response } from 'express';

export default {
  'GET /api/table/server/list': (req: Request, res: Response) => {
    res.send({
      success: true,
      data:[
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
    });
  },

  'POST /api/table/server/save': (req: Request, res: Response) => {
    res.send({
      success: true,
    });
  }
};
