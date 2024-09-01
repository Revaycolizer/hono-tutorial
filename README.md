## TO CREATE A FRESH PROJECT USING NODE

## FOLLOW BELOW INSTRUCTIONS 
```bash
npm create hono@latest
```
## Install bcrypt for password hashing and comparison

```bash
npm install bcrypt
```

```bash
npm install --save @types/bcrypt
```

## To install Drizzle kit

```bash
npm install --save  drizzle-kit
```

## To instal Postgres Driver
```bash
npm install drizzle-orm pg
```

```bash
npm install --save drizzle-kit @types/pg
```

## Create a drizzle.config.ts file and add this
```bash
import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    schema:'./src/schema.ts',
    out:'./drizzle',
    dialect:'postgresql',
    dbCredentials:{
        host:"localhost",
        port: 5433,
        user: "postgres",
        password: "password",
        database:"hono"
    }
})
```
## Create a migrate.ts file inside src folder and add this
```bash

import { client, db } from "../client";
import {migrate} from 'drizzle-orm/node-postgres/migrator'


async function Migrate(){
await migrate(db,{migrationsFolder:'./drizzle'});

 await client.end();
}

Migrate();
```

## Create a client.ts file and add this
```bash
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from './src/schema';

export const client = new Client({
  host: "localhost",
  port: 5433,
  user: "postgres",
  password: "password",
  database: "hono",
});

async function connectClient() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully');
  } catch (err) {
    console.error('Failed to connect to PostgreSQL', err);
    process.exit(1); 
  }
}

connectClient();

export const db = drizzle(client, { schema });

process.on('exit', async () => {
  await client.end();
  console.log('Disconnected from PostgreSQL');
});
```

## Generate Migration
```bash
bunx drizzle-kit generate
```

## To Run Migration:
```bash
npx src/migrate.ts
```
## To View Database
```bash
npx drizzle-kit studio
```
## OR
```bash
npx drizzle-kit studio --port 3000
```

## To run:
```sh
npm run dev
```
open http://localhost:3000

## INCASE YOU CLONED THE REPO USE THIS SCRIPTS ONLY

## To install dependencies:
```sh
bun install
```
## Generate Migration
```bash
bunx drizzle-kit generate
```

## To Run Migration:
```bash
bunx src/migrate.ts
```
## To View Database
```bash
bunx drizzle-kit studio
```
## OR
```bash
bunx drizzle-kit studio --port 3000
```

## To run:
```sh
bun run dev
```
open http://localhost:3000


## Incase you want to start a new project from Scratch
## Proceed with the Instructions Below

## Create a new Project
```bash
bun create hono@latest
```
 
## To install Drizzle kit

```bash
bun add -D drizzle-kit
```

## To instal Postgres Driver
```bash
bun add drizzle-orm pg
```

```bash
bun add -D drizzle-kit @types/pg
```

## Create a drizzle.config.ts file and add this
```bash
import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    schema:'./src/schema.ts',
    out:'./drizzle',
    dialect:'postgresql',
    dbCredentials:{
        host:"localhost",
        port: 5433,
        user: "postgres",
        password: "password",
        database:"hono"
    }
})
```
## Create a migrate.ts file inside src folder and add this
```bash

import { client, db } from "../client";
import {migrate} from 'drizzle-orm/node-postgres/migrator'


async function Migrate(){
await migrate(db,{migrationsFolder:'./drizzle'});

 await client.end();
}

Migrate();
```

## Create a client.ts file and add this
```bash
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from './src/schema';

export const client = new Client({
  host: "localhost",
  port: 5433,
  user: "postgres",
  password: "password",
  database: "hono",
});

async function connectClient() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully');
  } catch (err) {
    console.error('Failed to connect to PostgreSQL', err);
    process.exit(1); 
  }
}

connectClient();

export const db = drizzle(client, { schema });

process.on('exit', async () => {
  await client.end();
  console.log('Disconnected from PostgreSQL');
});
```

## Generate Migration
```bash
bunx drizzle-kit generate
```

## To Run Migration:
```bash
bunx src/migrate.ts
```
## To View Database
```bash
drizzle-kit studio
```
## OR
```bash
drizzle-kit studio --port 3000
```




