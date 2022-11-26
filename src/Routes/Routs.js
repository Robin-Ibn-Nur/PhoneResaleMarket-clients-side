import { createBrowserRouter } from "react-router-dom";
import LogIn from "../Login&SignUp/LogIn/LogIn";
import SignUp from "../Login&SignUp/SignUp/SignUp";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import SecondHandProducts from "../Pages/Home/SecondHandProducts/SecondHandProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/secondHandProducts/:id',
                element: <SecondHandProducts></SecondHandProducts>
            }

        ]
    }
])