import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// ESTILOS
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import ButtonLogOut from "../../private/ButtonLogOut";

// TAILWIND
const navigation = [
  { name: "Home", href: "/homep", current: false },
  { name: "Messages", href: "/homep/mensajes", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const NavBar = ({ titulo }) => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Disclosure as="nav" className="bg-nuevoFondo">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <p>LOGO</p>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-nuevoDetalle hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
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
                <Menu as="div" className="ml-3  z-40 bg-verdeMedio  relative">
                  <div>
                    <Menu.Button className="bg-verdeMedio hover:bg-nuevoDetalle flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {isAuthenticated && (
                        <img
                          className="h-8 w-8 rounded-full"
                          alt=""
                          src={user.picture}
                        ></img>
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-verdeClaro ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/homep"
                            className={classNames(
                              active ? "bg-gray-100 hover:bg-verdeHover" : "",
                              "block px-4 hover:bg-verdeHover py-2 text-sm text-gray-700"
                            )}
                          >
                            Home
                          </Link>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/homep/miperfil"
                            className={classNames(
                              active
                                ? "bg-gray-100 hover:bg-nuevoFondo text-black hover:text-white"
                                : "",
                              "block px-4 hover:bg-nuevoDetalle py-2 text-sm text-nuevoFondo text-center "
                            )}
                          >
                            Edit profile
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/homep/favourites"
                            className={classNames(
                              active
                                ? "bg-gray-100 hover:bg-nuevoFondo text-black hover:text-white"
                                : "",
                              "block px-4 hover:bg-nuevoDetalle py-2 text-sm text-nuevoFondo text-center "
                            )}
                          >
                            Followed Business
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/homep/seelater"
                            className={classNames(
                              active
                                ? "bg-gray-100 hover:bg-nuevoFondo text-black hover:text-white"
                                : "",
                              "block px-4 hover:bg-nuevoDetalle py-2 text-sm text-nuevoFondo text-center "
                            )}
                          >
                            Saved Vacancies
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/homep/mypostulations"
                            className={classNames(
                              active
                                ? "bg-gray-100 hover:bg-nuevoFondo text-black hover:text-white"
                                : "",
                              "block px-4 hover:bg-nuevoDetalle py-2 text-sm text-nuevoFondo text-center "
                            )}
                          >
                            My applications
                          </Link>
                        )}
                      </Menu.Item>

                      {/*   <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/homep/mensajes"
                            className={classNames(
                              active ? "bg-gray-100 hover:bg-verdeHover" : "",
                              "block px-4 hover:bg-verdeHover py-2 text-sm text-gray-700"
                            )}
                          >
                            Messages
                          </Link>
                        )}
                      </Menu.Item> */}

                      <Menu.Item>
                        {({ active }) => (
                          <ButtonLogOut
                            estilo={classNames(
                              active ? "bg-gray-100 hover:bg-verdeHover" : "",
                              "block px-4 hover:bg-verdeHover py-2 text-sm text-gray-700"
                            )}
                          ></ButtonLogOut>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className=" px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
