"use client";

/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HiMenu, HiUserCircle, HiX } from "react-icons/hi";
import Link from "next/link";
import AuthDialog from "components/AuthDialog";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";
import { toGravatarUrl } from "./gravatar";

const Nav = () => {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const navigation = [
    {
      name: "Create Recipe",
      href: "/create-recipe",
      current: router.pathname.includes("/create-recipe"),
      hidden: !user,
    },
    {
      name: "Import",
      href: "/recipe-import",
      current: router.pathname.includes("/recipe-import"),
    },
  ];

  const loggedOutMenuItems = (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={() => setShowAuthModal(true)}
          className={clsx(
            "block bg-neutral-100 px-4 py-2 text-sm text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200",
            {
              "hover:dark:bg-neutral-600": active,
            },
          )}
        >
          Log In
        </div>
      )}
    </Menu.Item>
  );

  const accountItems = [
    { to: "/account", label: "Your Account" },
    { to: "#", label: "Log out", onClick: () => supabase.auth.signOut() },
  ];
  const loggedInMenuItems = accountItems.map((item) => (
    <Menu.Item key={item.label}>
      {({ active }) => (
        <Link
          href={item.to}
          className={clsx("block px-4 py-2 text-sm", {
            "bg-neutral-100 dark:bg-neutral-700 hover:dark:bg-neutral-600":
              active,
          })}
          onClick={item.onClick}
        >
          {item.label}
        </Link>
      )}
    </Menu.Item>
  ));

  return (
    <>
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
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Image
                        className="block h-8 w-auto lg:hidden"
                        src="/favicon/favicon.png"
                        alt="logo"
                        width={64}
                        height={64}
                        priority
                      />
                      <Image
                        className="hidden h-8 w-auto lg:block"
                        src="/logo.png"
                        alt="logo"
                        width={482}
                        height={66}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation
                        .filter((item) => !item.hidden)
                        .map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                              "rounded-md px-3 py-2 text-sm font-medium",
                              item.current
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
                        <span className="sr-only">Open user menu</span>

                        {!user?.email && (
                          <div className="rounded-full p-1 text-neutral-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:bg-neutral-800 dark:hover:text-white">
                            <HiUserCircle className="h-8 w-8 text-white" />
                          </div>
                        )}
                        {user?.email && (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={toGravatarUrl(user?.email)}
                            alt="avatar"
                          />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-700 dark:text-neutral-200">
                        {user && loggedInMenuItems}
                        {!user && loggedOutMenuItems}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation
                  .filter((item) => !item.hidden)
                  .map((item) => (
                    <a
                      key={item.name}
                      onClick={() => void router.push(item.href)}
                      className={clsx(
                        "block rounded-md px-3 py-2 text-base font-medium",
                        item.current
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <AuthDialog
        isOpen={showAuthModal}
        hideModal={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Nav;
