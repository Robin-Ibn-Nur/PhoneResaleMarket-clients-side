import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loader from '../../../Spinner/Loader';

const MyProduct = () => {
    const { loading } = useContext(AuthContext)

    const requestAPI = async () => {
        try {
            const res = await axios.get('http://localhost:5000/sellerProduct', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },

            });
            const data = await res.json();
            console.log(data)
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div>
            my product
        </div>
    );
};

export default MyProduct;