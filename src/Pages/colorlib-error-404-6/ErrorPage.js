import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import './css/style.css'

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div id="notfound">
            <div className="notfound">
                <p className='text-4xl font-bold'>{error.statusText || error.message}</p>
                <div className="notfound-404">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </div>
                <Link to="/">Go Back to Homepage</Link>
            </div>
        </div >
    );
};

export default ErrorPage;