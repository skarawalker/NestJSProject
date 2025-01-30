import { IsNotEmpty, IsNumber } from "class-validator";

export class ItemDto {
    @IsNumber()
    @IsNotEmpty()
    productId: number;
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}