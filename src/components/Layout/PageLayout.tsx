import { Footer } from './Footer';
import { Header } from './Header';

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<div className="grow">{children}</div>
			<Footer />
		</div>
	);
};
