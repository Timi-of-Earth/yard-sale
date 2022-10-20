import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @Get()
    getItems() {
        return this.itemsService.getItems();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createItem(@Body() createItemDto: CreateItemDto, @Request() req) {
        return this.itemsService.createItem(createItemDto, req.user)
    }

    @Get('/:id')
    getSingleItem(@Param('id') id: string) {
        return this.itemsService.getSingleItem(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteItem(@Param('id') id: string, @Request() req) {
        this.itemsService.deleteItem(id, req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id/price')
    updatePrice(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto, @Request() req) {
        return this.itemsService.updatePrice(id, updateItemDto, req.user);
    }
}
