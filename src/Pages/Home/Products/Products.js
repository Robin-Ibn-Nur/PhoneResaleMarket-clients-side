import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Spinner/Loader'
import ProductCategory from './ProductCategory';


const Products = ({ products, isLoading }) => {

    // const { data: products = [], isLoading } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: async () => {
    //         const res = await fetch('http://localhost:5000/brandName');
    //         const data = await res.json();
    //         return data
    //     }
    // });

    // if (isLoading) {
    //     return <Loader></Loader>
    // }
    return (

        <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
            <div className="container p-6 mx-auto space-y-8">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">You can choose one of those brand</h2>
                    <p className="font-serif text-md dark:text-gray-400">Buy your Dream Phone at low cost</p>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        products?.map(product => <ProductCategory
                            key={product._id}
                            product={product}
                            isLoading={isLoading}
                        ></ProductCategory>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Products;