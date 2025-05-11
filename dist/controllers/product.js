"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductPrice = exports.getProductById = void 0;
const axios_1 = __importDefault(require("axios"));
const price_1 = __importDefault(require("../models/price"));
// get product by id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        console.log(`Request received for product ID: ${id}`);
        const response = yield axios_1.default.get(`${process.env.FAKE_STORE_API_URL}products/${id}`);
        console.log("Fetched external product:", response.data);
        const price = yield price_1.default.findOne({ productId: id });
        console.log("Fetched price from DB:", price);
        return res.json({
            id: response.data.id,
            title: response.data.title,
            current_price: price
                ? { value: price === null || price === void 0 ? void 0 : price.value, currency_code: price === null || price === void 0 ? void 0 : price.currency_code }
                : null
        });
    }
    catch (error) {
        console.error("ERROR in getProductById:", error.message, error);
        res.status(500).json({ message: "Error in fetching product" });
    }
});
exports.getProductById = getProductById;
// update product price
const updateProductPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { current_price } = req.body;
    try {
        const updated = yield price_1.default.findOneAndUpdate({ productId: id }, Object.assign(Object.assign({}, current_price), { productId: id }), { upsert: true, new: true });
        return res.json({ message: 'Price updated', data: updated });
    }
    catch (error) {
        res.status(500).json({ message: 'Error in updating price' });
    }
});
exports.updateProductPrice = updateProductPrice;
