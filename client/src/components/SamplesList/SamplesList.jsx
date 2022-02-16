import { useMappedSamples, useSamplesLoading } from "../../hooks";
import { FriendlyList } from "../FriendlyList";
import { Sample } from "../Sample";

export const SamplesList = () => {
	const samples = useMappedSamples();
	const isLoading = useSamplesLoading();

	return (
		<FriendlyList
			items={samples}
			Card={Sample}
			indexedBy="name"
			isLoading={isLoading}
			emptyLabel="There aren't any samples"
		/>
	);
};
