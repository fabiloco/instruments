import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
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

export interface Product {
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
        <div className="pt-28 bg-slate-50 pb-28">
            <div className="bg-[#FFCF9B] py-8 px-6">
                <Heading size={"3xl"} fontWeight={"medium"} fontFamily={"heading"}>Productos</Heading>
            </div>

            <Container maxW="container.lg" mt={"12"}>
                {/* <div className="bg-white border border-slate">
						<div className="bg-[#FFCF9B] py-2 px-4">
							<Heading size={"sm"}>Categorias</Heading>
						</div>
					</div> */}
                <div className="flex items-center">
                    <div className="w-16 h-2 bg-[#FFCF9B] mr-4"></div>
                    <p className="text-xl">{productsState.products.length} resultados</p>
                </div>
                <div className="w-full mt-12">
                    <Grid templateColumns="repeat(3, 1fr)">
                        {productsState.products.map((element, i) => {
                            return (
                                <GridItem key={i}>
                                    <ProductItem data={element} />
                                </GridItem>
                            );
                        })}
                    </Grid>
                </div>
                {/* <div className="flex items-center justify-center w-full mt-24">
                    <Pagination />
                </div> */}
            </Container>
        </div>
    );
};

export default Products;
