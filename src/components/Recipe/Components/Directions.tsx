import type { direction } from '@prisma/client';
import React from 'react';
import { Direction } from '.';

interface Props {
	directions: direction[];
}

function Directions({ directions }: Props) {
	return (
		<div className="content">
			<ol className="ml-4 flex list-decimal flex-col gap-2 dark:text-neutral-200">
				{directions.map((direction) => (
					<Direction key={direction.text} direction={direction} />
				))}
			</ol>
		</div>
	);
}

export default Directions;
