import express from 'express'
import {Router} from 'express'
import { Manager } from '../manager/manager.js'
import { Cart } from '../carro/carrito.js'

export const cartRouter = Router()
cartRouter.use(express.json())
cartRouter.use(express.urlencoded({extended: true}))

const adminProduct = new Manager('./dataB/cartsFile.json')

cartRouter.post('/api/carts/', async (req, res, next)=>{
    const newCarrito = await new Cart()
    const carritos = await adminProduct.addObjet(newCarrito)
    res.json(carritos)
})

cartRouter.post('/api/carts/:cid/product/:pid', async (req, res, next)=>{
    const carrito = await adminProduct.updatecart(req.params.cid,req.params.pid)
    res.json(carrito)
})

cartRouter.get('/api/carts/:cid', async (req, res, next)=>{
    const carrito = await adminProduct.getCartById(req.params.cid,)
    res.json(carrito)
})

