import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loader from '../../../Spinner/Loader';
import BookingModal from './BookingModal/BookingModal';
import Category from './Category';

const SecondHandProducts = () => {
    const secondHandProducts = useLoaderData()
    const { categoryItems } = secondHandProducts;
    const { loading } = useContext(AuthContext)
    const [phoneInformation, setPhoneInformation] = useState(null)
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <>
            <div>
                {
                    categoryItems?.map(product =>

                        < Category
                            key={product.id}
                            product={product}
                            setPhoneInformation={setPhoneInformation}
                        ></Category>)
                }
            </div>
            {
                phoneInformation &&
                <BookingModal
                        phoneInformation={phoneInformation}
                        setPhoneInformation={setPhoneInformation}
                ></BookingModal>
            }
        </>
    );
};

export default SecondHandProducts;