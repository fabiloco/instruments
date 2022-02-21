import { Link, useNavigate } from "react-router-dom";

import { Avatar, Button, Input, InputGroup, InputRightAddon, Spinner } from '@chakra-ui/react'

import logo from "../assets/logo.png";
import { FaSearch, FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";

import { AuthContext, UserData } from "./GlobalState";

import { useCookies } from "react-cookie";

import { useContext } from "react";


interface UserAuthProps {
	userData: UserData | null | undefined;
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
			<div className="flex flex-col items-center justify-evenly h-full w-96">
				<Spinner></Spinner>
			</div>
		);
	} else if (props.userData?.state === 'auth') {
		return(
			<div className="flex flex-col items-center justify-evenly h-full w-96">
				<div className="flex items-center justify-between w-full px-12">
					<button>
						<FaUser size={"22"}/>
					</button>
					<button>
						<FaShoppingCart size={"22"}/>
					</button>
					<button
						onClick={methodLoguot}
					>
						<FaSignOutAlt size={"22"}/>
					</button>
				</div>
			</div>
		);
	} else {
		return(
			<div className="flex flex-col items-center justify-evenly h-full w-96 pl-6">
				<nav className="mt-1">
					<Link
						className="hover:underline text-slate-500 mr-3 text-sm"
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
}

const Navbar = () => {
	const context = useContext(AuthContext);

	return (
		<div className="w-full h-28 bg-white shadow-md px-8 flex items-center justify-between fixed z-50">
			<div className="flex items-center h-full w-96">
				<div className="font-bold text-xl mr-6 h-full py-2">
					<img className="h-full" src={logo} alt="logo"/>
				</div>
			</div>
			<div className="w-full flex flex-col h-full justify-evenly">
				<div className="w-full">
					<InputGroup>
						<Input placeholder="Buscar producto" />
						<button>
							<InputRightAddon bgColor={"#FFA341"} children={ <FaSearch /> } />
						</button>
					</InputGroup>
				</div>
				<nav className="mt-1 w-full items-center flex">
					<Link
						className="hover:border-b-4 text-black mr-3 text-md border-b-black border-b-2 transition-all"
						to="/"
					>
						Home
					</Link>
					<Link
						className="hover:border-b-4 text-black mr-3 text-md border-b-black border-b-2 transition-all"
						to="/"
					>
						Productos
					</Link>
					<Link
						className="hover:border-b-4 text-black mr-3 text-md border-b-black border-b-2 transition-all"
						to="/"
					>
						Cuenta
					</Link>
				</nav>
			</div>
			<AuthControls userData={context?.userData} />
		</div>
	);
};

export default Navbar;
