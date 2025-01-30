import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    quantity: number;
    @Column()
    order_id: number;
}