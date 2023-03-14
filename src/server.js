import express from 'express';
import multer from 'express'
import { apiRouter } from '../router/apiRouter.js';
import { cartRouter } from '../router/apiCarts.js'

const app = express()

app.use(apiRouter)

app.use(cartRouter)


app.listen(8080,()=>console.log("MarnagerProduct funcionando en el puerto 8080"))