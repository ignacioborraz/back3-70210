import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() data: Product) {
    return this.productsService.create(data);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const one = this.productsService.findOne(id);
    if (one) {
      return one;
    }
    throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Product) {
    const one = this.productsService.update(id, data);
    if (one) {
      return one;
    }
    throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const one = this.productsService.remove(id);
    if (one) {
      return one;
    }
    throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);
  }
}
