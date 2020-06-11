export interface Product {
    _id: {
        $oid: string
    };
    name: string;
    description: string;
    price: number;
}
