import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Spinner/Loader';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const { data: categoryName = [], isLoading } = useQuery({
        queryKey: ['categoryName'],
        queryFn: async () => {
            const res = await fetch('https://server-side-lime.vercel.app/brandNameCategory');
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const sellerProduct = {
                        productName: data.productName,
                        price: data.price,
                        number: data.number,
                        description: data.description,
                        yearUsed: data.yearUsed,
                        category: data.category,
                        location: data.location,
                        image: imgData.data.url
                    }

                    // save seller product information to the database
                    fetch('https://server-side-lime.vercel.app/sellerProduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(sellerProduct)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.productName} is added successfully`);
                            navigate('/dashboard/myproducts')
                        })
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='w-2/4 p-7 mx-auto'>
            <h2 className="text-4xl text-center">Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Product Name</span></label>
                    <input type="text" {...register("productName", {
                        required: "productName is Required"
                    })} className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Price</span></label>
                    <input type="price" {...register("price", {
                    })} className="input input-bordered w-full" />
                    {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Mobile Number</span></label>
                    <input type="text" {...register("number", {
                    })} className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Description</span></label>
                    <input type="text" {...register("description", {
                    })} className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Year of Purchase</span></label>
                    <input type="text" {...register("yearUsed", {
                    })} className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Select Category</span></label>
                    <select {...register('category')}
                        className="select input-bordered w-full">
                        {
                            categoryName.map(category => <option
                                value={category.categoryName}
                                key={category._id}
                            >{category.categoryName}</option>)
                        }

                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Location</span></label>
                    <select {...register('location')} className="select select-warning w-full">
                        <option defaultValue="">Select Your Location</option>
                        <option value={"Dhaka"}>Dhaka</option>
                        <option value={"Gazipur"}>Gazipur</option>
                        <option value={"Chittagong"}>Chittagong</option>
                        <option value={"Rajshahi"}>Rajshahi</option>
                        <option value={"Bogra"}>Bogra</option>
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="file-input file-input-bordered file-input-warning w-full" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <input className='btn btn-outline w-full mt-4' value="Add Product" type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;