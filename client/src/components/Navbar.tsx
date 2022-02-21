import { Link } from "react-router-dom";

import { Avatar, Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'

import logo from "../assets/logo.png";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";


const Navbar = () => {
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
			<div className="flex flex-col items-center justify-evenly h-full w-96">
				<div className="flex items-center justify-evenly w-full px-12">
					<button>
						<FaUser size={"22"}/>
					</button>
					<button>
						<FaShoppingCart size={"22"}/>
					</button>
					{/* <button>
						<FaBars size={"22"}/>
					</button> */}
				</div>
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
		</div>
	);
};

export default Navbar;
