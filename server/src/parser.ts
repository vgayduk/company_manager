import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import bodyParser  from 'body-parser'

@Injectable()
export class Parser implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...', req.body);
    next();
  }
}
