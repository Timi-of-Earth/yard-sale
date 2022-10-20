import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/User.entity';
import { Item } from 'src/items/item.entity';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartsService {
    constructor(@InjectRepository(Cart) private readonly cartsRepository: Repository<Cart>,
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>) {}

    async addToCart(itemId: string, user: User) {
        const item = await this.itemsRepository.findOneBy({id: itemId});
        const cart = await this.cartsRepository.findOneBy({user});

        if (item) {
            cart.items.push(item);
            cart.subTotal += item.price;
        }
        else throw new NotFoundException(`no item with id: ${itemId} found`)
        
        await this.cartsRepository.save(cart);
        return cart;
    }

    async removeFromCart(itemId: string, user: User) {
        const item = await this.itemsRepository.findOneBy({id: itemId});
        const cart = await this.cartsRepository.findOneBy({user});

        if (item) {
            cart.items = cart.items.filter(cartItem => cartItem.id !== item.id);
            cart.subTotal -= item.price;
        } else {
            throw new NotFoundException(`no item with id: ${itemId} found`)
        }

        await this.cartsRepository.save(cart);
        return cart;
    }


}
