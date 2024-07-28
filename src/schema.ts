import { password } from "bun";
import { bigint, numeric, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('users',{
    id:bigint('id',{mode:'number'}).primaryKey().generatedByDefaultAsIdentity(),
    name:text('name'),
    password:varchar('password')
})

export const products = pgTable('items',{
    id:bigint('id',{mode:'number'}).primaryKey().generatedByDefaultAsIdentity(),
    name:text('name'),
    price:bigint('price',{mode:'number'}),
    src:text('src'),
    userId:bigint('userId',{mode:'number'}).references(()=>users.id)
})