import { Surreal } from "https://deno.land/x/surrealdb@v0.8.4/mod.ts";

type User = {
    id: string;
    name: { first: string; last: string};
    age: number;
}

const db = new Surreal('http://127.0.0.1:8000/rpc');

export async function DBSetUp(){
    try {
        await db.signin({user: 'root', pass: 'root'});
        await db.use({ns: 'test', db: 'test'});
    }
    catch (e)
    {
        console.log('ERROR',e);
    }
}

export async function DBInsert(table: string, data: any){
    let created;

    try {
        created = await db.create<User>(table, data);

    } catch (e) {
        console.log('ERROR',e);    
    }

    return created;
}

export async function DBQuery(query: string, vars){
    let groups
    try {
        groups = await db.query(query, vars);

    } catch (e) {
        console.log('ERROR',e);    
    }
    return groups;
}

export async function DBUpdate(id: string, data: any){
    let updated = await db.merge<User>(id, data);
    return updated;
}

export async function DBSelect(table: string){
    let people = await db.select<User>(table);
    return people;
}


export async function DBDelete(table: string){
    let deleted = await db.delete(table);
    return deleted;
}