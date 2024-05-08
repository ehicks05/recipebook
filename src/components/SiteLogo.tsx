import Image from 'next/image';
import Link from 'next/link';
import ShortLogo from '../../public/favicon/favicon.png';
import Logo from '../../public/logo.png';

export const SiteLogo = () => {
	return (
		<div className="flex flex-shrink-0 items-center">
			<Link href="/">
				<Image
					className="block h-8 w-auto lg:hidden"
					src={ShortLogo}
					alt="logo"
					loader={() => '/favicon/favicon.png'}
				/>
				<Image
					className="hidden h-8 w-auto lg:block"
					src={Logo}
					alt="logo"
					loader={() => '/logo.png'}
				/>
			</Link>
		</div>
	);
};
