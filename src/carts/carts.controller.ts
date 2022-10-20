import { Controller, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
    constructor(private cartsService: CartsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/:id/add')
    addToCart(@Param('id') itemId: string, @Request() req) {
        const { user } = req;
        return this.cartsService.addToCart(itemId, user)
    }

    @Patch('/:id/remove')
    removeFromCart(@Param('id') itemId: string, @Request() req) {
        const { user } = req;
        return this.cartsService.removeFromCart(itemId, user)
    }
}
