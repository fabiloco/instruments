import axios from "axios";

import { config } from "../config";

export interface LoginUserState {
	username: string;
	password: string;
}

export interface RegisterUserState {
	first_name1: string;
	first_name2: string;
	last_name1: string;
	last_name2: string;
	email: string;
	phone: number;
	password: string;
	user_name: string;
}

export const login = async (user: LoginUserState) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/v1/auth/login`, user, {
			headers: config.headers,
		});
		return res.data.token;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
	}
};

export const register = async (user: RegisterUserState) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/v1/user`, user, {
			headers: config.headers,
		});
        return true;
	} catch (err: any) {
		console.log("Error fetching register: ", err.response);
        return false;
	}
};