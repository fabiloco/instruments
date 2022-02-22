import axios from "axios";
import { IEndSession, IRemoveItem } from "../components/Cart";

import { config } from "../config";
import { IItem } from "../pages/Product";

export const startShoppingSession = async (userId: string) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/v1/cart/shopping-session/${userId}`, {
			headers: config.headers,
		});
		return res.data[0];
	} catch (err: any) {
		console.log("Error fetching startShoppingSession: ", err.response);
	}
};

export const getStartedShoppingSessionByUserId = async (userId: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/cart/shopping-session/${userId}`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching getStartedShoppingSessionByUserId: ", err.response);
	}
};

export const addItemsToCart = async (item: IItem) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/v1/cart/add-item`, item, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching addItemsToCart: ", err.response);
	}
};

export const getCartItemsByCartId = async (cartId: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/cart-item/by-cart-id/${cartId}`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching getCartItemsByCartId: ", err.response);
	}
};

export const removeItemFromTheCart = async (item: IRemoveItem) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/v1/cart/remove-item`, item, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching addItemsToCart: ", err.response);
	}
};

export const endCartSession = async (item: IEndSession) => {
	try {
		const res = await axios.post(`${config.API_URL}/api/v1/cart/end-shopping`, item, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching addItemsToCart: ", err.response);
	}
};