import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Signup from "./screens/signup";
import Product from "./screens/product";
import Profile from "./screens/profile";
import Cart from "./screens/cart";
import Orders from "./screens/orders";
import ConfirmedOrders from './screens/confirmedorders';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");
    
    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Public Route wrapper component (accessible only when not authenticated)
const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");
    
    if (isAuthenticated) {
        // Redirect to dashboard if already authenticated
        return <Navigate to="/" replace />;
    }

    return children;
};

export default function UrlRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes (only accessible when not logged in) */}
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/signup" element={
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                } />

                {/* Protected Routes (require authentication) */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/products" element={
                    <ProtectedRoute>
                        <Product />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />
                <Route path="/orders" element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                } />
                <Route path="/confirmed-orders" element={
                    <ProtectedRoute>
                        <ConfirmedOrders />
                    </ProtectedRoute>
                } />
                <Route path="/order/:id" element={
                    <ProtectedRoute>
                        <ConfirmedOrders />
                    </ProtectedRoute>
                } />
                <Route path="/product" element={
                    <ProtectedRoute>
                        <Product />
                    </ProtectedRoute>
                } />

                {/* Catch all other routes and redirect to login if not authenticated */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}