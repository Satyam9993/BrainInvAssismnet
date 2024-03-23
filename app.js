import express from 'express';
import cors from 'cors';
import { ErrorMiddleware } from './middleware/error.js';
import getRoutes from './routes/index.js';

// express app
const app = express();



// body parser
app.use(express.json());


// cors
const origin = process.env.ORIGIN;
app.use(cors({
    origin: "*"
}))

// routes
app.use('/api', getRoutes);

// testing api
app.get("/", (req, res)=>{
    res.status(200).json({
        "success":true
    })
})

// unknown route
app.all("*", (req, res, next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statuscode=404;
    next(err);
})

// Error Handle Middleware
app.use(ErrorMiddleware);

export default app;