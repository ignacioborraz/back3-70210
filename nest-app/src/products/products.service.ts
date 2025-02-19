import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class ProductsService {
  products: Array<Product>;
  constructor() {
    this.products = [];
  }
  create(data: Product) {
    const _id: string = randomBytes(12).toString('hex');
    data = { ...data, _id };
    this.products.push(data);
    return data;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find((each) => each._id === id);
  }

  update(id: string, data: Product) {
    const index: number = this.products.findIndex(
      (product: Product) => product._id === id,
    );
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...data };
      return this.products[index];
    }
    const one: Product = this.products[index];
    return one;
  }

  remove(id: string) {
    const index: number = this.products.findIndex(
      (each: Product) => each._id === id,
    );
    const one: Product = this.products[index];
    if (index !== -1) {
      return this.products.splice(index, 1);
    }
    return one;
  }
}
