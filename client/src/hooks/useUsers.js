import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersThunk } from "../models/users";

export const useUsers = () => {
	const users = useSelector((state) => state.users.list);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUsersThunk());
	}, [dispatch]);

	return users;
};
