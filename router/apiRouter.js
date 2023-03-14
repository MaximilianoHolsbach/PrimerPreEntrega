import express from 'express'
import {Router} from 'express'
import { Manager } from '../manager/manager.js'
import { Product } from '../producto/product.js'

export const apiRouter = Router()
apiRouter.use(express.json())
apiRouter.use(express.urlencoded({extended: true}))

const adminProduct = new Manager('./dataB/productFile.json')

apiRouter.get('/api/products/', async (req, res, next) => {
    try {
        if (req.query.limit){
            const products = await adminProduct.getObjetlimit(req.query.limit)
            res.json(products)
        }else{
            const products = await adminProduct.getObjet()
            res.json(products)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }     
})

apiRouter.get('/api/products/:pid', async (req, res, next)=>{
    try {
        const products = await adminProduct.getObjetById(req.params.pid)
        res.json(products)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

apiRouter.post('/api/products/', async (req, res)=>{
    try {
        const newProducts = await new Product(req.body)
        const addProducts = await adminProduct.addObjet(newProducts)
        res.json(addProducts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

apiRouter.put('/api/products/:pid', async (req, res, next)=>{
    try {
        const update = await adminProduct.updateobjet(req.params.pid, req.body)
        res.json(update)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

apiRouter.delete('/api/products/:pid', async (req, res, next)=>{
    try {
        const id = parseInt(req.params.pid)
        const deleteProduct = await adminProduct.deleteobjet(id)
        res.json(deleteProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

