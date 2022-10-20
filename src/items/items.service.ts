import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/User.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item) private readonly itemRepository: Repository<Item>
    ) {}

    async getItems(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
        const {name, description, price} = createItemDto;
        const item = this.itemRepository.create({
            name,
            description,
            price,
            status: "available",
            user
        });
        await this.itemRepository.save(item);
        return item;
    }

    async getSingleItem(id: string): Promise<Item> {
        const item = await this.itemRepository.findOneBy({id});
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} could not be found`)
        }
        return item;
    }

    async deleteItem(id: string, user): Promise<Item[]> {
        const result = await this.itemRepository.delete({id, user});
        if (result.affected === 0) {
            throw new NotFoundException(`Item with ID ${id} could not be found`)
        }
        return this.itemRepository.find();
    }

    async updatePrice(id: string, updateItemDto: UpdateItemDto, user): Promise<Item> {
        const {price} = updateItemDto;
        let item = await this.itemRepository.findOneBy({id, user});
        item.price = price;
        return this.itemRepository.save(item);
    }


}
