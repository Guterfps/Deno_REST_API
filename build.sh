curl -sSf https://install.surrealdb.com | sh
surreal start --log trace --user root --pass root --auth memory
deno start