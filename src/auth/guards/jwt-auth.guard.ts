import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add your custom authentication logic here
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Handle the case when JWT is invalid or expired
    if (err || !user) {
      throw err || new Error('Invalid or expired token');
    }
    return user;
  }
}
