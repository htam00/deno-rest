# Deno RestAPI
Olá Devs, iremos criar um REST API simples em deno.
Antes começarmos, sabia que o deno por default, usa typescript, então se voçê não conhece ou não está muito familiarizado com o typescript aconselho estudar, e entender como o ele trabalha, para você não ficar perdido. Mais caso você já conheça e se sente confortavel em devolver com  typescript então vamos seguir.

Agora vamos parar de papo, e vamos colocar a mão na massa.

Antes olhe se já você já tem o deno instalado no seu ambiente de trabalho, caso não tenha clique neste link, que lá eu mostro como fazer a instalação, blz.
E escolha o editor de sua preferencia, eu estou usando o VSCode e aconselho usá-lo, mas você pode opitar por outro. Ok vamos nessa.

# Estrutura do Projeto

#### Iniciando o Servidor
No node.js usamos muito a framework express, para criarmos nosso servidor. Mais aqui iremos usar uma framework chamado Oak, que é inspirado no Koa.

vamos criar um arquivo chamado server.ts, depois dentro do arquivo vamos dá um import Application from [https://deno.land/x/oak/mod.ts](https://deno.land/x/oak/mod.ts).

```javascript

import { Application } from 'https://deno.land/x/oak/mod.ts';
const port = 8080

console.log(`Server running on the ${port}`);
```

#### Routes
Agora vamos passar nossas rotas.

vamos criar um arquivo chamado `routes.ts` e import o Router do arquivo [https://deno.land/x/oak/mod.ts](https://deno.land/x/oak/mod.ts). E criar os routes da sua API.
```javascript
import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getHeroes } from './controllers/heroes.ts';

const router = new Router();

router.get('/api/v1/heroes', getHeroes)
    .get('/api/v1/heroes/:id', getHero)
    .post('/api/v1/heroes', addHero)
    .put('/api/v1/heroes/:id', updateHero)
    .delete('/api/v1/heroes/:id', deleteHero)

export default router;
```

#### Controllers
Vamos criar uma pasta chamado controllers, nela iremos controlar todo o fluxo.
```bash
$ mkdir controllers
```

Agora vamos criar um arquivo chamado products.ts, nele iremos escrever as regras de negocios e controlar o fluxo da api dos produtos.
```bash
$ cd controllers && touch products.ts
```

Vamos importar para dentro deste arquivo o types.ts, ele define a tipagem do Product, e tambem vamos importar o v4, ele serve para criar um objectID.
```javascript
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Product } from '../types.ts';

let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        description: "this is one product",
        price: 10.00
    },
    {
        id: "2",
        name: "Product Two",
        description: "this is two product",
        price: 20.00
    },
    { 
        id: "3",
        name: "Product Three",
        description: "this is three product",
        price: 30.00
    }
];

export const getProducts = ({ response }: { response: any}) => {
    response.body = {
        success: true,
        data: products
    }
}

export const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(product => product.id === params.id);

    if(product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: "No product found"
        }
    }
}

export const addProduct = async ({ request, response }: { request: any, response: any}) => {
    const body = await request.body()

    if(!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No Data'
        }
    } else {
        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

export const updateProduct = async({ params, request, response}: { params: { id: string }, request: any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)
    if(product) {
        const body = await request.body()
        const updateData: { name?: string, description?: string, price?: number } = body.value
        products = products.map(p => p.id === params.id ? {...p, ...updateData } : p)
        
        response.status = 200
        response.body = {
            success: true,
            data: products
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

export const deleteProduct = async({params, response}: { params: { id: string }, response: any }) => {
    products = products.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        msg: "Product removed"
    } 
}
```
Aqui eu criei alguns produtos como exemplo, mais você pode adicionar mais ou atê mesmo integrar com um banco de dados de sua preferencia, para brincar mais.

Pronto. Agora iremos criar o arquivo types.ts, nele agente irá criar a tipagem do nosso objeto Product.
```typescript
type interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
}
```
Note que criamos o Product com 4 valores.

> :warning: Dica: Não coloque o deno ainda em produção em seus projetos reais não, porque ele ainda, está bebê.

Ok, obrigado por dedicar se tempo aqui, se foi relevante deixe nos comentarios. E em caso de duvidas deixe nos comentários que irei responder-lo.
