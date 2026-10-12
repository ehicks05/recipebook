import { Link } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';
import { UserButton } from '../auth/user/user-button';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '../ui/navigation-menu';
import { ModeToggle } from '../ui/theme-toggle';
import { SiteLogo } from './SiteLogo/SiteLogo';

export default function Header() {
	const { data: session } = authClient.useSession();
	const user = session?.user;

	const ALWAYS = [{ to: '/import-recipe', label: 'Import' }];
	const AUTHED = [
		{ to: '/create-recipe', label: 'Create Recipe' },
		{ to: '/me', label: 'My Stuff' },
	];

	return (
		<header className="p-4 flex justify-between items-center w-full max-w-screen-2xl mx-auto">
			<SiteLogo />

			<div>
				<NavigationMenu>
					<NavigationMenuList>
						<ModeToggle />
						{ALWAYS.map(({ to, label }) => (
							<NavigationMenuItem key={to}>
								<NavigationMenuLink render={<Link to={to}>{label}</Link>} />
							</NavigationMenuItem>
						))}

						{user && (
							<>
								{AUTHED.map(({ to, label }) => (
									<NavigationMenuItem key={to}>
										<NavigationMenuLink render={<Link to={to}>{label}</Link>} />
									</NavigationMenuItem>
								))}
							</>
						)}

						<NavigationMenuItem>
							<UserButton size="icon" hideSettings />
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
