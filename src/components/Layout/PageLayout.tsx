import { Footer } from './Footer';
import Header from './Header';

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			{children}
			<div className="grow" />
			<Footer />
		</>
	);
};
