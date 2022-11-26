import React from 'react';

const SignUp = () => {
    return (
        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32">
            <div className="flex flex-col justify-between">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leading-tight lg:text-5xl my-5">Sign Up</h2>
                </div>
                <img src="https://img.freepik.com/premium-psd/3d-sign-concept-illustration_380580-942.jpg?w=740" alt="" className="w-96 h-full" />
            </div>
            <form noValidate="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div>
                    <label htmlFor="name" className="text-sm">Full name</label>
                    <input id="name" type="text" placeholder="" className="w-full p-3 rounded dark:bg-gray-800" />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <input id="email" type="email" className="w-full p-3 rounded dark:bg-gray-800" />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <input id="email" type="email" className="w-full p-3 rounded dark:bg-gray-800" />
                </div>

                <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-purple-400 dark:text-gray-900">Send Message</button>
            </form>
        </div>
    );
};

export default SignUp;