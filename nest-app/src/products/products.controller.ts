import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() data: Product) {
    return await this.productsService.create(data);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const one = await this.productsService.findOne(id);
    if (one) {
      return one;
    }
    throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Product) {
    const one = await this.productsService.update(id, data);
    if (one) {
      return one;
    }
    throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const one = await this.productsService.remove(id);
    if (one) {
      return one;
    }
    throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);
  }
}
