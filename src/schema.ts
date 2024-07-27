import { password } from "bun";
import { bigint, numeric, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('user',{
    id:serial('id').primaryKey(),
    name:text('name'),
    password:varchar('password')
})

export const products = pgTable('product',{
    id:serial('id').primaryKey(),
    name:text('name'),
    price:bigint('price',{mode:'number'}),
    src:text('src'),
    userId:serial('userId').references(()=>users.id)
})