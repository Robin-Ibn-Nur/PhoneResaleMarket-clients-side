import React from 'react';
import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import Banner from './Banner/Banner';
import Feedback from './ExtraSection/Feedback';
import Products from './Products/Products';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertisedItems></AdvertisedItems>
            <Products></Products>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;