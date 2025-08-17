import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  // Remove this default route to allow ServeStaticModule to serve index.html
  // @Get()
  // getHello(): string {
  //   return 'Hello World!';
  // }
}
