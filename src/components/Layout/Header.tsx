import { Link, useNavigate } from '@tanstack/react-router';
import { clientDb } from '@/lib/db';
import { UserButton } from '../auth/user/user-button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { ModeToggle } from '../ui/theme-toggle';
import { SiteLogo } from './SiteLogo/SiteLogo';

export default function Header() {
	const { user } = clientDb.useAuth();
	const navigate = useNavigate();
	const signOut = () => {
		clientDb.auth.signOut().then(() => {
			navigate({ to: '/' });
		});
	};

	const ALWAYS = [{ to: '/import-recipe', label: 'Import' }];
	const NOAUTH = [{ to: '/login', label: 'Log In' }];
	const AUTHED = [{ to: '/create-recipe', label: 'Create Recipe' }];

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

						{!user &&
							NOAUTH.map(({ to, label }) => (
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
								<NavigationMenuItem>
									<NavigationMenuTrigger>
										<Avatar size="sm">
											<AvatarFallback>{user.email?.slice(0, 2)}</AvatarFallback>
										</Avatar>
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<NavigationMenuLink render={<Link to="/me">My Stuff</Link>} />
										<NavigationMenuLink onClick={signOut} className="cursor-pointer">
											Sign Out
										</NavigationMenuLink>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</>
						)}

						<UserButton />
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
