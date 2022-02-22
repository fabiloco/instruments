import { Link, useNavigate } from "react-router-dom";

import {
    Avatar,
    Button,
    Input,
    InputGroup,
    InputRightAddon,
    Spinner,
} from "@chakra-ui/react";

import logo from "../assets/logo.png";
import { FaSearch, FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";

import { AuthContext, UserData } from "./GlobalState";

import { useCookies } from "react-cookie";

import { useContext, useState } from "react";
import Cart, { CartProps } from "./Cart";

interface UserAuthProps {
    userData: UserData | null | undefined;
    cartControls: CartProps;
}

const AuthControls = (props: UserAuthProps) => {
    const [cookies, , removeCookie] = useCookies(["user-token"]);
    const navigate = useNavigate();

    const methodLoguot = async () => {
        removeCookie("user-token");
        navigate("/");
    };

    if (props.userData === null) {
        return (
            <div className="flex flex-col items-center h-full justify-evenly w-96">
                <Spinner></Spinner>
            </div>
        );
    } else if (props.userData?.state === "auth") {
        return (
            <div className="flex flex-col items-center h-full justify-evenly w-96">
                <div className="flex items-center justify-between w-full px-12">
                    <Link to={"/profile"}>
                        <FaUser size={"22"} />
                    </Link>
                    <button
                        onClick={() => {
                            props.cartControls.setIsOpen(true);
                        }}
                    >
                        <FaShoppingCart size={"22"} />
                    </button>
                    <button onClick={methodLoguot}>
                        <FaSignOutAlt size={"22"} />
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center h-full pl-6 justify-evenly w-96">
                <nav className="mt-1">
                    <Link
                        className="mr-3 text-sm hover:underline text-slate-500"
                        to="/login"
                    >
                        Iniciar sesión
                    </Link>
                    <Link
                        className="hover:underline text-white mr-3 text-sm bg-[#FFA341] px-3 py-2 rounded-md font-bold hover:bg-yellow-600 transition-colors"
                        to="/register"
                    >
                        Registrarse
                    </Link>
                </nav>
            </div>
        );
    }
};

const Navbar = () => {
    const context = useContext(AuthContext);

    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="fixed z-50 flex items-center justify-between w-full px-8 bg-white shadow-md h-28">
            <div className="flex items-center h-full w-96">
                <div className="h-full py-2 mr-6 text-xl font-bold">
                    <img className="h-full" src={logo} alt="logo" />
                </div>
            </div>
            <div className="flex flex-col w-full h-full justify-evenly">
                <div className="w-full">
                    <InputGroup>
                        <Input placeholder="Buscar producto" />
                        <button>
                            <InputRightAddon
                                bgColor={"#FFA341"}
                                children={<FaSearch />}
                            />
                        </button>
                    </InputGroup>
                </div>
                <nav className="flex items-center w-full mt-1">
                    <Link
                        className="mr-3 text-black transition-all border-b-2 hover:border-b-4 text-md border-b-black"
                        to="/"
                    >
                        Home
                    </Link>
                    {/* <Link
                        className="mr-3 text-black transition-all border-b-2 hover:border-b-4 text-md border-b-black"
                        to="/products"
                    >
                        Nuestros productos
                    </Link> */}

                    <Link
                        className="mr-3 text-black transition-all border-b-2 hover:border-b-4 text-md border-b-black"
                        to="/products/1"
                    >
                        Guitarras electricas
                    </Link>

                    <Link
                        className="mr-3 text-black transition-all border-b-2 hover:border-b-4 text-md border-b-black"
                        to="/products/2"
                    >
                        Guitarras acusticas
                    </Link>

                    <Link
                        className="mr-3 text-black transition-all border-b-2 hover:border-b-4 text-md border-b-black"
                        to="/products/3"
                    >
                        Teclados
                    </Link>

                    <Link
                        className="mr-3 text-black transition-all border-b-2 hover:border-b-4 text-md border-b-black"
                        to="/profile"
                    >
                        Cuenta
                    </Link>
                </nav>
            </div>
            <AuthControls
                cartControls={{ isOpen: isCartOpen, setIsOpen: setIsCartOpen }}
                userData={context?.userData}
            />

            <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        </div>
    );
};

export default Navbar;
