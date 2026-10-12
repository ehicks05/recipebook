import { CircleQuestionMark } from 'lucide-react';
import { Container } from '@/components/core';
import { Alert, AlertTitle } from '@/components/ui/alert';

export const Instructions = () => (
	<Container>
		<Alert>
			<CircleQuestionMark />
			<AlertTitle>What is this page?</AlertTitle>
			<div>
				Paste the url of a recipe from the web below. If it includes web-friendly
				metadata, it will appear below. Check it carefully! Recipes do not always
				import perfectly.
			</div>
		</Alert>
	</Container>
);
