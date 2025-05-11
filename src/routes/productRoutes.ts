import { Router } from 'express';
import { getProductById, updateProductPrice } from '../controllers/product';

const router = Router();

router.get('/:id', getProductById);
router.put('/:id', updateProductPrice);

export default router;
