'use client';

import { useState } from 'react';

interface Props {
	direction: { text: string };
}

export function DirectionLine({ direction }: Props) {
	const [isDone, setIsDone] = useState(false);
	const toggle = () => setIsDone(!isDone);

	return (
		<li
			key={direction.text}
			className={`cursor-pointer ${isDone ? 'line-through opacity-50' : ''}`}
		>
			<button type="button" onClick={toggle} className="text-left">
				<span className={'flex flex-col gap-2'}>
					{direction.text.split('\n\n').map((paragraph) => (
						<span className={`${isDone ? 'line-clamp-1' : ''}`} key={paragraph}>
							{paragraph}
						</span>
					))}
				</span>
			</button>
		</li>
	);
}
