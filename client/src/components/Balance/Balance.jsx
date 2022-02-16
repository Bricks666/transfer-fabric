import { useUserInfo } from "../../hooks";

export const Balance = () => {
	const { balance } = useUserInfo();
  console.log("asdad")
	return <p>Balance: {balance.toFixed(6)} C</p>;
};
