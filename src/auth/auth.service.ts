import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './User.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Cart } from 'src/carts/cart.entity';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;
        
        if (!username || !password) {
            throw new BadRequestException('Please enter a username and password');
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            username,
            password: hashedPassword
        });
        const cart = this.cartRepository.create({
            subTotal: 0,
            items: []
        });
        user.cart = cart;

        try {
            await this.userRepository.save(user)
        } catch (error) {
            // if (error.code === '23505') {
            //     throw new ConflictException(`Username already exists`);
            // } else {
            //     throw new InternalServerErrorException();
            // }
            console.log(error)
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const {username, password} = authCredentialsDto;
        if (!username || !password) {
            throw new UnauthorizedException('Please check your credentials');
        }
        const user = await this.userRepository.findOneBy({username});

        if (user && bcrypt.compare(password, user.password)) {
            const payload = {username};
            const accessToken = this.jwtService.sign(payload);
            return {accessToken};
        } else {
            throw new UnauthorizedException('Please check your credentials')
        }
    }
}
