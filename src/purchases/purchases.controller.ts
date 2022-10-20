import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
    constructor(private readonly purchasesService: PurchasesService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    confirmPurchase(@Request() req) {
        const user = req.user;
        return this.purchasesService.confirmPurchase(user);
    }
}
