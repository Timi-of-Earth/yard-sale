import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/User.entity';
import { Cart } from 'src/carts/cart.entity';
import { Purchase } from './purchase.entity';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Purchase])],
  controllers: [PurchasesController],
  providers: [PurchasesService]
})
export class PurchasesModule {}
