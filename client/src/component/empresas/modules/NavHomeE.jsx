import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

// ESTILOS
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import ButtonLogOut from "../../../private/ButtonLogOut";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/actions";

// TAILWIND
const navigation = [
  { name: "Home", href: "/homee", current: false },
  { name: "Mails", href: "/homee/message", current: false },
  { name: "Search", href: "/homee/search", current: false },
  { name: "Mercado", href: "/homee/mercado", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavHomeE = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const profileState = useSelector(
    (state) => state.rootReducerLanding.perfiles
  );

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);

  useEffect(() => {
    dispatch(getProfile(email2));
  }, [dispatch]);

  return (
    <Disclosure
      as="nav"
      className="bg-colorFondo2  fixed w-full shadow-2xl rounded-b-2xl"
    >
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
                            : "text-gray-300 hover:bg-verdeHover hover:text-white",
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
                {profileState.pro === true ? (
                  <button
                    type="button"
                    target="_blank"
                    href={`https://wa.me/3518112156?text=Hola%somos%hired%pro`}
                    className="bg-verdeMedio mx-1 hover:bg-verdeHover p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <AiOutlineWhatsApp className="h-6 w-6" aria-hidden="true" />
                  </button>
                ) : (
                  <span></span>
                )}

                <button
                  type="button"
                  className="bg-verdeMedio hover:bg-verdeHover p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 bg-verdeMedio  relative">
                  <div>
                    <Menu.Button className="bg-verdeMedio hover:bg-verdeHover flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
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
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/homee/create"
                            className={classNames(
                              active ? "bg-gray-100 hover:bg-verdeHover" : "",
                              "block px-4 hover:bg-verdeHover py-2 text-sm text-gray-700"
                            )}
                          >
                            Create
                          </Link>
                        )}
                      </Menu.Item>
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
            <div className="px-2 pt-2 pb-3 space-y-1">
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

export default NavHomeE;
