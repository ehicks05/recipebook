import { Laptop, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './theme-provider';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
          <Button variant="ghost" className='flex items-center gap-1' size="icon">
            {theme === 'light' && <Sun />}
            {theme === 'dark' && <Moon />}
            {theme === 'system' && <Laptop />}
					</Button>
				}
			/>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => setTheme('light')}><Sun />Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}><Moon />Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
				<Laptop />System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
