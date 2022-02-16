import Axios from "axios";

export const instance = Axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
});

instance.interceptors.response.use((response) => {
	const { data } = response;
	if ("accessToken" in data) {
		instance.defaults.headers.common.authorization = `Bearer ${data.accessToken}`;
	}

	return response;
});
