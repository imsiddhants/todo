# Todo App

## Introduction

This is a simple Todo app backend using Node.js and Express.js with PostgreSQL for data storage. The app supports basic CRUD operations for todos and includes passwordless user authentication using magic links.

## Requirements

- Node.js
- PostgreSQL

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/todo-app.git
    cd todo-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    DATABASE_URL=postgresql://username:password@localhost:5432/todoapp
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    ```

4. Set up the database:
    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE todos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

5. Start the server:
    ```sh
    npm start
    ```

6. For development, use:
    ```sh
    npm run dev
    ```

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Testing

To run tests:
```sh
npm test
