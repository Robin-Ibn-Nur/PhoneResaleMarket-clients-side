import { createBrowserRouter } from "react-router-dom";
import Login from "../Login&SignUp/LogIn/LogIn";
import SignUp from "../Login&SignUp/SignUp/SignUp";
import DashboardMain from "../Main/DashboardMain";
import Main from "../Main/Main";
import ErrorPage from "../Pages/colorlib-error-404-6/ErrorPage";
import AddProduct from "../Pages/Dashbord/AddProduct/AddProduct";
import AllBuyers from "../Pages/Dashbord/AllBuyers";
import AllSellers from "../Pages/Dashbord/AllSellers";
import MyOrders from "../Pages/Dashbord/MyOrders/MyOrders";
import MyProduct from "../Pages/Dashbord/MyProduct/MyProduct";
import Payment from "../Pages/Dashbord/Payment/Payment";
import Home from "../Pages/Home/Home";
import SecondHandProducts from "../Pages/Home/SecondHandProducts/SecondHandProducts";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
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
        errorElement: <ErrorPage></ErrorPage>,
        // element: <PrivateRoute><DashboardMain></DashboardMain></PrivateRoute>,
        element: <DashboardMain></DashboardMain>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>,

            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProduct></MyProduct>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader:({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
                // loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`)
                // loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`, {
                //     // headers: {
                //     //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                //     // }
                // })
            },
        ]
    }
])