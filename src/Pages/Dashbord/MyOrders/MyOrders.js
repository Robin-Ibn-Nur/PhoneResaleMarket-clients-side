import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loader from '../../../Spinner/Loader';

const MyOrders = () => {
    const { user } = useContext(AuthContext);


    const { data: bookings, isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://server-side-lime.vercel.app/bookings?email=${user?.email}`, {
            });
            const data = await res.json();
            console.log(data)
            return data;
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            {/* <h1 className='text-center text-3xl font-bold my-5 italic border'>
                {user?.displayName}'s Orders</h1> */}
            {
                user?.displayName ? <h1 className='text-center text-3xl font-bold my-5 italic border'>{user?.displayName}'s Orders</h1> : ""
            }
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Purches</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings &&
                            bookings?.map((booking, i) =>
                                <tr key={booking._id}>

                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={booking?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {booking?.productName}
                                    </td>
                                    <td>{booking?.price}</td>
                                    <td>
                                        {
                                            booking.price && !booking.paid &&
                                            <Link
                                                to={`/dashboard/payment/${booking._id}`}>
                                                <button className="btn  btn-outline w-full text-2xl">Pay</button>
                                            </Link>
                                        }
                                        {
                                            booking.price && booking.paid && <button className="btn btn-outline w-full text-2xl" disabled>Paid ✔</button>
                                        }
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;