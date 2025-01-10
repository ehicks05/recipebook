import { T } from 'components/core';
import React, { useState } from 'react';
import type { Direction } from 'trpc/types';

interface Props {
	direction: Direction;
}

export function DirectionLine({ direction }: Props) {
	const [isDone, setIsDone] = useState(false);
	const toggle = () => setIsDone(!isDone);

	return (
		<li
			key={direction.text}
			className={`cursor-pointer ${isDone ? 'line-through opacity-50' : ''}`}
		>
			<div onClick={toggle} onKeyUp={toggle}>
				<T className={'flex flex-col gap-2'}>
					{direction.text.split('\n\n').map((paragraph) => (
						<span className={`${isDone ? 'line-clamp-1' : ''}`} key={paragraph}>
							{paragraph}
						</span>
					))}
				</T>
			</div>
		</li>
	);
}
