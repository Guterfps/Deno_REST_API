import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";
import { DBSetUp, DBInsert, DBSelect, DBUpdate, DBDelete, DBQuery, User } 
from "../db.ts"

await DBSetUp();

Deno.test("url test", () => {
    const url = new URL("./main.ts", "https://deno.land/");
    assertEquals(url.href, "https://deno.land/main.ts");
});

const NUM_OF_USERS = 1000;

Deno.test("db insert test", async () => {
    for (let i = 0; i < NUM_OF_USERS; ++i) {
        let user = { name:{first: "first" + i, last: "last" + i}, age: i };
        let response = await DBInsert("users", user);
        if (undefined === response) {
            throw new Error("error");
        }
        assertEquals(response[0].age, i);
        assertEquals(response[0].name.first, "first" + i);
        assertEquals(response[0].name.last, "last" + i);
    }
    let users: User[] = await DBSelect("users");
    assertEquals(users.length, NUM_OF_USERS);
})

Deno.test("db select test", async () => {
    let users: User[] = await DBSelect("users");
    for (let i = 0; i < NUM_OF_USERS; ++i) {
        let response = await DBSelect(users[i].id);
        if (undefined === response) {
            throw new Error("error");
        }
        assertEquals(response[0].age, users[i].age);
        assertEquals(response[0].name.first, users[i].name.first);
        assertEquals(response[0].name.last, users[i].name.last);
    }
})

Deno.test("db update test", async () => {
    let users: User[] = await DBSelect("users");
    for (let i = 0; i < NUM_OF_USERS; ++i) {
        let response = await DBUpdate(users[i].id, {age: i + 1});
        if (undefined === response) {
            throw new Error("error");
        }
        assertEquals(response[0].age, i + 1);
        assertEquals(response[0].name.first, users[i].name.first);
        assertEquals(response[0].name.last, users[i].name.last);
    }
})

Deno.test("db delete test", async () => {
    let users: User[] = await DBSelect("users");
    for (let i = 0; i < NUM_OF_USERS; ++i) {
        let response = await DBDelete(users[i].id);
        if (undefined === response) {
            throw new Error("error");
        }
        let response2 = await DBSelect(users[i].id);
        if (undefined === response2) {
            throw new Error("error");
        }
        assertEquals(response2.length, 0);
    }

    users = await DBSelect("users");
    assertEquals(users.length, 0);
})
