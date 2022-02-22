import { useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { FiPlus, FiMinus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/GlobalState";
import { addItemsToCart, startShoppingSession } from "../services/cartService";
import { getProduct } from "../services/productsService";
import { Product as ProductInterface } from "./Products";


interface ProductState {
	productData: ProductInterface | null;
	loading: boolean;
};

export interface IItem {
	idproduct: number;
	idcart: number;
	quantity: number;
};

const Product = () => {
	const [productState, setProductState] = useState<ProductState>({
		productData: null,
		loading: true,
	});

	const toast = useToast();

	const context = useContext(AuthContext);

	const [cookies, setCookies] = useCookies(["user-token", "session"]);

	const navigate = useNavigate();

	const { id } = useParams();

	const [counter, setCounter] = useState<number>(1);

	const addCounter = () => setCounter(counter + 1);

	const substractCounter = () => {
		setCounter(counter - 1);
		if (counter < 2) setCounter(1);
	};

	useEffect(() => {
		const fetchProductData = async () => {
			const res = await getProduct(id as string);
			setProductState({
				productData: res,
				loading: false,
			});
		};

		fetchProductData();
	}, [id]);

	const fetchNewShoppingSession = async (userId: string) => {
		const res = await startShoppingSession(userId);
		return res.id;
	};

	const fetchAddItemsToCart = async () => {
		if(context?.shoppingSession) {
			const newItem: IItem = {
				idcart: context.shoppingSession.id,
				idproduct: productState.productData?.id as number,
				quantity: counter,
			};
			const res = await addItemsToCart(newItem);
			
			context!.setTriggerContext(!context!.triggerContext);

			toast({
				title: "Exito",
				description: "Producto añadido al carrito",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			return res;
		} else {
			toast({
				title: "Información",
				description: "Sesión de compra iniciada",
				status: "info",
				duration: 9000,
				isClosable: true,
			});
		};
	};

	const handleOnAddToCart = async () => {
		if(cookies["user-token"]) {
			if(context?.shoppingSession) {
				await fetchAddItemsToCart();
				
			} else {
				const idShoppingSession =  await fetchNewShoppingSession(context?.userData?.id.toString() as string);
				await setCookies("session", idShoppingSession);
				
				await fetchAddItemsToCart();
			};
		} else {
			navigate("/login");
		}
	};

	

	return (
		<article className="flex flex-col items-center gap-8 pt-40 pb-32 bg-slate-50">
			<section className="flex w-3/4 gap-8">
				<div className="w-1/2 p-4 bg-white border rounded-sm border-slate-200">
					<img
						id="product-thumbnail"
						className="object-contain w-full rounded-sm h-80"
						src={productState.productData?.img_url}
						alt={productState.productData?.name}
					/>
				</div>
				<div className="w-1/2 p-6 bg-white border rounded-sm border-slate-200">
					<h2 id="product-name" className="text-3xl font-bold">
						{productState.productData?.name}
					</h2>
					<div className="flex mt-3 mb-3">
						<p id="product-sku" className="text-sm">
							SKU: {productState.productData?.SKU}
						</p>
					</div>
					<hr />
					<div className="mt-4">
						<p className="mb-2 text-sm">Precio:</p>
						<p id="product-price" className="text-2xl font-bold">
							COP $ {productState.productData?.price}
						</p>
					</div>
					<div className="mt-4">
						<p className="mb-2 text-sm">Cantidad:</p>
						<div className="flex items-center border rounded-lg border-slate-200 w-fit">
							<button
								onClick={substractCounter}
								className="flex items-center justify-center w-10 h-10 p-1 rounded-l-lg bg-slate-300"
							>
								<FiMinus />
							</button>
							<div className="flex items-center justify-center w-10 h-10">
								{counter}
							</div>
							<button
								onClick={addCounter}
								className="flex items-center justify-center w-10 h-10 p-1 rounded-r-lg bg-slate-300"
							>
								<FiPlus />
							</button>
						</div>
					</div>
					<div className="mt-6">
						<button
							id="add-to-cart-btn"
							className="px-3 py-2 mr-3 text-sm font-bold text-white transition-colors bg-[#FFA341] rounded-md hover:underline hover:bg-yellow-600"
							onClick={handleOnAddToCart}
						>
							{
								context?.shoppingSession ? (
									<>Añadir al carrito</>
								) : (
									<>Empezar sesión de compra</>
								)
							}
						</button>
					</div>
				</div>
			</section>

			<section className="flex w-3/4 gap-8">
				<div className="w-1/2 p-4 bg-white border rounded-sm border-slate-200">
					<h2 id="product-name" className="mb-2 text-3xl font-bold">
						Detalles
					</h2>
					<hr className="mb-4" />
					<p id="product-description" className="mb-4 text-md">
						{productState.productData?.description}
					</p>
					<p id="product-weight" className="mb-4 text-sm">
						Categoria: {productState.productData?.category.name}
					</p>
					<p id="product-stock" className="mb-4 text-sm">
						Stock: {productState.productData?.inventory.quantity}
					</p>
				</div>
				<div className="w-1/2"></div>
			</section>
		</article>
	);
};

export default Product;
