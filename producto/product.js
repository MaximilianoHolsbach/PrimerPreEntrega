import { randomUUID } from 'crypto'

export class Product{
    constructor({title,description,price,stock,category,thumbnails}){
        if(!title) throw new Error('Falta un argumento')
        if(!description) throw new Error('Falta un argumento')
        if(!price) throw new Error('Falta un argumento')
        if(!stock) throw new Error('Falta un argumento')
        if(!category) throw new Error('Falta un argumento')
        this.title = title
        this.description = description
        this.code = randomUUID()
        this.price = price
        this.status = true
        this.stock = stock
        this.category = category
        this.thumbnails = thumbnails
    }
}

//const producto1 = new Product('titulotest','desctest',10.1,50,'catetest','https')

