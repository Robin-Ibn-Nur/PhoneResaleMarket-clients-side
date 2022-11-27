import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../Spinner/Loader';

const ProductCategory = ({ product }) => {
    const { categoryImage, categoryName, _id, isLoading } = product
    const handleLoading = () => {
        if (isLoading) {
            return <Loader></Loader>
        }
    }
    return (
        <article className="flex flex-col dark:bg-gray-900">
            <div>
                <img alt="" className="object-cover w-full h-52 dark:bg-gray-500" src={categoryImage} />
            </div>
            <div className="flex flex-col flex-1 p-6">
                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{categoryName}</h3>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                    <Link onClick={handleLoading} className='btn btn-ghost outline mx-auto' to={`/secondHandProducts/${_id}`}>See More...</Link>
                </div>
            </div>
        </article>
    );
};

export default ProductCategory;