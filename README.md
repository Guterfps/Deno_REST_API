# Deno REST API with SurrealDB (Dockerized)

A simple REST API built with Deno, Oak, and SurrealDB, running in Docker containers.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The Deno REST API with SurrealDB is a lightweight RESTful API built with Deno, Oak (a middleware framework for Deno), and SurrealDB, running inside Docker containers. It provides a simple structure for building and deploying RESTful services using Deno's secure runtime environment with SurrealDB as the backend database.

## Getting Started

### Prerequisites

Before you begin, ensure you have Docker installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Guterfps/Deno_REST_API.git

2. Navigate to the project directory:
    ```bash
    cd Deno_REST_API

3. Build and start the Docker containers:
    ```bash
    docker-compose up -d
    ```
    or:
    ```bash
    ./build.sh

### Usage

you can run tests with:
    ```bash
    ./tests.sh

you can also add/change tests in the `tests` dir

### EndPoints

Routs can be added/changed, as well as db usage(very flexible).

- `GET /users`: Get all users.
- `GET /users/:id`: Get a user by ID.
- `POST /users`: Create a new user.
- `PUT /users`: Update all users.
- `PUT /users/:id`: Update a user by ID.
- `DELETE /users`: Delete all users.
- `DELETE /users/:id`: Delete a user by ID.
