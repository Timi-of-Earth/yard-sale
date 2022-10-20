import { User } from "src/auth/User.entity";
import { Item } from "src/items/item.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Purchase {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    total: number;

    @OneToMany(() => Item, (item) => item.purchase, {eager: true, cascade: true} )
    items: Item[];

    @OneToOne(() => User, {eager: true} )
    @JoinColumn()
    buyer: User

}