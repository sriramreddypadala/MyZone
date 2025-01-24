import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Signup from "./screens/signup";
import Product from "./screens/product";
import Profile from "./screens/profile";
import Cart from "./screens/cart";
import Orders from "./screens/orders";
import ConfirmedOrders from './screens/confirmedorders';

export default function UrlRoutes() {
    let isAuthenticated = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                { !isAuthenticated && <Route path="/"  element={<Login />} />}
                <Route path="/signup" element={<Signup />} />
                { isAuthenticated && (
                    <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/confirmed-orders" element={<ConfirmedOrders />} />
                        <Route path="/order/:id" element={<ConfirmedOrders />} />
                        <Route path="/product" element={<Product />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}