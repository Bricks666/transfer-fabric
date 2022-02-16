import { useUserInfo } from "../../hooks/userUserInfo";
import { useVote } from "./useVote";

export const Vote = ({ candidate, voters, against, isFinish, id }) => {
	const { login } = useUserInfo();
	const mayToVote = !voters.includes(login) && !isFinish;
	console.log(id, mayToVote, !voters.includes(login), voters);

	const { voteFor, voteAgainst } = useVote(id);

	const againstLabel = against || "nobody";

	return (
		<div>
			<dl>
				<dt>Candidate:</dt> <dd>{candidate}</dd>
				<dt>Voters</dt>
				<dd>
					<ul>
						{voters.map((voter) => (
							<li key={voter}> {voter}</li>
						))}
					</ul>
				</dd>
				<dt>Against:</dt> <dd>{againstLabel}</dd>
				<dt>Status:</dt> <dd>{isFinish ? "Finished" : "Pending"}</dd>
			</dl>
			{mayToVote && (
				<>
					<button onClick={voteFor}>For</button>
					<button onClick={voteAgainst}>Against</button>
				</>
			)}
		</div>
	);
};
