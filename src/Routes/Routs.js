import { createBrowserRouter } from "react-router-dom";
import LogIn from "../Login&SignUp/LogIn/LogIn";
import SignUp from "../Login&SignUp/SignUp/SignUp";
import Main from "../Main/Main";
import Dashbord from "../Pages/Dashbord/Dashbord";
import Home from "../Pages/Home/Home";
import SecondHandProducts from "../Pages/Home/SecondHandProducts/SecondHandProducts";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

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
                element: <PrivateRoute><SecondHandProducts></SecondHandProducts></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/brandName/${params.id}`)
            }

        ]
    },
    {
        path: '/dashbord',
        element: <Dashbord></Dashbord>
    }
])