import { Link } from '@tanstack/react-router';
import Logo from './logo.png';
import ShortLogo from './shortLogo.png';

export const SiteLogo = () => {
	return (
		<div className="flex shrink-0 items-center">
			<Link to="/">
				<img className="block h-7 w-auto lg:hidden" src={ShortLogo} alt="logo" />
				<img className="hidden h-7 w-auto lg:block" src={Logo} alt="logo" />
			</Link>
		</div>
	);
};
