import React from 'react';

const Blog = () => {
    return (
        <div className='my-5 grid gap-5'>
            <div className='border outline p-6'>
                <h1 className="text-2xl my-2">What are the different ways to manage a state in a React application?</h1>
                <h4 className="text-xl underline">Introduction to React State Management</h4>
                <p>The state of any application is represented by the user interface of the application. The state is mutable and whenever the user interacts with the application and changes its state, the user interface of the app may change as it will be represented by the new state. These states can be managed by a React component. The main objectives of the react component are to store the state and allow it to get updated once the user interacts with the application. It also ensures that the UI change whenever there is any update in the State. In this article, we will explain the ways to manage the states. In this topic, we are going to learn about React State Management.</p>
            </div>
            <div className='border outline p-6'>
                <h1 className='text-2xl'>How does prototypical inheritance work?</h1>
                <h1 className='font-bold underline'>Prototype Inheritance in JavaScript:</h1>

                Under the classical inheritance phenomenon, we create a new class that actually extends or reuses the properties or functions, or methods of another class that are used by several programming languages (like C, C++, Java, etc.)
                JavaScript doesn't use classical inheritance instead it uses the phenomenon called Prototype Inheritance.
                In Prototype Inheritance, an object uses the properties or methods of another object via the prototype linkage.
                All the JavaScript objects inherit properties and methods from a prototype (like Date objects inherit properties from Date.prototype and so on).
                Following pictorial representation, containing some sample values will help us to understand Prototype Inheritance in a much better and effective way-
            </div>
            <div className='border outline p-6'>
                <h1 className='text-2xl underline'>What is a unit test? Why should we write unit tests?</h1>
                <p>Unit tests are simple scripts that check whether a given unit—class, function, module, etc.—is working as expected. They are meant to be rather simple, to cover the happy path of the code plus a few edge cases. They contribute to the long-term success of a project because of the reasons I discuss below.</p>
            </div>
            <div className='border outline p-6'>
                <h1 className='text-2xl'>React vs. Angular vs. Vue?</h1>
                <p>There are three frameworks for building web applications that every frontend developer has heard about: React, Vue.js, and Angular.

                    React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework.

                    They can be used almost interchangeably to build front-end applications, but they're not 100 percent the same, so it makes sense to compare them and understand their differences.

                    Each framework is component-based and allows the rapid creation of UI features.

                    However, they all have a different structure and architecture — so first, we'll look into their architectural differences to understand the philosophy behind them.</p>
            </div>


        </div>
    );
};

export default Blog;