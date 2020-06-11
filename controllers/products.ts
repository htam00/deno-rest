// import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import db from '../config/database.ts';
import { Product } from "../types.ts";
import { ErrorHandler } from "../utils/middleware.ts";

const database = db.gDatabase;
const products = database.collection('products');

export const getProducts: HandlerFunc = async (c: Context) => {
    try {
        const fetchedProducts: Product[] = await products.find();
        if(fetchedProducts) {
            const list = fetchedProducts.length 
            ? fetchedProducts.map(product => {
                const {_id: { $oid }, name, description, price } = product;
                return { _id: $oid, name, description, price };

            }) : [];

            return c.json(list, 200);
        }
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
}

export const getProduct: HandlerFunc = async (c: Context) => {
    try {
        const { id } = c.params as { id: string }
        const fetchedProduct = await products.findOne({ _id: { "$oid": id }})

        if(fetchedProduct) {
            const { _id: { $oid }, name, description, price } = fetchedProduct;
            return c.json({ id: $oid, name, description, price }, 200);
        }

        throw new ErrorHandler("Product not found", 404);
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
}

export const addProduct: HandlerFunc = async (c: Context) => {
    try {
        if(c.request.headers.get("content-type") !== "application/json") {
            throw new ErrorHandler("Invalid body", 422)
        }
        const body = await (c.body());
        if(!Object.keys(body).length) {
            throw new ErrorHandler("Request body can not be empty!", 400);
        }
        const { name, description, price } = body;
        const insertProduct = await products.insertOne({
            name,
            description,
            price,
        });

        return c.json(insertProduct, 201);
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
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

export const deleteProduct: HandlerFunc = async (c: Context) => {
    try {
        const { id } = c.params as { id: string }
        const fetchedProduct = products.findOne({_id: { "$oid": id } })

        if(fetchedProduct) {
            const deleteProduct = await products.deleteOne({ _id: { "$oid": id } })
            if(deleteProduct)  {
                return c.string("Product delected successful", 204);
            }
            throw new ErrorHandler("Unable to delete product", 400);
        }
        
        throw new ErrorHandler("Product not found", 404);
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
}
