import { Link } from '@tanstack/react-router';
import ShortLogo from './shortLogo.png';

export const SiteLogo = () => (
	<Link to="/">
		<div className="flex shrink-0 items-center gap-2">
			<img className="size-7" src={ShortLogo} alt="logo" />
			<div className="hidden sm:block font-logo font-semibold text-3xl text-orange-500">
				RecipeBook
			</div>
		</div>
	</Link>
);
