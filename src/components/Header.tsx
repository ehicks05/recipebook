import { Link, useNavigate } from '@tanstack/react-router';
import { clientDb } from '@/lib/db';
import { SiteLogo } from './coreLayout/SiteLogo';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from './ui/navigation-menu';

export default function Header() {
	const { user } = clientDb.useAuth();
	const navigate = useNavigate();
	const signOut = () => {
		clientDb.auth.signOut().then(() => {
			navigate({ to: '/login' });
		});
	};

	const ALWAYS = [{ to: '/import', label: 'Import' }];
	const NOAUTH = [{ to: '/login', label: 'Log In' }];
	const AUTHED = [{ to: '/create-recipe', label: 'Create Recipe' }];

	return (
		<header className="p-4 px-8 flex justify-between items-center shadow-sm">
			<SiteLogo />

			<div>
				<NavigationMenu>
					<NavigationMenuList>
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
										<Avatar>
											<AvatarImage src={user.imageUrl || ''} />
											<AvatarFallback>{user.email?.slice(0, 2)}</AvatarFallback>
										</Avatar>
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<NavigationMenuLink render={<Link to="/me">My Stuff</Link>} />
										<NavigationMenuLink onClick={signOut}>
											Sign Out
										</NavigationMenuLink>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</>
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
