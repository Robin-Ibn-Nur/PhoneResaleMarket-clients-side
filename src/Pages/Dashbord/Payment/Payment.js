import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../../Spinner/Loader';
import ChakOut from './ChakOut';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const bookings = useLoaderData()
    const navigation = useNavigation()
    const { productName, name, image, phone, price } = bookings

    if (navigation.state === "loading") {
        return <Loader></Loader>
    }
    return (
        <>
            <div className='lg:flex gap-5'>
                <div className='my-5'>
                    <h1 className='text-3xl my-3'>Welcome Mr/Ms {name}</h1>
                    <h1 className='text-2xl'>Your are paying for {productName}</h1>
                    <h1 className='text-xl my-3'>Your contact Number {phone}</h1>
                    <h1 className='text-xl my-3'>Your are paying amount of {price}$</h1>
                </div>
                <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50">
                    <img src={image} alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                    <div className="mt-6 mb-2">
                        <h2 className="text-xl font-semibold tracking-wide">{price}</h2>
                    </div>
                </div>
            </div>
            <div className='w-96 border rounded outline p-5 mt-20'>
                <Elements stripe={stripePromise}>
                    <ChakOut
                        bookings={bookings}></ChakOut>
                </Elements>
            </div>
        </>
    );
};

export default Payment;