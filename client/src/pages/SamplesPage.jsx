import { SamplesList } from "../components/SamplesList";
import { CreateSampleForm } from "../components/CreateSampleForm";

export const SamplesPage = () => {
	return (
		<main>
			<h2>Samples Page</h2>
			<CreateSampleForm />
			<SamplesList />
		</main>
	);
};
