## To install dependencies:
```sh
bun install
```

## To run:
```sh
bun run dev
```

open http://localhost:3000

## To install Drizzle kit

```bash
bun add -D drizzle-kit
```

## To instal Postgres Driver
```bash
bun add drizzle-orm/pg
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
## Create a migrate.ts file and add this
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
  password: "R3v@y2002",
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




