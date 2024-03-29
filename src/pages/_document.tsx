import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head />
			<body className="h-screen dark:bg-neutral-900">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
