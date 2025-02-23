# User and Docs Management API

This is a API Application for managing users and documents. It provides endpoints for user authentication, document upload, retrieval, and management.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from Node.js official website.
- **npm**: Node Package Manager, which comes with Node.js.
- **NestJS**: This application is built using the NestJS framework. You can install it globally using npm:
  ```bash
  npm install -g @nestjs/cli
  ```
- **Postgres** : For installing the PostgreSQL database via docker. Use the following command
docker: 
```bash
  docker run --name nestjs-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=user-docs-mgt -p 5432:5432 -d postgres
```

## Installation

### Clone the repository:

```bash
git clone https://github.com/Durgakanna/user-docs-mgt.git
cd user-docs-mgt
```
### Install the dependencies
```bash
npm install
```

### Set values in .env file
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=your-database
JWT_SECRET=your-jwt-secret
```

### Start the server
```bash
npm run start
```

## Swagger
see documentation [here](http://localhost:8000/api)

