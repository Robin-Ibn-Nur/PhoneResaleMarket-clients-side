import React from 'react';
import Navbar from '../Pages/NavBar/Navbar';

import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;