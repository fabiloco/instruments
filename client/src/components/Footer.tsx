import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

const Footer = () => {
	return (
		<footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
			<div className="sm:flex sm:items-center sm:justify-between">
				<a
					href="https://flowbite.com"
					target="_blank"
					className="flex items-center mb-4 sm:mb-0"
				>
					<div className="mr-6 text-xl font-bold">
						<img className="h-32" src={logo} alt="logo"/>
					</div>
				</a>
				<ul className="flex flex-wrap items-center mb-6 sm:mb-0">
					<li>
						<Link
							to="/"
							className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
						>
							Home
						</Link>
					</li>
					<li>
						{/* <Link
							to="/products"
							className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
						>
							Productos
						</Link> */}
					</li>
					<li>
					<Link
							to="/account"
							className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
						>
							Cuenta
						</Link>
					</li>
				</ul>
			</div>
			<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
			<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2022 ecommerce-template™. All Rights Reserved.
			</span>
		</footer>
	);
};

export default Footer;
