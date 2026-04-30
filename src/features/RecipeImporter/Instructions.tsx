import { Alert, Container } from '@/components/core';

export const Instructions = () => (
	<Container>
		<Alert variant="info" title="What is this page?">
			<div className="max-w-prose">
				Here you can paste the url of a recipe from the web. If it includes
				web-friendly metadata, you will be able to see it here.
				<br />
				<br />
				Check the imported recipe carefully! Depending on how the website formats
				their metadata, imported recipes can wind up with parts missing or garbled.
			</div>
		</Alert>
	</Container>
);
