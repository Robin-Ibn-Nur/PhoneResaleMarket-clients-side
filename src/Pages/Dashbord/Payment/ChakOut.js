import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const ChakOut = ({ bookings }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    const navigate = useNavigate();
    const location = useLocation()

    const from = location.state?.from?.pathname;

    const stripe = useStripe()
    const elements = useElements()
    const { price, name, phone, _id } = bookings;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://server-side-lime.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setClientSecret(data.clientSecret)
            });
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault()


        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
            console.log(paymentMethod)

        }
        setSuccess('');
        setLoading(true);


        const { paymentIntent, error: confirmeError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        phone: phone
                    }
                }
            }
        )
        if (confirmeError) {
            setCardError(confirmeError.message)
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            const payment = {
                price,
                transactionId: paymentIntent.id,
                name,
                phone,
                bookingId: _id
            }
            fetch('https://server-side-lime.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })
            toast.success('[PaymentMethod SuccessFully Done]')
            navigate(from, { replace: true });
        }
        setLoading(false)
    }
    return (

        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-outline mt-5 w-full'
                    type="submit"
                    disabled={!stripe || !clientSecret || loading}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default ChakOut;