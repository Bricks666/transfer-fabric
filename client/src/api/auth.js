import { instance } from ".";

export const registrationApi = async (login) => {
	const response = await instance.put("auth/registration", { login });
	return response.data;
};

export const loginApi = async (login) => {
	const response = await instance.post("auth/login", { login });
	return response.data;
};

export const getUserApi = async () => {
	const response = await instance.get("/auth/me");

	return response.data.user;
};


export const getUsersApi = async () => {
	const response = await instance.get("/auth/all");

	return response.data.users;
};
