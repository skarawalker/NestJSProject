import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderDto, UpdateOrderDto } from 'src/dto/orders.dto';
import { Order } from 'src/entities/order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) { }

    @Get()
    async getAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('status') status?) {
        const [orders, pages] = await this.orderService.getAll(page, limit, status);
        return {
            data: orders,
            page: page,
            totalPages: pages
        };
    }

    @Get(':orderId')
    async getOne(@Param('orderId', ParseIntPipe) id: number): Promise<OrderDto> {
        return await this.orderService.findOrder(id);
    }

    @Post()
    create(@Body(ValidationPipe) order: CreateOrderDto) {
        this.orderService.create(order);
    }

    @Patch(':orderId')
    async update(@Param('orderId', ParseIntPipe) id: number, @Body(ValidationPipe) order: UpdateOrderDto): Promise<UpdateOrderDto> {
        return await this.orderService.update(id, order);
    }

    @Delete(':orderId')
    async delete(@Param('orderId', ParseIntPipe) id: number): Promise<OrderDto> {
        return await this.orderService.delete(id);
    }
}
