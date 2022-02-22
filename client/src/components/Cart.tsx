import { Button, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endCartSession, getCartItemsByCartId, removeItemFromTheCart } from "../services/cartService";
import { AuthContext, ICartItems } from "./GlobalState";

export interface CartProps {
    isOpen: boolean;
    setIsOpen: (a: boolean) => void,
};

interface CartState {
    data: Array<ICartItems>;
    loading: boolean;
};

export interface IRemoveItem {
	idproduct: number;
	idcart: number;
};

export interface IEndSession {
	idcart: number;
    message: string;
};

const Cart = (props: CartProps) => {

    const [cartState, setCartState] = useState<CartState>({
        data: [],
        loading: true,
    });

    const context = useContext(AuthContext);

    useEffect(() => {
        const fetchCartProducts = async () => {
            setCartState({
                data: [],
                loading: true,
            });
            const res = await getCartItemsByCartId(context?.shoppingSession?.id.toString() as string);
            if(res) {
                setCartState({
                    data: res,
                    loading: false,
                });
            }
        };
        fetchCartProducts();
    }, [context]);

    const handleOnRemoveFormCart = async (idproduct: number, idcart: number) => {
		const removeItem: IRemoveItem = {
			idproduct,
			idcart,
		}
		await removeItemFromTheCart(removeItem);
        if(context) {
            context.setTriggerContext(!context.triggerContext);
        }
	};

    const handleOnCheckout = async () => {
        const endSession: IEndSession = {
            idcart: cartState.data[0].cart_id,
            message: "DONE",
        };
        await endCartSession(endSession);

        if(context) {
            context.setTriggerContext(!context.triggerContext);
        }

        window.location.href = "/";
    };
    
    return (
        <div
            className={`fixed inset-0 overflow-hidden ${props.isOpen ? 'block' : 'hidden'}`}
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    aria-hidden="true"
                ></div>

                <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="w-screen max-w-md">
                        <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2
                                        className="text-lg font-medium text-gray-900"
                                        id="slide-over-title"
                                    >
                                        Shopping cart
                                    </h2>
                                    <div className="flex items-center ml-3 h-7">
                                        <button
                                            type="button"
                                            className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                                            onClick={(e) => {
                                                props.setIsOpen(false)
                                            }}
                                        >
                                            <span className="sr-only">
                                                Close panel
                                            </span>

                                            <svg
                                                className="w-6 h-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        {
                                            !cartState.loading ?(
                                                <>
                                                    <ul
                                                        role="list"
                                                        className="-my-6 divide-y divide-gray-200"
                                                    >
                                                        {
                                                            cartState.data.map((element, i) => {
                                                                return(
                                                                    <li key={i} className="flex py-6">
                                                                        <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                                                            <img
                                                                                src={element.product.img_url}
                                                                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                                                className="object-contain object-center w-full h-full"
                                                                            />
                                                                        </div>

                                                                        <div className="flex flex-col flex-1 ml-4">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3>
                                                                                        <Link
                                                                                            to={`/product/${element.product.id}`}
                                                                                        >
                                                                                            {element.product.name}
                                                                                        </Link>
                                                                                    </h3>
                                                                                    <p className="ml-4">
                                                                                        $ COP {element.product.price}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-end justify-between flex-1 text-sm">
                                                                                <p className="text-gray-500">
                                                                                    Cantidad: {element.quantity}
                                                                                </p>

                                                                                <div className="flex">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="font-medium text-[#FFA341] hover:text-yellow-600"
                                                                                        onClick={() => {
                                                                                            handleOnRemoveFormCart(element.product_id, element.cart_id)
                                                                                        }}
                                                                                    >
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            })
                                                        }
                                                    </ul>
                                                </>
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full">
                                                    <Spinner />
                                                </div>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$ COP {context?.shoppingSession?.total_amount}</p>
                                </div>
                                
                                <div className="mt-6">
                                    <Button
                                        disabled={cartState.data.length < 1}
                                        onClick={handleOnCheckout}
                                        bg={"#FFA341"}
										color={"white"}
										_hover={{
											bg: "yellow.600",
										}}
                                    >
                                        Hacer la compra
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
