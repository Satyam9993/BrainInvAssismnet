import app from './app.js'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { connectDB } from './util/db.js';

const port = process.env.PORT; 
// creating a server
app.listen(port, ()=>{
    console.log(`Server is Running at ${port}`);
    connectDB();
})