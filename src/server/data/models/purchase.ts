import { Schema, model } from 'mongoose';

// Create the PurchaseRecordType
export interface PurchaseRecordType {
  id: string;
  amount: number;
  description: string;
  image: string;
  price: string;
  purchaseTime: string;
  title: string;
}

//Schema for validating the purchase record
const PurchaseSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  amount: { type: String, required: true, unique: false },
  description: { type: String, unique: false },
  image: { type: String, unique: false },
  price: { type: String, required: true, unique: false },
  purchaseTime: { type: String, required: true, unique: false },
  title: { type: String, required: true, unique: false },
});

export default model<PurchaseRecordType>('Purchase', PurchaseSchema);
