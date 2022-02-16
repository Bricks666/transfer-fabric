import { FriendlyList } from "../FriendlyList";
import { Vote } from "../Vote";
import { useVotes, useVotesLoading } from "../../hooks";

export const VotesList = () => {
	const votes = useVotes();
	const isLoading = useVotesLoading();

	return (
		<FriendlyList
			items={votes}
			Card={Vote}
			indexedBy="id"
			isLoading={isLoading}
			emptyLabel="There haven't been votes by now"
		/>
	);
};
