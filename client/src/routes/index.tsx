import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import { AuthProvider } from "../components/GlobalState";

import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Products from "../pages/Products";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

const Router = () => {
    const [cookies] = useCookies(["user-token"]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <AuthProvider>
                            <Layout />
                        </AuthProvider>
                    }
                >
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:id" element={<Products />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route
                        path="/login"
                        element={
                            cookies["user-token"] ? (
                                <Navigate to="/" />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            cookies["user-token"] ? (
                                <Navigate to="/" />
                            ) : (
                                <Register />
                            )
                        }
                    />

					<Route path="/profile" element={<Profile />} />

                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
