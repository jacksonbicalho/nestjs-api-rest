import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService
  ) {
  }

  async validateUser(username: string, password: any): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      const passwordClean = this.userService.decrypt(user.salt + ':' + user.password)
      if (passwordClean === password) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}