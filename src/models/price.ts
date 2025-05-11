import mongoose, { Document, Schema } from "mongoose";

export interface IPrice extends Document {

    productId: number;
    value: number;
    currency_code: string;

};

const priceSchema: Schema = new Schema({

    productId: {
        type: Number,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true
    },
    currency_code: {
        type: String,
        required: true
    }
});

const Price = mongoose.model<IPrice>('Price', priceSchema);
export default Price;