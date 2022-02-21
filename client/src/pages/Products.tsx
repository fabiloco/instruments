import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../components/shared/Pagination";
import { getProductsByCategory } from "../services/productsService";

interface Category {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

interface Inventory {
    id: number;
    quantity: number;
    createdAt: string;
}

interface Discount {
    id: number;
    name: string;
    description: string;
}

interface Product {
    id: number;
    discount_id: number;
    inventory_id: number;
    category_id: number;
    name: string;
    description: string;
    SKU: string;
    price: number;
    img_url: string;
    createdAt: string;
    category: Category;
    inventory: Inventory;
    discount: Discount;
}

interface ProductsState {
    products: Array<Product>;
    loading: boolean;
}

const Products = () => {
    const { id } = useParams();

    const [productsState, setProductsState] = useState<ProductsState>({
        loading: true,
        products: [],
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getProductsByCategory(id as string);
            setProductsState({
                products: res,
                loading: false,
            });
        };

        fetchProducts();
    }, [id]);

    return (
        <div className="pt-28 bg-slate-50">
            <div className="bg-[#FFCF9B] py-6 px-4">
                <Heading size={"2xl"}>Productos</Heading>
            </div>

            <Container maxW="container.lg" mt={"12"}>
                {/* <div className="bg-white border border-slate">
						<div className="bg-[#FFCF9B] py-2 px-4">
							<Heading size={"sm"}>Categorias</Heading>
						</div>
					</div> */}

                <div className="w-full mt-12">
                    <Grid templateColumns="repeat(3, 1fr)" gap={8}>
                        {productsState.products.map((element, i) => {
                            return (
                                <GridItem key={i}>
                                    <Product data={element} />
                                </GridItem>
                            );
                        })}
                    </Grid>
                </div>
                <div className="flex items-center justify-center w-full mt-24">
                    <Pagination />
                </div>
            </Container>
        </div>
    );
};

interface ProductProps {
    data: Product;
}

const Product = (props: ProductProps) => {
    return (
        <Link to={`/product/${props.data.id}`}>
            <div className="w-full bg-white border border-slate-100">
				<img className="object-contain w-full h-64" src={props.data.img_url} alt={props.data.name}/>
                <div className="p-4">
                    <p className="mb-2 font-bold">{props.data.name}</p>
                    <p className="mb-2 font-bold text-red-500">$ COP {props.data.price}</p>
                    {
                        props.data.inventory.quantity > 0 ?(
                            <div className="flex items-center">
                                <div className="block w-4 h-4 mr-2 bg-green-500 rounded-full"></div>
                                <p className="font-bold text-green-500">Disponible</p>
                            </div>
                        ) : (
                            <div className="flex">
                                <div className="block w-4 h-4 bg-red-500 rounded-full"></div>
                                <p className="font-bold text-red-500">Agotado</p>
                            </div>
                        )
                    }
                </div>
			</div>
        </Link>
    );
};

export default Products;
