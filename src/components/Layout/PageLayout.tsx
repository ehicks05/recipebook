import { Footer } from './Footer';
import { Header } from './Header';

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<div className="grow">{children}</div>
			<Footer />
		</>
	);
};
