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
