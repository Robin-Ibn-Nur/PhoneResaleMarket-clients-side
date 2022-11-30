import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import Loader from '../../Spinner/Loader';
import Google from '../Google/Google';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [UserEmail, setUserEmail] = useState('')
    const [token] = useToken(UserEmail);
    const navigate = useNavigate();
    const [seller, setSeller] = useState(null)
    const [buyer, setBuyer] = useState(null)
    if (seller) {
        console.log(seller)
    } else if (buyer) {
        console.log(buyer)
    }

    // if (token) {
    //     navigate('/');

    // }

    const handleSignUp = (data) => {
        console.log(data.category)
        const role = data.category;
        console.log(role);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Welcome to The Phone Resale Market')
                const userInfo = {
                    displayName: data.name,

                }
                console.log(userInfo);
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, role);
                        // saveSeller(data.name, data.email)
                        // saveBuyer(data.name, data.email)
                    })
                    .catch(err => console.log(err));
            })
        .catch(error => {
            console.log(error)
            toast.error(error.message)

        });
    }

    const saveUser = (name, email, category) => {
        const user = { name, email, category };
        fetch('http://localhost:5000/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setUserEmail(email);
            })
    }
    // const saveSeller = (name, email) => {
    //     const seller = { name, email };
    //     console.log(seller)
    //     fetch('http://localhost:5000/seller', {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(seller)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setUserEmail(email);
    //         })
    // }
    // const saveBuyer = (name, email) => {
    //     const buyer = { name, email };
    //     console.log(buyer)
    //     fetch('http://localhost:5000/buyer', {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(buyer)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setUserEmail(email);
    //         })
    // }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Select Category</span></label>
                        <select {...register("category", {
                            required: "Option is Required"
                        })}
                            className="select input-bordered w-full">
                            <option>Seller</option>
                            <option>Buyer</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },

                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input className='btn btn-outline w-full mt-4' value="Sign Up" type="submit" />
                </form>
                <p>Already have an account!  <Link className='text-white'
                    to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <Google></Google>
            </div>
        </div>
    );
};

export default SignUp;