import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import Loader from '../../Spinner/Loader';

const AllSellers = () => {
    const { user } = useContext(AuthContext);
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://server-side-lime.vercel.app/users');
            const data = await res.json();
            console.log(data)
            return data;
        }
    });

    if (user && isLoading) {
        return <Loader></Loader>
    }

    const handleMakeVerifyed = id => {
        fetch(`https://server-side-lime.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful.')
                    refetch();
                }
            })
    }

    return (
        <div>
            {
                user ?
                    <h2 className="text-3xl text-center my-5 underline italic">All Users</h2>
                    :
                    <h1 className="text-3xl text-center my-5 underline italic">No Seller or Buyer loged In yet</h1>
            }
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user?.role !== "verified" ?
                                            <button onClick={() => handleMakeVerifyed(user._id)} className='btn btn-outline'>Verify User
                                            </button>
                                            : <span className='rounded text-xl' >Verified ✔</span>
                                    }
                                </td>
                                <td><button className='btn btn-xs btn-danger'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;