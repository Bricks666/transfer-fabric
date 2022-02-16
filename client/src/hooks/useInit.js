import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { initThunk } from "../models/core";

export const useInit = () => {
	const isInitialling = useSelector((state) => state.core.isInitialling);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initThunk());
	}, [dispatch]);

	return isInitialling;
};
