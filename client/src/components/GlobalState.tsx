import {
	createContext,
	ReactNode,
	useState,
	useEffect,
} from "react";

import { isAuthenticated } from "../services/authService";

import { useCookies } from "react-cookie";

interface AuthProviderProps {
	children: ReactNode;
}

export interface UserData {
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

interface UserDataContext {
	userData: UserData | null;
	setAuthData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const AuthContext = createContext<UserDataContext | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
	const [cookies, ,removeCookie] = useCookies(["user-token"]);

	const [authState, setAuthState] = useState<UserData | null>(null);	// null = charging, UserData = logged, false = un logged

	useEffect(() => {
		const fetchUserData = async () => {
			setAuthState(null);
			const res = await isAuthenticated(cookies["user-token"]);
			console.log(res);
			if (res) {
				setAuthState({
					id: res.id,
                    user_name: res.user_name,
                    first_name1: res.first_name1,
                    first_name2: res.first_name2,
                    last_name1: res.last_name1,
                    last_name2: res.last_name2,
                    email: res.email,
                    img_profile: res.img_profile,
                    phone: res.phone,
                    createdAt: res.createdAt,
				});
			} else {
				setAuthState({
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
		};
		fetchUserData();
	}, [cookies]);

	return (
		<AuthContext.Provider
			value={{
				userData: authState,
				setAuthData: setAuthState,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};