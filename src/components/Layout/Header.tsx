import { Import, Plus, Shapes } from 'lucide-react';
import { UserButton } from '../auth/user/user-button';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '../ui/navigation-menu';
import { ModeToggle } from '../ui/theme-toggle';
import { SiteLogo } from './SiteLogo/SiteLogo';

export default function Header() {
	return (
		<header className="p-4 py-2 flex justify-between items-center w-full max-w-screen-2xl mx-auto">
			<SiteLogo />

			<div>
				<NavigationMenu>
					<NavigationMenuList className="gap-2">
						<NavigationMenuItem>
							<UserButton
								hideSettings
								links={[
									{
										href: '/import-recipe',
										label: 'Import Recipe',
										icon: <Import />,
										visibility: 'always',
									},
									{
										href: '/create-recipe',
										label: 'Create Recipe',
										icon: <Plus />,
										visibility: 'authenticated',
									},
									{
										href: '/me',
										label: 'My Stuff',
										icon: <Shapes />,
										visibility: 'authenticated',
                  },
									<ModeToggle key='modeToggle' />
								]}
							/>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
