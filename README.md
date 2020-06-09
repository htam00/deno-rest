# Restful API with Deno

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
