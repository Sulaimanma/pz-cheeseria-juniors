import { Schema, model } from 'mongoose';

// Create the CartItemType
export interface CartItemType {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
  }
  
  const CartItemSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    category: { type: String, required: true, unique: false },
    description: { type: String, unique: false },
    image: { type: String, unique: false },
    price: { type: String, required: true, unique: false },
    title: { type: String, required: true, unique: false },
    amount: { type: String, required: true, unique: false },
  });
  
  export default model<CartItemType>('CartItem', CartItemSchema);