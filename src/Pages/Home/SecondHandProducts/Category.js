import React from 'react';

const Category = ({ product, setPhoneInformation }) => {
    const { image, location, originalPrice, posted, productName, resalePrice, sellerName, yearUsed } = product;



    return (
        <section className="my-5 dark:text-gray-100">
            <div className="container flex flex-col mx-auto lg:flex-row">
                <div className="w-full height-auto lg:w-1/3" ><img src={image} alt="" /> </div>
                <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
                    <div className='flex'>
                        <h1 className='mr-5'>{sellerName}</h1>
                        {
                            sellerName ?
                                <div className=''>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-8 text-success">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div> : <span>Not Verified</span>
                        }
                    </div>
                    <h2 className="text-3xl font-semibold leading-none">{productName}</h2>
                    <div className='flex justify-between mt-4'>
                        <p className='text-md'>Posted: {posted}</p>
                        <p className='text-md'>Location: {location}</p>
                        <p className='text-md'>Used: {yearUsed} Years</p>
                    </div>
                    <div className='flex mt-1'>
                        <p className="mr-4 mb-8 text-md">Orginal Price: {originalPrice}</p>
                        <p className="mb-8 text-md">Asking Price: {resalePrice}</p>
                    </div>
                    <div className="card-actions">
                        <label
                            htmlFor="booking-modal"
                            className="btn btn-xs btn-ghost outline sm:btn-sm md:btn-md lg:btn-lg"
                            onClick={() => setPhoneInformation(product)}
                        >Book Now</label>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Category;