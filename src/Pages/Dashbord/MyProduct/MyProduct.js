import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Spinner/Loader';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const MyProduct = () => {
    const [deletingSellerProduct, setDeletingSellerProduct] = useState(null);
    console.log(deletingSellerProduct);
    const closeModal = () => {
        setDeletingSellerProduct(null);
    }


    const { data: sellerProduct, isLoading, refetch } = useQuery({
        queryKey: ['sellerProduct'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/sellerProduct', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });


    const handleDeleteProduct = product => {
        axios(`http://localhost:5000/sellerProduct/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${product.productName} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='my-5'>
            <h2 className="text-3xl mb-5">My Products: {sellerProduct?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Contact Number</th>
                            <th>Product Price</th>
                            <th>Year of Used</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellerProduct.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={product.image} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>{product.location}</td>
                                <td>{product.number}</td>
                                <td>{product.price}</td>
                                <td>{product.yearUsed}</td>
                                <td>
                                    <label onClick={() => setDeletingSellerProduct(product)} htmlFor="DeleteConfirmation-modal" className="btn btn-sm btn-error btn-outline">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingSellerProduct && <DeleteConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingSellerProduct.productName}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingSellerProduct}
                    closeModal={closeModal}
                >
                </DeleteConfirmationModal>
            }
            {/* {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                    successAction={handleDeleteDoctor}
                    successButtonName="Delete"
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            } */}
        </div>
    );
};

export default MyProduct;