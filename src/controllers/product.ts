import axios from "axios";
import { Request, Response } from "express";
import { ExternalProduct } from "../types/product";
import Price from "../models/price";

// get product by id
export const getProductById = async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    try {
        console.log(`Request received for product ID: ${id}`);

        const response = await axios.get<ExternalProduct>(`${process.env.FAKE_STORE_API_URL}products/${id}`);

        console.log("Fetched external product:", response.data);

        const price = await Price.findOne({ productId: id });

        console.log("Fetched price from DB:", price);

        return res.json({
            id: response.data.id,
            title: response.data.title,
            current_price: price
                ? { value: price?.value, currency_code: price?.currency_code }
                : null
        });

    } catch (error: any) {

        console.error("ERROR in getProductById:", error.message, error);

        res.status(500).json({ message: "Error in fetching product" });
    }
};


// update product price
export const updateProductPrice = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { current_price } = req.body;

    try {
        const updated = await Price.findOneAndUpdate(
            { productId: id },
            { ...current_price, productId: id },
            { upsert: true, new: true }
        );

        return res.json({ message: 'Price updated', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error in updating price' });
    }
};