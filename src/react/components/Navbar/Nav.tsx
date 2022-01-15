/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { HiMenu, HiUserCircle, HiX } from 'react-icons/hi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authFetch from '../../authFetch';
import { UserContext } from '../../UserContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    {
      name: 'Create Recipe',
      href: '/create-recipe',
      current: location.pathname.includes('/create-recipe'),
      hidden: !user,
    },
    {
      name: 'Blog',
      href: '/blog',
      current: location.pathname.includes('/blog'),
    },
  ];

  function logout() {
    authFetch('/logout', undefined, false).then(() => {
      setUser(undefined);
      navigate('/');
    });
  }
  const loggedOutMenuItems = (
    <Menu.Item>
      {({ active }) => (
        <Link
          to="/login"
          className={classNames(
            active ? 'bg-neutral-100' : '',
            'block px-4 py-2 text-sm text-neutral-700'
          )}
        >
          Log In
        </Link>
      )}
    </Menu.Item>
  );

  const accountItems = [
    { to: '/my-account', label: 'My Account' },
    { to: '#', label: 'Log out', onClick: logout },
  ];
  const loggedInMenuItems = accountItems.map(item => (
    <Menu.Item>
      {({ active }) => (
        <Link
          to={item.to}
          className={classNames(
            active ? 'bg-neutral-100' : '',
            'block px-4 py-2 text-sm text-neutral-700'
          )}
          onClick={item.onClick}
        >
          {item.label}
        </Link>
      )}
    </Menu.Item>
  ));

  return (
    <Disclosure as="nav" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="/favicon/favicon.png"
                      alt="logo"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/logo.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation
                      .filter(item => !item.hidden)
                      .map(item => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-neutral-900 text-white'
                              : 'text-neutral-300 hover:bg-neutral-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
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
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-neutral-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <HiUserCircle className="h-8 w-8 text-white" />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user && loggedInMenuItems}
                      {!user && loggedOutMenuItems}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation
                .filter(item => !item.hidden)
                .map(item => (
                  <a
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={classNames(
                      item.current
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-300 hover:bg-neutral-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
