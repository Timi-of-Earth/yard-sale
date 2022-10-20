import { Cart } from "src/carts/cart.entity";
import { Item } from "src/items/item.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @OneToMany((_type => Item), (item) => item.user, {eager: true})
    items: Item[];

    @OneToOne(_type => Cart, (cart) => cart.user, {cascade: true})
    @JoinColumn()
    cart: Cart
}