import { Exclude } from "class-transformer";
import { User } from "src/auth/User.entity";
import { Purchase } from "src/purchases/purchase.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string
    
    @Column()
    price: number

    @Column()
    status: string

    @ManyToOne((_type) => User, (user) => user.items, {eager: false})
    @Exclude({toPlainOnly: true})
    user: User;

    @ManyToOne(() => Purchase, (purchase) => purchase.items)
    purchase: Purchase;
}