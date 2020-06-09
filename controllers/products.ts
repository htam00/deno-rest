import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Product } from '../types.ts';

let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        description: "this is one product",
        price: 10.00
    },
    {
        id: "2",
        name: "Product Two",
        description: "this is two product",
        price: 20.00
    },
    { 
        id: "3",
        name: "Product Three",
        description: "this is three product",
        price: 30.00
    }
];

export const getProducts = ({ response }: { response: any}) => {
    response.body = {
        success: true,
        data: products
    }
}

export const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(product => product.id === params.id);

    if(product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: "No product found"
        }
    }
}

export const addProduct = async ({ request, response }: { request: any, response: any}) => {
    const body = await request.body()

    if(!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No Data'
        }
    } else {
        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

export const updateProduct = async({ params, request, response}: { params: { id: string }, request: any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)
    if(product) {
        const body = await request.body()
        const updateData: { name?: string, description?: string, price?: number } = body.value
        products = products.map(p => p.id === params.id ? {...p, ...updateData } : p)
        
        response.status = 200
        response.body = {
            success: true,
            data: products
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}