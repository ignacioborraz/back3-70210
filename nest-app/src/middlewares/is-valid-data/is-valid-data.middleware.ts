import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class IsValidDataMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!req.body.title || !req.body.stock) {
      throw new HttpException('Invalid data', 400);
    }
    next();
  }
}
