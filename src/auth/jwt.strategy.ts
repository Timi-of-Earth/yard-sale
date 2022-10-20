import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secretkey",
    });
  }

  async validate(payload: JwtPayload) {
    const {username} = payload;
    const user = await this.userRepository.findOneBy({username});
    if (!user) {
        throw new UnauthorizedException;
    }
    return user;
  }
}