import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    customer_name: string;
    @Column()
    status: "in lavorazione" | "spedito" | "consegnato";
    @Column()
    datetime: string;
}