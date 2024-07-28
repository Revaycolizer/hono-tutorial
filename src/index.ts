import { Hono as Todo } from 'hono'
import { db } from '../client'
import { products, users } from './schema'
import { eq,and } from 'drizzle-orm'
import * as jwt from 'jsonwebtoken'
import {bearerAuth} from "hono/bearer-auth"
const JWT_SECRET = 'your_secret_key';

const app = new Todo()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/users',async(c)=>{
  const user = await db.select({
    id:users.id,
    name:users.name,
  }).from(users);

  return c.json(user)
})
app.post('/register',async(c)=>{
  const body = await c.req.json()

  const {name,password} = body

if(!name || !password){
  return c.json({message:"name and password are required"},400)
}

const existingUser = await db.select().from(users).where(eq(users.name,name))

if(existingUser.length > 0){
  return c.json({message:"user already exists"},400)
}
const hashedPassword = await Bun.password.hash(password)

  const user = await db.insert(users).values({ name: name , password: hashedPassword}).returning({id:users.id,name:users.name});
  return c.json(user)
})

app.post("/login",async(c)=>{
  const body = await c.req.json()

  const {name,password} = body

  if(!name || !password){
    return c.json({message:"name and password are required"},400)
  }

  const user = await db.select().from(users).where(eq(users.name,name))

  if(!user){
    return c.json({message:"User does not exist"},400)
  }
  const matchingPassword = user[0].password as string

  const isMatch = await Bun.password.verify(password,matchingPassword)

  if(!isMatch){
    return c.json({message:"Incorrect credentials"},400)
  }

  const token = jwt.sign(
    { id: user[0].id, }, 
    JWT_SECRET,
    { expiresIn: '1h' } 
  );

  return c.json(token)

})

app.get("/user",async(c)=>{
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
  return c.json({ message: 'Unauthorized' }, 401); 
  }

 
  const token = authHeader?.substring(7);

  try{
    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded.length <0){
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const userId = (decoded as { id: number }).id;

    const user = await db.select({
      id:users.id,
      name:users.name
    }).from(users).where(eq(users.id,userId))
    return c.json(user)
    
  }catch(error){
  return c.json({message:"Internal Server Error"},500)
  }
  
})


app.post("/create-product",async(c)=>{
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
  return c.json({ message: 'Unauthorized' }, 401); 
  }

 
  const token = authHeader?.substring(7);

  try{
    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded.length <0){
      return c.json({ message: 'Unauthorized' }, 401);
    }

     const userId = (decoded as { id: number }).id;

     const user = await db.select().from(users).where(eq(users.id,userId))

     if(!user){
       return c.json({message:"User does not exist"},400)
     }

  const body = await c.req.json()

  const {name,price,src} = body
 
    const product = await db.insert(products).values({ name: name , price: price,src:src,userId:userId}).returning({id:products.id,name:products.name});
  return c.json(product)
    
  }catch(error){
  return c.json({message:"Internal Server Error"},500)
  }
  
})

app.post("/update-product",async(c)=>{
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
  return c.json({ message: 'Unauthorized' }, 401); 
  }

 
  const token = authHeader?.substring(7);

  try{
    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded.length <0){
      return c.json({ message: 'Unauthorized' }, 401);
    }

     const userId = (decoded as { id: number }).id;

     const user = await db.select().from(users).where(eq(users.id,userId))

     if(!user){
       return c.json({message:"User does not exist"},400)
     }

  const body = await c.req.json()

  const {id,name,price,src} = body

  const Isuser = await db.select().from(products).where(and(eq(products.userId,userId),eq(products.id,id)))

  if(!Isuser){
    return c.json({message:"Unauthorized"},400)
  }

  if(!id||!name||!price||!src){
    return c.json({message:"Please fill all fields"},400)
  }
 
    const product = await db.update(products).set({name:name,price:price,src:src}).where(eq(products.id, id)).returning({id:products.id,name:products.name,price:products.price});
  return c.json(product)
    
  }catch(error){
  return c.json({message:"Internal Server Error"},500)
  }
  
})


app.post("/delete-product/:id",async(c)=>{
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
  return c.json({ message: 'Unauthorized' }, 401); 
  }

 
  const token = authHeader?.substring(7);

  try{
    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded.length <0){
      return c.json({ message: 'Unauthorized' }, 401);
    }

     const userId = (decoded as { id: number }).id;

     const user = await db.select().from(users).where(eq(users.id,userId))

     if(!user){
       return c.json({message:"User does not exist"},400)
     }

  const id = c.req.param('id')

 if(!id){
  return c.json({message:"Please fill all fields"},400)
 }

  const Isuser = await db.select().from(products).where(and(eq(products.userId,userId),eq(products.id,id as any)));

  if(!Isuser){
    return c.json({message:"Unauthorized"},400)
  }

  return c.json({message:"Deleted successfully"});
    
  }catch(error){
  return c.json({message:"Internal Server Error"},500)
  }
  
})

app.get('/products',async(c)=>{
  const product = await db.select().from(products);

  return c.json(product)
})





export default app
