import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";

const NUM_OF_USERS: number = 1000;
const API_URL: string = "http://deno:3000/users";
let ids: string[] = [];

Deno.test("Inserting users", async () => {
    for (let i = 0; i < NUM_OF_USERS; ++i)
    {
        let body = `{"name" : {"first": "test_first_${i}", "last": "test_last_${i}" }, 
                    "age": ${i}}`
        let response = await fetch(`${API_URL}/`, {
        
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: body
        })

        assertEquals(response.status, 200);
        let data = await response.json();
        assertEquals(data[0].name.first, `test_first_${i}`);
        assertEquals(data[0].name.last, `test_last_${i}`);
        assertEquals(data[0].age, i);
        ids.push(data[0].id);
    }

    let response2 = await fetch(`${API_URL}/`, {
        method : "GET",
        headers: { "Content-Type": "application/json" }
    })
    let data2 = await response2.json();
    assertEquals(data2.length, NUM_OF_USERS);
})

Deno.test("Getting users", async () => {
    for (let i = 0; i < NUM_OF_USERS; ++i)
    {
        let response = await fetch(`${API_URL}/${ids[i]}`, {
            method: "GET", 
            headers: { "Content-Type": "application/json" }
        });
    
        assertEquals(response.status, 200);
        let data = await response.json();
        assertEquals(data[0].name.first, `test_first_${i}`);
        assertEquals(data[0].name.last, `test_last_${i}`);
        assertEquals(data[0].age, i);
        assertEquals(data[0].id, ids[i]);
    }
})

Deno.test("Updating users", async () => {
    for (let i = 0; i < NUM_OF_USERS; ++i)
    {
        let body = `{"name" : {"first": "test_first_${i}_updated", "last": 
                                "test_last_${i}_updated" }}`
        let response = await fetch(`${API_URL}/${ids[i]}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: body
        })
    
        assertEquals(response.status, 200);
        let data = await response.json();
        assertEquals(data[0].name.first, `test_first_${i}_updated`);
        assertEquals(data[0].name.last, `test_last_${i}_updated`);
        assertEquals(data[0].age, i);
        assertEquals(data[0].id, ids[i]);
    }

    let response2 = await fetch(`${API_URL}/`, {
        method : "GET", 
        headers: { "Content-Type": "application/json" }
    })

    let data2 = await response2.json();
    assertEquals(data2.length, NUM_OF_USERS);
})

Deno.test("Deleting users", async () => {
    for (let i = 0; i < NUM_OF_USERS; ++i)
    {
        let response = await fetch(`${API_URL}/${ids[i]}`, {
            method : "DELETE", 
            headers: { "Content-Type": "application/json" }
        })
    
        assertEquals(response.status, 200);
        let data = await response.json();
        assertEquals(data[0].id, ids[i]);
        assertEquals(data[0].name.first, `test_first_${i}_updated`);
        assertEquals(data[0].name.last, `test_last_${i}_updated`);
        assertEquals(data[0].age, i);
    }

    let response2 = await fetch(`${API_URL}/}`, {
        method : "GET", 
        headers: { "Content-Type": "application/json" }
    })

    let data2 = await response2.json();
    assertEquals(data2.length, 0);
})
