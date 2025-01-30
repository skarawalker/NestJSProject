import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from 'src/dto/item.dto';
import { CreateOrderDto, OrderDto, UpdatedOrderDto, UpdateOrderDto } from 'src/dto/orders.dto';
import { Item } from 'src/entities/item.entity';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) {}

    async getAll(page: number = 1, limit: number = 10, status?) {
        const [orders, total] = (await this.orderRepository.findAndCount({
            where: status ? { status } : {},
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'ASC' },
        }));
        const ordersDto: OrderDto[] = await Promise.all(this.toOrderDto(orders));
        const pages: number = Math.ceil(total/limit);
        return [ordersDto, pages];
    }

    async getOne(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({ where: { id } });
        if(order){
            return order;
        } else {
            throw new NotFoundException;
        }
    }

    async findOrder(id: number): Promise<OrderDto> {
        const order = await this.getOne(id);
        console.log(order);
        const orderDto = (await Promise.all(this.toOrderDto([order])))[0];
        return orderDto;
    }

    async create(orderDto: CreateOrderDto) {
        const order = {
            customer_name: orderDto.customerName,
            status: orderDto.status,
            datetime: new Date().toISOString(),
        };
        const newOrder = await this.orderRepository.save(order);
        orderDto.items.forEach(async (itemDto: ItemDto) => {
            const item = await this.itemRepository.save({
                ...itemDto,
                order_id: newOrder.id,
            });
            console.log(item.id)
        })
    }

    async update(id: number, updatedOrder: UpdateOrderDto): Promise<UpdatedOrderDto> {
        const order = await this.getOne(id);
        Object.assign(order, updatedOrder);
        await this.orderRepository.save(order);
        return {
            id: order.id,
            customerName: order.customer_name,
            status: order.status,
            items: [], 
            updatedAt: new Date().toISOString()
        };
    }

    async delete(id: number): Promise<OrderDto> {
        const order = await this.getOne(id);
        const orderDto = await Promise.all(this.toOrderDto([order]))[0];
        const result = await this.orderRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException;
        }
        return orderDto;
    }

    async getItems(order_id: number): Promise<ItemDto[]>{
        const items = await this.itemRepository.find({ where: { order_id } });
        return items.map(item => {
            const itemDto = new ItemDto();
            itemDto.productId = item.id;
            itemDto.quantity = item.quantity;
            return itemDto;
        });
    }

    toOrderDto(orders: Order[]) {
        return orders.map(async order => {
            const orderDto: OrderDto = {
                id: order.id,
                customerName: order.customer_name,
                status: order.status,
                items: await this.getItems(order.id),
                createdAt: order.datetime,
            };
            return orderDto;
        })
    }
}
