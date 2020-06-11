import { Application, HttpException } from 'https://deno.land/x/abc@v1.0.0-rc2/mod.ts';
import { getProducts, getProduct, addProduct, deleteProduct } from './controllers/products.ts'; 
import { ErrorMiddleware } from './utils/middleware.ts';

const port = 8000;
const app = new Application();

app.use(ErrorMiddleware);
app.get('/api/v1/products', getProducts)
   .get('/api/v1/products/:id', getProduct)
   .post('/api/v1/products', addProduct)
   .delete('/api/v1/products/:id', deleteProduct)
   .start({ port: port })

console.log(`Server running on port ${port}`);

/*
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen({ port });
*/