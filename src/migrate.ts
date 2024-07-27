
import { client, db } from "../client";
import {migrate} from 'drizzle-orm/node-postgres/migrator'


async function Migrate(){
await migrate(db,{migrationsFolder:'./drizzle'});

 await client.end();
}

Migrate();