import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserThunk } from "../models/user";

export const useUserInfo = () => {
	const user = useSelector((state) => state.user.info);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUserThunk());
	}, [dispatch, user.login]);

	return user;
};
