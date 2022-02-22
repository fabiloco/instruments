import { Container, Grid, GridItem, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Product } from "../pages/Products";
import { getProducts } from "../services/productsService";
import ProductItem from "./ProductItem";

interface MostSelledState {
    data: Array<Product>;
    loading: boolean;
};

const MostSelled = () => {
    const [mostSelled, setMostSelled] = useState<MostSelledState>({ data: [], loading: true });
    
    useEffect(() => {
        const fetchProducts = async () => {
            setMostSelled({ ...mostSelled, loading: true });
            const res = await getProducts();
            setMostSelled({ data: res, loading: false });
        };
        fetchProducts();
    }, []);

    if (mostSelled.loading) {
        return(
            <div className="flex items-center justify-center">
                <Spinner size={"xl"} />
            </div>
        );
    } else {
        return (
            <div>
                <div className=" bg-slate-50 pb-28">
                    <div className="bg-[#FFCF9B] py-8 px-6 mb-10">
                        <Heading
                            size={"3xl"}
                            fontWeight={"medium"}
                            fontFamily={"heading"}
                        >
                            Ultimos productos
                        </Heading>
                    </div>
                    <Container maxW="container.xl">
                        <div className="w-full mt-12">
                            <Grid templateColumns="repeat(3, 1fr)">
                                {[...Array(3)].map((element, i) => {
                                    return (
                                        <GridItem key={i}>
                                            <ProductItem data={mostSelled.data[i]} />
                                        </GridItem>
                                    );
                                })}
                            </Grid>
                        </div>
                    </Container>
                </div>
            </div>
        );
    };
};

export default MostSelled;
