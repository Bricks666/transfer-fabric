export const Loading = ({ isLoading, children }) => {
	return isLoading ? <h2>Loading...</h2> : children;
};
