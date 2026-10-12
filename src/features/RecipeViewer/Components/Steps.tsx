import { useState } from 'react';

interface StepRowProps {
	step: { text: string };
}

function StepRow({ step }: StepRowProps) {
	const [isDone, setIsDone] = useState(false);
	const toggle = () => setIsDone(!isDone);

	return (
		<li
			key={step.text}
			className={`cursor-pointer ${isDone ? 'line-through opacity-50' : ''}`}
		>
			<button type="button" onClick={toggle} className="text-left">
				<span className={'flex flex-col gap-2'}>
					{step.text.split('\n\n').map((paragraph) => (
						<span className={`${isDone ? 'line-clamp-1' : ''}`} key={paragraph}>
							{paragraph}
						</span>
					))}
				</span>
			</button>
		</li>
	);
}

interface Props {
	steps: { text: string }[];
}

export function Steps({ steps }: Props) {
	return (
		<ol className="ml-4 flex list-decimal flex-col gap-2">
			{steps.map((step) => (
				<StepRow key={step.text} step={step} />
			))}
		</ol>
	);
}
