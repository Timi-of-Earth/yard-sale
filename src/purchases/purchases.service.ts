import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/User.entity';
import { Cart } from 'src/carts/cart.entity';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchasesService {
    constructor(
        @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>
    ) {}

    async confirmPurchase(user: User): Promise<Purchase> {
        const cart = await this.cartRepository.findOneBy({user});
        const items = cart.items;
        const {subTotal} = cart;
        items.forEach((item) => item.status = 'unavailable');
        const purchase = this.purchaseRepository.create({
            total: subTotal,
            items,
            buyer: user
        })

        await this.purchaseRepository.save(purchase);
        return purchase;
    }
}
