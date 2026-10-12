import { useState } from 'react';
import { useTimeout } from 'usehooks-ts';
import type { Recipe } from '@/functions/recipes';
import { Button } from '../../components/core';

export const CopyToClipboardButton = ({ recipe }: { recipe: Recipe }) => {
	const [label, setLabel] = useState('Copy to Clipboard');
	const [delay, setDelay] = useState(0);

	useTimeout(() => setLabel('Copy to Clipboard'), delay);

	const handleClick = () => {
		const text = JSON.stringify(recipe, null, 2);
		navigator.clipboard.writeText(text).then(
			(e) => console.log(e),
			(e) => console.error(e),
		);
		setLabel('Copied to clipboard!');
		setDelay(2000);
	};

	return <Button onClick={handleClick}>{label}</Button>;
};
