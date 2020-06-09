import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getProducts, getProduct, addProduct } from './controllers/products.ts';

const router = new Router();

router.get('/api/v1/products', getProducts)
    .get('/api/v1/products/:id', getProduct)
    .post('/api/v1/products', addProduct)

export default router;
