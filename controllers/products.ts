// import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import db from '../config/database.ts';
import { Product } from "../types.ts";
import { ErrorHandler } from "../utils/middleware.ts";

const database = db.gDatabase;
const products = database.collection('products');

export const getProducts = async (context: any) => {
    try {
        const fetchedProducts: Product[] = await products.find();
        if(fetchedProducts) {
            const list = fetchedProducts.length 
            ? fetchedProducts.map(product => {
                const {_id: { $oid }, name, description, price } = product;
                return { _id: $oid, name, description, price };

            }) : [];
            context.response.body = list;
            context.response.status = 200;
            return context;
        }
    } catch (error) {
        context.response.body = error.message;
        context.response.status = error.status || 500;
        return context;
    }
}


export const getProduct = async (context: any) => {
    try {
        const { id } = context.params as { id: string }
        const fetchedProduct = await products.findOne({ _id: { "$oid": id }})

        if(fetchedProduct) {
            const { _id: { $oid }, name, description, price } = fetchedProduct;
            context.response.body = { id: $oid, name, description, price }
            context.response.status = 200;
            return context;
        }

        context.response.body = "Product not found";
        context.response.status = 404;
        return context;
    } catch (error) {
        context.response.body = error.message;
        context.response.status = 500;
        return context;
    }
}


export const addProduct = async (context: any) => {
    try {
        const body: any = await context.request.body()
        const { name, description, price } = body.value;
        const insertProduct = await products.insertOne({
            name: name,
            description: description,
            price: price,
        });

        context.response.body = insertProduct;
        context.response.status = 201
        return context;
    } catch (error) {
        context.response.body = null;
        context.response.status = 500
        console.log(error)
    }
}

/*
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
*/


export const deleteProduct = async (context: any) => {
    try {
        const { id } = context.params as { id: string }
        const fetchedProduct = products.findOne({_id: { "$oid": id } })

        if(fetchedProduct) {
            const deleteProduct = await products.deleteOne({ _id: { "$oid": id } })
            if(deleteProduct)  {
                context.response.body = "Product delected successful";
                context.response.status = 204;
                return context;
            }
            context.response.body = "Unable to delete product";
            context.response.status = 400;
            return context;
        }
        context.response.body = "Product not found";
        context.response.status = 404;
        return context;
    } catch (error) {
        context.response.body = error.message;
        context.response.status = 500;
        return context;
    }
}
