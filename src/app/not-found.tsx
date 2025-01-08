import { Card, Hero } from 'components/core';
import Link from 'next/link';

export default function NotFound() {
	return (
		<Card className="text-white">
			<h2 className="text-xl">Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>
		</Card>
	);
}
