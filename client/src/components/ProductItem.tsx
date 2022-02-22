import { Link } from "react-router-dom";
import { Product } from "../pages/Products";

interface ProductProps {
    data: Product;
}

const ProductItem = (props: ProductProps) => {
    return (
        <Link to={`/product/${props.data.id}`}>
            <div className="w-full bg-white border border-slate-100">
				<img className="object-contain w-full h-64" src={props.data.img_url} alt={props.data.name}/>
                <div className="flex flex-col p-4 justify-evenly h-36">
                    <p className="mb-2 font-bold">{props.data.name}</p>
                    <p className="mb-2 text-lg font-bold text-red-500">$ COP {props.data.price}</p>
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

export default ProductItem;