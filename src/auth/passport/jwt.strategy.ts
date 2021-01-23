import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import express from 'express';
import { verify, sign, decode, SignOptions } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  private signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: 300,
  }

  constructor(){
    super({passReqToCallback: true});
  }

  async validate(req: express.Request): Promise<any> {

    if (!req.headers.authorization) {
      throw new UnauthorizedException('not found authorization in header');
    }

    const bearer = req.headers.authorization.split(" ", 2)
    if (bearer.length < 1) {
      throw new UnauthorizedException('not found bearer in authorization #1');
    }

    if (bearer[0] != 'bearer' && bearer[0] != 'Bearer'  ) {
      throw new UnauthorizedException('not found bearer in authorization #2');
    }
    const tokenCripto = bearer[1]
    let decoded = verify(tokenCripto, 'shhhhh');
    // verify()

    const id = 1; //esse id viria do banco de dados
    const token = sign({ id }, "shhhhh", this.signOptions);
    return { auth: true, token: token };
  }
}
