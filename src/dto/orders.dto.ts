import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ItemDto } from "./item.dto";

export class OrderDto {
    id: number;
    customerName: string;
    status: "in lavorazione" | "spedito" | "consegnato";
    items: ItemDto[];
    createdAt: string;
}

export class UpdatedOrderDto {
    id: number;
    customerName: string;
    status: "in lavorazione" | "spedito" | "consegnato";
    items: ItemDto[];
    updatedAt: string;
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty({
        message: "Field customerName is required"
    })
    customerName: string;
    @IsEnum(["in lavorazione", "spedito", "consegnato"], {
        message: "Valid status required"
    })
    status: "in lavorazione" | "spedito" | "consegnato";
    @IsArray({ message: "Items must be an array" })
    items: ItemDto[];
}

export class UpdateOrderDto {
    @IsEnum(["in lavorazione", "spedito", "consegnato"], {
        message: "Valid status required"
    })
    @IsNotEmpty({
        message: "Field status is required"
    })
    status: "in lavorazione" | "spedito" | "consegnato";
}