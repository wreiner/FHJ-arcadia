import { HttpException, HttpStatus } from '@nestjs/common';

export class GameNotImplementedException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
