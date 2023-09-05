import { Surreal } from "https://deno.land/x/surrealdb@v0.8.4/mod.ts";

export type User = {
    id: string;
    name: { first: string; last: string};
    age: number;
}

// surrealdb - is the container name in the docker, 
// insted of localhost on the machine. 
const db = new Surreal('http://localhost:8000/rpc');

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

export async function DBInsert(table: string, data: any) {
    let created;

    try {
        created = await db.create<User>(table, data);

    } catch (e) {
        console.log('ERROR',e);
        throw e;
    }

    return created;
}

export async function DBUpdate(id: string, data: any){
    let updated;
    
    try{
        updated = await db.merge<User>(id, data);
    } catch (e) {
        console.log('ERROR',e);
        throw e;
    }
    
    return updated;
}

export async function DBSelect(table: string){
    let people;
    
    try {
        people = await db.select<User>(table);
    } catch (e) {
        console.log('ERROR',e);
        throw e;
    }
    
    return people;
}

export async function DBDelete(table: string){
    let deleted;
    try {
        deleted = await db.delete(table);
    } catch (e) {
        console.log('ERROR',e);
        throw e;
    }
    
    return deleted;
}

export async function DBQuery(query: string, vars: any){
    let groups;

    try {
        groups = await db.query(query, vars);

    } catch (e) {
        console.log('ERROR',e);
        throw e;    
    }

    return groups;
}