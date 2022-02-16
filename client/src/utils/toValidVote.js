export const toValidVote = (vote) => {
  debugger
	return {
		id: vote.id,
		candidate: vote.loginToOffer,
		voters: vote.listVoteFor,
		against: vote.VoteAgainst,
		isFinish: vote.finished,
	};
};
