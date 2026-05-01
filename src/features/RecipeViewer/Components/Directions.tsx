import { DirectionLine } from './Direction';

interface Props {
	directions: { text: string }[];
}

export function Directions({ directions }: Props) {
	return (
		<ol className="ml-4 flex list-decimal flex-col gap-2">
			{directions.map((direction) => (
				<DirectionLine key={direction.text} direction={direction} />
			))}
		</ol>
	);
}
