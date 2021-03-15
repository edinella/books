# Welcome!

This is a simple example of a basic web platform.

## About the Stack

### Frontend

The frontend is based on [Nuxt](https://nuxtjs.org/),
The Intuitive [Vue](https://vuejs.org/) Framework.

### Backend

The backend API is based on [Adonis framework](https://preview.adonisjs.com/),
which is a Node.js Framework focused on developer ergonomics, 
stability and speed.

### Database

The API stores data on a MariaDB database, for the purposes of this example.

> 💡 This is 
> [easly changeable](https://preview.adonisjs.com/guides/database/setup) 
> thanks to Lucid ORM.

## Running locally

These guides are designed to help you get up and running with this setup.
The recommended flow is to:
- Ensure that requirements are met
- Start services
- Create and seed database tables
- Have fun

### Ensure that requirements are met

#### Node.js & NPM

`Node.js >= 12.0.0` is required, along with `npm >= 6.0.0`.
You can check the version of Node.js and npm by running the following commands.

```sh
node -v
# v12.14.1

npm -v
# 6.13.7
```

#### Docker Desktop & Tilt

Follow [Tilt](https://docs.tilt.dev/install.html) installation instructions.

### Start services

Starting services on local Kubernetes:

```sh
tilt up
```

> 💡 ...stopping services is also very easy:
> 
> ```sh
> tilt down
> ```

The services are:
- db
- backend
- frontend

You can see their state and logs on Tilt interface.

### Create and seed database tables

With services running, you should run database migrations in order to create
the DB structure, and seed these structure with example data.

First we need to install the backend dependencies, as the migrations are powered
by our Lucid ORM.

```sh
cd backend
npm install
```

You also need to have a APP_KEY env var with some secret key of your choice:
```
APP_KEY=Mgf3U_4YLiupZjigCXrHEzKjf1PXyLm9
```

> 💡 Important: The services must be running, since the next commands will 
> access the database.
 
Run the migrations:

```sh
npm run migrations
```

Seed the tables with example data:

```sh
npm run seed
```

... and go back to the original directory.

```sh
cd ..
```

### Have fun

Now you can open the browser on this address:

`http://localhost:8080`

## Development

Running Backend tests:

```sh
cd backend
DB_CONNECTION=sqlite; \
  npm test
```

Running Backend for developing:

```sh
cd backend
DB_CONNECTION=sqlite; \
  npm run migrations; \
  npm run seed; \
  npm run dev
```

Running Frontend for developing:

```sh
npm run dev
```

> 💡 You may want to run backend and frontend at same time on different terminal
> instances.
