import { Application, Context, Router } from 'https://deno.land/x/oak/mod.ts';

import { DBSetUp, DBInsert, DBSelect, DBUpdate, DBDelete, DBQuery } 
from "./db.ts"

const PORT = 3000;
const app = new Application();
const router = new Router();

await DBSetUp();

const logging = async (ctx: Context, next: Function) => {
    console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
    await next();
};

app.use(logging);
  
router.get('/users/:id?', async(ctx) => {
    try {
        let id = ctx.params.id
        id = id ? id : 'users';
        ctx.response.body =  await DBSelect(id);
    } catch (e) {
         ctx.response.body = e;
    }
});

router.post('/users/', async (ctx) => {
    try {
        ctx.response.body = await DBInsert('users', await ctx.request.body().value);
    } catch (e) {
         ctx.response.body = e;
    }
});

router.put('/users/:id?', async (ctx) => {
    try{
        let id = ctx.params.id
        id = id ? id : 'users';
        ctx.response.body = await DBUpdate(id, await ctx.request.body().value);
    } catch (e) {
        ctx.response.body = e;
    }
});

router.delete('/users/:id?', async (ctx) => {
    try {
        let id = ctx.params.id
        id = id ? id : 'users';
        ctx.response.body = await DBDelete(id);
    } catch (e) {
         ctx.response.body = e;
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${PORT}`);
});

await app.listen({ port: PORT });