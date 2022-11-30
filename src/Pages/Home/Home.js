import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Loader from '../../Spinner/Loader';
import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import Banner from './Banner/Banner';
import Feedback from './ExtraSection/Feedback';
import Products from './Products/Products';

const Home = () => {
    const { user, loading } = useContext(AuthContext)
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/brandName');
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <Loader></Loader>
    }
    // if (user && loading) {
    //     return <Loader> </Loader>
    // }
    return (
        <div>
            <Banner></Banner>
            <AdvertisedItems></AdvertisedItems>
            <Products products={products}
                isLoading={isLoading}></Products>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;