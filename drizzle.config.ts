import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    schema:'./src/schema.ts',
    out:'./drizzle',
    dialect:'postgresql',
    dbCredentials:{
        host:"localhost",
        port: 5433,
        user: "postgres",
        password: "R3v@y2002",
        database:"hono"
    }
})