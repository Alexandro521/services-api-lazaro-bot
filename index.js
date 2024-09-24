import express from 'express'
import cors from 'cors'
import { serviceRouter } from './router/serviceRouter.js';


const PORT = process.env.PORT ?? 1024;
const app = express();
app.use(cors())
app.use('/services',serviceRouter)

app.get('*',(req,res)=>{
    res.json({message:'usa /services para acceder a los servicios'})
})
app.listen(PORT,()=>{
    console.log('servidor en linea')
})




