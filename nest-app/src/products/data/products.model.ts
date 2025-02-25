import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class Product {
  @Prop() title: string;
  @Prop({ default: 10 }) price: number;
  @Prop({ default: 100 }) stock: number;
  @Prop({ enum: ['phones', 'computers', 'accesories'], default: 'computers' })
  category: string;
}

type ProductDocument = HydratedDocument<Product>;
const ProductSchema = SchemaFactory.createForClass(Product);
export { Product, ProductDocument, ProductSchema };
