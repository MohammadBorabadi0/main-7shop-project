import React, { useState } from "react";

// React-Router-Dom
import { useNavigate, Link, NavLink } from "react-router-dom";
// Icons
import { FaBars } from "react-icons/fa";
import { BiSearch, BiHeart, BiCart } from "react-icons/bi";
import { HiUserRemove, HiUserAdd } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
// Context
import { useUserContext } from "../Providers/Context/user_context";
import { useCart } from "../Providers/Context/cart_context";
import { useFilter } from "../Providers/Context/filter_context";
// Actions
import { CLEAR_SEARCH_BOX } from "../actions";
// Utils
import { NavList } from "../utils/helper";
// Components
import Search from "./Search";
import Menu from "./Menu";

const MobileNavbar = () => {
  const { numberOfAmounts } = useCart();
  const { dispatch } = useFilter();
  const { loginWithRedirect, myUser, logout } = useUserContext();
  const currentPathname = window.location.pathname;
  const navigate = useNavigate();

  //   useState
  const [activeSearchBox, setActiveSearchBox] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  const handleToggle = () => {
    setActiveSearchBox(!activeSearchBox);
    dispatch({ type: CLEAR_SEARCH_BOX });
  };

  return (
    <>
      {/* {0-640px} */}
      <header className="flex md:hidden sticky bg-primary top-0 py-3 px-5 mb-5 items-center justify-between text-xl font-bold">
        <span className="cursor-pointer">
          <FaBars onClick={() => setActiveMenu(true)} />
          {activeMenu && (
            <Menu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          )}
        </span>
        <Link to="/">
          <h2 className="text-2xl font-semibold cursor-pointer">
            <span className="text-orange-500 border-b-2 border-orange-500">
              7
            </span>
            Shop
          </h2>
        </Link>
        <div className="flex items-center gap-3">
          <section className="hidden sm:flex items-center gap-3">
            <button onClick={() => navigate("/favorites")}>
              <BiHeart size="25px" />
            </button>
            <div className="flex md:hidden items-center">
              {myUser ? (
                <button className="flex items-center gap-2">
                  <HiUserRemove
                    size="25px"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  />
                </button>
              ) : (
                <button className="flex items-center gap-2">
                  <HiUserAdd size="25px" onClick={loginWithRedirect} />
                </button>
              )}
            </div>
          </section>
          {currentPathname === "/" ? (
            !activeSearchBox ? (
              <BiSearch
                size="25px"
                className="cursor-pointer"
                onClick={handleToggle}
              />
            ) : (
              <IoClose
                size="25px"
                className="cursor-pointer"
                onClick={handleToggle}
              />
            )
          ) : null}
          <span
            onClick={() => navigate("/cart")}
            className="block cursor-pointer relative"
          >
            <BiCart size="25px" />
            <span className="absolute top-[-12px] right-[-13px] bg-red-700 text-white px-1 rounded-md text-sm">
              {numberOfAmounts === 0 ? null : numberOfAmounts}
            </span>
          </span>
        </div>
      </header>
      <div className="flex sm:hidden">{activeSearchBox ? <Search /> : null}</div>
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 w-full z-10 bg-white shadow-xl rounded-t-3xl px-3">
        <ul className="flex items-center justify-between px-12 py-4 text-lg">
          {NavList.map((item, index) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                className={(active) =>
                  active.isActive ? "text-black" : "text-slate-400"
                }
              >
                <i className={`${item.icon}`}></i>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MobileNavbar;

// className={`${item.icon} ${
//   index !== activeNavList
//     ? "text-slate-400"
//     : "bg-slate-900 text-white p-2 rounded-md"
// }`}
