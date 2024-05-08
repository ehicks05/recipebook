'use client';

import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	useUser,
} from '@clerk/nextjs';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { SiteLogo } from './SiteLogo';

const Nav = () => {
	const { user } = useUser();
	const router = useRouter();

	const navigation = [
		{
			name: 'Create Recipe',
			href: '/create-recipe',
			current: router.pathname.includes('/create-recipe'),
			hidden: !user,
		},
		{
			name: 'Import',
			href: '/recipe-import',
			current: router.pathname.includes('/recipe-import'),
		},
		...(user
			? [
					{
						name: 'My Stuff',
						href: '/my-stuff',
						current: router.pathname.includes('/my-stuff'),
					},
				]
			: []),
	];

	return (
		<Disclosure as="nav" className="bg-neutral-900">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-screen-2xl px-4">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<HiX className="block h-6 w-6" aria-hidden="true" />
									) : (
										<HiMenu className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<SiteLogo />
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation
											.filter((item) => !item.hidden)
											.map((item) => (
												<Link
													key={item.name}
													href={item.href}
													className={clsx(
														'rounded-md px-3 py-2 text-sm font-medium',
														item.current
															? 'bg-neutral-900 text-white'
															: 'text-neutral-300 hover:bg-neutral-700 hover:text-white',
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</Link>
											))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<div className="text-neutral-800 dark:text-neutral-300 inp">
									<SignedIn>
										<UserButton />
									</SignedIn>
									<SignedOut>
										<SignInButton mode="modal" />
									</SignedOut>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation
								.filter((item) => !item.hidden)
								.map((item) => (
									<button
										type="button"
										key={item.name}
										onClick={() => void router.push(item.href)}
										className={clsx(
											'block rounded-md px-3 py-2 text-base font-medium',
											item.current
												? 'bg-neutral-900 text-white'
												: 'text-neutral-300 hover:bg-neutral-700 hover:text-white',
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</button>
								))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Nav;
