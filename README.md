# Welcome!

This is a simple example of a basic web platform.

## API

The backend API is based on [Adonis framework](https://preview.adonisjs.com/), which is a Node.js Framework focused on developer ergonomics, stability and speed.

### Getting started

These guides are designed to help you get up and running with this setup.

#### Requirements

`Node.js >= 12.0.0` is required, along with `npm >= 6.0.0`. You can check the version of Node.js and npm by running the following commands.

```sh
node -v
# v12.14.1

npm -v
# 6.13.7
```

With those in place, you can install the required packages by running:

```sh
npm install
```

#### Creating and seeding database tables

```sh
npm run migrations
npm run seed
```

#### Starting the Development Server

```sh
npm run dev
```

The serve command will start the HTTP server and performs in-memory compilation of Typescript to Javascript. The --watch flag is meant to watch the file system for changes and re-start the server automatically.

#### Compiling For Production

When you are ready, you can easly generate a standalone build for production. It means, you can deploy the compiled output without moving the source files to the production server. The standalone builds are really helpful in creating slim docker images.

Run the following command to create a production build:

```sh
npm run build
```
The above command performs the following steps in sequence.

- Compile TypeScript source files to Javascript.
- Copy `metaFiles` mentioned inside `.adonisrc.json` to the build folder.
- Copy `package.json`, along with `package-lock.json` or `yarn.lock` inside the build folder.

At this stage, you can upload the build folder to your production server, install the dependencies and run `node server.js` to start the server.

### Routes

- `GET /health` - Returns a health check report
- `GET /books` - Returns a list of books in the database in JSON format
- `GET /books/{{id}}` - Returns a detail view of the specified book id
- `GET /authors` - Returns a list of authors in the database in JSON format
- `GET /authors/{{id}}` - Returns a detail view of the specified author id


### Utility commands

```sh
node ace list:routes
```
