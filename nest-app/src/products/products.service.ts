import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { ProductDocument } from './data/products.model';

@Injectable()
export class ProductsService {
  products: Array<Product>;
  constructor(
    @InjectModel('Product') private ProductModel: Model<ProductDocument>,
  ) {}

  async create(data: Product) {
    const one = await this.ProductModel.create(data);
    return one;
  }

  async findAll() {
    const all = await this.ProductModel.find();
    return all;
  }

  async findOne(id: string) {
    const one = await this.ProductModel.findById(id);
    return one;
  }

  async update(id: string, data: Product) {
    const one = await this.ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return one;
  }

  async remove(id: string) {
    const one = await this.ProductModel.findByIdAndDelete(id);
    return one;
  }
}
