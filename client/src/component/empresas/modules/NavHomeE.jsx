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
    <div className="shadow-2xl drop-shadow-xl">
      <div
        as="nav"
        className=" bg-colorFondo1 shadow-2xl drop-shadow-md py-1 flex w-full"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"></div>
        {profileState.pro === true ? (
          <button
            type="button"
            target="_blank"
            href={`https://wa.me/3518112156?text=Hola%somos%hired%pro`}
            className=" bg-colorBotones1 shadow-2xl ml-3  p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-colorDetalles1 focus:ring-colorDetalles2"
          >
            <span className="sr-only shadow-2xl">View notifications</span>
            <AiOutlineWhatsApp
              className="h-6 w-6 shadow-2xl"
              aria-hidden="true"
            />
          </button>
        ) : (
          <span></span>
        )}

        <button
          type="button"
          className=" bg-colorBotones1 ml-3 shadow-2xl p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-colorDetalles1 focus:ring-colorDetalles2"
        >
          <span className="sr-only shadow-2xl">View notifications</span>
          <BellIcon className="h-6 w-6 shadow-2xl" aria-hidden="true" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="ml-5 mr-3 relative">
          <div>
            <Menu.Button className=" bg-co flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-colorDetalles1 focus:ring-colorDetalles2">
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src={user.picture} alt="" />
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
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/homee/create"
                    className={classNames(
                      active ? "bg-gray-100 hover:bg-verdeHover" : "",
                      "block px-4 hover:bg-verdeHover py-2 text-sm text-gray-700"
                    )}
                  >
                    Perfil
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
  );
};

export default NavHomeE;
