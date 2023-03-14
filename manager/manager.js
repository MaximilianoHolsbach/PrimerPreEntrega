import fs from 'fs/promises'
import {randomUUID}  from 'crypto'
import { Product } from '../producto/product.js'

export class Manager{// Creo la clase manager como administradora universal
    constructor(path,){
        this.path = path
        this.file = []
    }

    async readFile(){
        this.file = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return this.file
    }

    async saveFile(){//Genero la funcion save para llamarla en donde la necesite
        const json = JSON.stringify(this.file,null,2)//Indico el formato en el que se guardara
        await fs.writeFile(this.path,json)
    }

    async getObjet(){
        await this.readFile()//Llamo a la funcion leer archivo
        return this.file
    }

    async getObjetlimit(limit){ // ingreso como parametro limit para determinar la longitud de la lista
        await this.getObjet()
        const list = this.file.slice(0,limit)
        return list
    }


    async addObjet(product){//Ingreso como parametro producto y le genero un id auto incremental
        await this.readFile()
        if(this.file.length == 0){
            product.id = 1
            this.file.push(product)
            await this.saveFile()
        }else{
            product.id = this.file[this.file.length - 1].id + 1
            this.file.push(product)
            await this.saveFile()
        }
    }

    async getObjetById(id){//Ingreso como parametro ID para buscar el objeto
        await this.readFile()
        this.shared = this.file.find((product)=>{if(product.id == id){return product}})
        if(this.shared == undefined){
            throw new Error('El ID no es valido')
        }else{
            return this.shared
        }
    }

    async updateobjet(id,res){
        try{
            await this.getObjetById(id)
            if(!this.shared){
                throw new Error('El ID no es valido')
            }
            await this.readFile()
            this.file = this.file.map((product) =>{if(product.id == id){return{...product,...res}}return{...product}})
            await this.saveFile()
        }catch(err){
            throw new Error('Error al actualizar el producto')
        }
    }

    async updatecart(cid,pid){
        await this.getObjetById(cid)
        if(this.shared.products.length == 0){
            this.shared.products.push({"product":pid,"quantity":1})
            await this.saveFile()
        }else{
            this.shared.products.push({"quantity":+1})
            await this.saveFile()
        }
        //this.shared.products.push({"product":pid})
       // await this.saveFile()
    }

    async deleteobjet(id){//Ingreso como parametro el ID para buscar y eliminar el producto
        try {
            await this.getObjetById(id)
            if(!this.shared){
                throw new Error('El ID no es valido')
            }
            this.readFile()
            this.file = this.file.filter((product) => product.id !== id)
            await this.saveFile()
            return this.file
        } catch (error) {
            throw new Error('Error al eliminar el archivo')
        }
    }
}
/*
const admin = new Manager('PrimerPreEntrega/dataB/productFile.json')
admin.addObjet(new Product('titulotest5','desctest5',10.1,50,'catetest5','https5'))
*/
