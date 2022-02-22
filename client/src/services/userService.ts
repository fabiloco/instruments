import axios from "axios";
import { Address } from "../components/EditAddress";
import { User } from "../components/EditProfile";

import { config } from "../config";

export const getUserDataById = async (userId: string) => {
	// console.log(userId);
	try {
		const res = await axios.get(`${config.API_URL}/api/v1/user/${userId}`, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching getAddressByUser: ", err.response);
	}
};


export const editUser = async (userId: string, body: User) => {
	try {
        const fd = new FormData();

        delete body.id;
        delete body.createdAt;
		delete body.img_profile;

        console.log(body);

        fd.append('user_name', body.user_name);
        fd.append('first_name1', body.first_name1);
        fd.append('first_name2', body.first_name2);
        fd.append('last_name1', body.last_name1);
        fd.append('last_name2', body.last_name2);
        fd.append('email', body.email);
        fd.append('phone', body.phone);
        fd.append('img_profile', body.img_profile);

		const res = await axios.patch(`${config.API_URL}/api/v1/user/${userId}`, body, {
			headers: config.headers,
		});
		return res.data;
	} catch (err: any) {
		console.log("Error fetching getAddressByUser: ", err.response);
	}
};