import Carrousel from "../components/Carrousel";
import Discount from "../components/Discount";
import MostSelled from "../components/MostSelled";

const Home = () => {
    return (
        <div className="w-full pt-28">
            <Carrousel />
			<Discount />
			<MostSelled />
        </div>
    );
};

export default Home;
