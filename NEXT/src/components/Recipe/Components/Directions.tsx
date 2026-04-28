import React from 'react';
import type { Direction } from 'trpc/types';
import { DirectionLine } from './Direction';

interface Props {
	directions: Direction[];
}

export function Directions({ directions }: Props) {
	return (
		<div className="content">
			<ol className="ml-4 flex list-decimal flex-col gap-2 dark:text-neutral-200">
				{directions.map((direction) => (
					<DirectionLine key={direction.text} direction={direction} />
				))}
			</ol>
		</div>
	);
}
