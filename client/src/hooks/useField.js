import { useCallback, useState } from "react";

export const useField = (initialValues = "") => {
	const [value, setValue] = useState(initialValues);

	const onChange = useCallback((evt) => {
		setValue(evt.target.value);
	}, []);

	return [value, onChange];
};
