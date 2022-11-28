import { createBrowserRouter } from "react-router-dom";
import LogIn from "../Login&SignUp/LogIn/LogIn";
import SignUp from "../Login&SignUp/SignUp/SignUp";
import DashboardMain from "../Main/DashboardMain";
import Main from "../Main/Main";
import AddProduct from "../Pages/Dashbord/AddProduct/AddProduct";
import AllSellers from "../Pages/Dashbord/AllSellers";
import MyOrders from "../Pages/Dashbord/MyOrders/MyOrders";
import MyProduct from "../Pages/Dashbord/MyProduct/MyProduct";
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
        path: '/dashboard',
        element: <PrivateRoute><DashboardMain></DashboardMain></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSellers></AllSellers>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProduct></MyProduct>
            },
        ]
    }
])