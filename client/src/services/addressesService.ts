import axios from "axios";
import { Address, NewAddress } from "../components/EditAddress";

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

export const getAddressByUser = async (userId: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/address/by-user/${userId}`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching getAddressByUser: ", err.response);
	}
};

export const deleteAddress = async (id: string) => {
	try {
		const res = await axios.delete(`${config.API_URL}/api/v1/address/${id}`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching deleteAddress: ", err.response);
	}
};

export const createAddress = async (body: NewAddress) => {
	// console.log(body);
	try {
		const res = await axios.post(`${config.API_URL}/api/v1/address`, body, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching createAddress: ", err.response);
	}
};

export const updateAddress = async (id: string, body: Address) => {
	delete body.id;
	delete body.state;
	try {
		const res = await axios.patch(`${config.API_URL}/api/v1/address/${id}`, body, {
			
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching updateAddress: ", err.response);
	}
};

export const getCountries = async () => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/countries`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching getStates: ", err.response);
	}
};

export const getStateById = async (id: string) => {
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/states/by-country/${id}`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching getStates: ", err.response);
	}
};