import {
	createContext,
	ReactNode,
	useState,
	useEffect,
} from "react";

import { isAuthenticated } from "../services/authService";

import { useCookies } from "react-cookie";
import { Product } from "../pages/Products";
import { getCartItemsByCartId, getStartedShoppingSessionByUserId } from "../services/cartService";

interface AuthProviderProps {
	children: ReactNode;
}

export interface UserData {
    state: string;
	id: number;
	user_name: string;
	first_name1: string;
    first_name2: string;
    last_name1: string;
    last_name2: string;
    email: string;
    img_profile: string;
	phone: string;
	createdAt: string;
}

export interface ICartItems {
	id: number;
	quantity: number;
	cart_id: number,
	product_id: number;
	createdAt: string;
	product: Product;
}

interface ICart {
	cart: Array<ICartItems>
}

interface IShoppingSession {
	id: number;
	total_amount: number;
	user_id: number;
};

interface UserDataContext {
	userData: UserData | null;
	setAuthData: React.Dispatch<React.SetStateAction<UserData | null>>;
	
	triggerContext: boolean | null;
	setTriggerContext: React.Dispatch<React.SetStateAction<boolean | null>>;

	shoppingSession: IShoppingSession | null;
	setShoppingSession: React.Dispatch<React.SetStateAction<IShoppingSession | null>>;
}

export const AuthContext = createContext<UserDataContext | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
	const [cookies, setCookies,removeCookie] = useCookies(["user-token", "session"]);

	const [authState, setAuthState] = useState<UserData | null>(null);	// null = charging, UserData = logged, false = un logged
	const [triggerState, setTriggerState] = useState<boolean | null>(null);	
	const [shoppingSession, setShoppingSession] = useState<IShoppingSession | null>(null);	

	useEffect(() => {
		const fetchingGlobalData = async () => {
			setAuthState(null);
			const res = await isAuthenticated(cookies["user-token"]);
			// console.log(res);
			if (res) {
				setAuthState({
					state: 'auth',
					id: res.user.id,
					user_name: res.user.user_name,
					first_name1: res.user.first_name1,
					first_name2: res.user.first_name2,
					last_name1: res.user.last_name1,
					last_name2: res.user.last_name2,
					email: res.user.email,
					img_profile: res.user.img_profile,
					phone: res.user.phone,
					createdAt: res.user.createdAt,
				});
			} else {
				setAuthState({
					state: 'notAuth',
					id: 0,
					user_name: "",
					first_name1: "",
					first_name2: "",
					last_name1: "",
					last_name2: "",
					email: "",
					img_profile: "",
					phone: "",
					createdAt: "",
				});
				removeCookie("user-token");
			}

			setShoppingSession(null);
			const shoppingRes = await getStartedShoppingSessionByUserId(res.user.id);
			if (shoppingRes) {
				setCookies("session", shoppingRes.id);
			}
			setShoppingSession(shoppingRes);
		};
		fetchingGlobalData();
	}, [cookies]);

	return (
		<AuthContext.Provider
			value={{
				userData: authState,
				setAuthData: setAuthState,
				triggerContext: triggerState,
				setTriggerContext: setTriggerState,
				shoppingSession: shoppingSession,
				setShoppingSession: setShoppingSession
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};