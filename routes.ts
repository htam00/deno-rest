import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getProducts, getProduct, addProduct, deleteProduct } from './controllers/products.ts';

const router = new Router();

router.get('/api/v1/products', getProducts)
    .get('/api/v1/products/:id', getProduct)
    .post('/api/v1/products', addProduct)
    .delete('/api/v1/products/:id', deleteProduct)

export default router;
