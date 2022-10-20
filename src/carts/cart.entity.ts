import { User } from "src/auth/User.entity";
import { Item } from "src/items/item.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subTotal: number;

    @ManyToMany((_type => Item), {eager: true})
    @JoinTable()
    items: Item[];

    @OneToOne(() => User, (user) => user.cart)
    user: User
}