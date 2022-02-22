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

export const getProductsByCategory = async (id: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/products/by-category/${id}`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
	}
};

export const getProducts = async () => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/products`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
	}
};

export const getProductsWithDiscount = async () => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/products/discount`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching getProductsWithDiscount: ", err.response);
	}
};

export const getProduct = async (id: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/products/${id}`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
	}
};