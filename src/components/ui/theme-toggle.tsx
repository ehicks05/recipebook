import { Laptop, Moon, Sun } from 'lucide-react';
import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './theme-provider';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger
				render={
          <button className='w-full'>
            {theme === 'light' && <Sun />}
            {theme === 'dark' && <Moon />}
            {theme === 'system' && <Laptop />}
            Theme
					</button>
				}
			/>
      <DropdownMenuSubContent>
        <DropdownMenuGroup>

				<DropdownMenuItem onClick={() => setTheme('light')}><Sun />Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}><Moon />Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
				<Laptop />System
				</DropdownMenuItem>
        </DropdownMenuGroup>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
}
