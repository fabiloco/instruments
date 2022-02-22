import { Badge, Container, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../pages/Products";
import { getProductsWithDiscount } from "../services/productsService";

interface DiscountState {
    data: Array<Product>;
    loading: boolean;
}

const Discount = () => {
    const [discountState, setDiscountState] = useState<DiscountState>({
        data: [],
        loading: true,
    });

    useEffect(() => {
        const fetchDiscountedProducts = async () => {
            setDiscountState({
                ...discountState,
                loading: true,
            });
            const res = await getProductsWithDiscount();
            setDiscountState({
                data: res,
                loading: false,
            });
        };
        fetchDiscountedProducts();
    }, []);

    if (discountState.loading) {
        return (
            <div className="flex items-center justify-center">
                <Spinner size={"xl"} />
            </div>
        );
    } else {
        return (
            <div>
                <div className="mt-10 bg-slate-50 pb-28">
                    <div className="bg-[#FFCF9B] py-8 px-6 mb-10">
                        <Heading
                            size={"3xl"}
                            fontWeight={"medium"}
                            fontFamily={"heading"}
                        >
                            Ofertas
                        </Heading>
                    </div>

                    <Container className="p-4" maxW="container.xl">
                        <div className="flex gap-6">
                            <div className="bg-[#FFCF9B] w-full rounded-lg flex p-4 gap-6">
                                <div className="w-1/2 bg-white rounded-lg h-96">
                                    <Link
                                        to={`/product/${discountState.data[0].id}`}
                                        className="relative flex justify-center w-full h-full"
                                    >
                                        <img
                                            className="object-contain"
                                            src={discountState.data[0].img_url}
                                            alt={discountState.data[0].name}
                                        />
                                        <p className="absolute text-xl bottom-4 opacity-60 bg-[#FFCF9B] p-3 rounded-lg">
                                            {discountState.data[0].name}
                                        </p>
                                        <Badge
                                            className="absolute h-fit top-5 right-5"
                                            bg={"#FFCF9B"}
                                        >
                                            30% Descuento
                                        </Badge>
                                    </Link>
                                </div>
                                <div className="w-1/2 bg-white rounded-lg h-96">
                                    <Link
                                        to={`/product/${discountState.data[1].id}`}
                                        className="relative flex justify-center w-full h-full"
                                    >
                                        <img
                                            className="object-fit"
                                            src={discountState.data[1].img_url}
                                            alt={discountState.data[1].name}
                                        />
                                        <p className="absolute text-xl bottom-4 opacity-60 bg-[#FFCF9B] p-3 rounded-lg">
                                            {discountState.data[0].name}
                                        </p>
                                        <Badge
                                            className="absolute h-fit top-5 right-5"
                                            bg={"#FFCF9B"}
                                        >
                                            30% Descuento
                                        </Badge>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between w-72">
                                <Link to={"products/2"} className="relative w-44 h-28">
                                    <img
                                        className="object-cover w-full rounded-lg shadow-lg h-28"
                                        src="https://cdn.pixabay.com/photo/2017/06/16/12/42/guitar-2409033_960_720.jpg"
                                        alt="acusticas"
                                    />
                                    <p className="absolute text-2xl font-bold text-gray-300 w-44 top-4 left-4">Guitarras acusticas</p>
                                </Link>

                                <Link to={"products/1"} className="relative w-44 h-28">
                                    <img
                                        className="object-cover w-full rounded-lg shadow-lg h-28"
                                        src="https://cdn.pixabay.com/photo/2021/09/08/08/30/music-6606248_960_720.jpg"
                                        alt="acusticas"
                                    />
                                    <p className="absolute text-2xl font-bold text-gray-300 w-44 top-4 left-4">Guitarras Electricas</p>
                                </Link>

                                <Link to={"products/3"} className="relative w-44 h-28">
                                    <img
                                        className="object-cover w-full rounded-lg shadow-lg h-28"
                                        src="https://images.unsplash.com/photo-1546058256-47154de4046c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                                        alt="electricas"
                                    />
                                    <p className="absolute text-2xl font-bold text-gray-300 w-44 top-4 left-4">Teclados</p>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
};

export default Discount;
