import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/item.entity';
import { Cart } from './cart.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Item])],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
