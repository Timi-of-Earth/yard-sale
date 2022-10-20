import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { Item } from './items/item.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/User.entity';
import { CartsModule } from './carts/carts.module';
import { PurchasesModule } from './purchases/purchases.module';
import { Cart } from './carts/cart.entity';
import { Purchase } from './purchases/purchase.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    ItemsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Item, User, Cart, Purchase],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CartsModule,
    PurchasesModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
