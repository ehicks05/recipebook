import { Import, PlusSquare, Shapes } from 'lucide-react';
import { UserButton } from '../auth/user/user-button';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '../ui/navigation-menu';
import { ModeToggle } from '../ui/theme-toggle';
import { SiteLogo } from './SiteLogo/SiteLogo';

export const Header = () => (
	<header className="p-4 py-2 flex justify-between items-center w-full max-w-screen-2xl mx-auto">
		<SiteLogo />

		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem className="flex items-center">
					<UserButton
						size="icon"
						hideSettings
						links={[
							{
								href: '/create-recipe',
								label: 'Create Recipe',
								icon: <PlusSquare />,
								visibility: 'authenticated',
							},
							{
								href: '/import-recipe',
								label: 'Import Recipe',
								icon: <Import />,
								visibility: 'always',
							},
							{
								href: '/me',
								label: 'My Stuff',
								icon: <Shapes />,
								visibility: 'authenticated',
							},
							<ModeToggle key="modeToggle" />,
						]}
					/>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	</header>
);
