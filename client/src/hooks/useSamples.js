import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSamplesThunk } from "../models/samples";

export const useSamples = () => {
	const samples = useSelector((state) => state.samples.list);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!samples.length) {
			dispatch(loadSamplesThunk());
		}
	}, [dispatch, samples.length]);

	return samples;
};
