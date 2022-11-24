import { createBrowserRouter } from "react-router-dom";
import LogIn from "../Login&SignUp/LogIn/LogIn";
import SignUp from "../Login&SignUp/SignUp/SignUp";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";

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
            }

        ]
    }
])