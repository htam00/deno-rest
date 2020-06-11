import { Router } from 'https://deno.land/x/oak/mod.ts';
import { addProduct } from './controllers/products.ts';

const router = new Router();

router.post('/api/v1/products', addProduct)

export default router;
