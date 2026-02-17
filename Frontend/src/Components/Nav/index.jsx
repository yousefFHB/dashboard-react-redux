import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Store/Slices/AuthSlice";

export default function Nav() {
  const {token}=useSelector(state=>state.auth)
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + (item.cartQuantity || 0), 0),
  );
  const dispatch=useDispatch()
  const [isScrolled, setIsScrolled] =useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`w-full bg-zinc-950 border-b border-zinc-800/50 backdrop-blur-3xl  sticky top-0 z-50 transition-shadow duration-300
      ${isScrolled ? "shadow-none" : "shadow-violet-800 shadow-xl"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Modern Gradient Logo */}
        <h2 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-500 hover:opacity-80 transition-opacity">
          MY WEBSITE
        </h2>

        {/* Navigation Menu */}
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li>
            <Link
              to={"/"}
              className="text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className="text-zinc-400 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/products"}
              className="text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to={"/cart"}
              className="text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-200">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {/* Auth Section Logic */}
          <li className="flex items-center gap-4 ml-4">
            {token ? (
              <Link
                to={"/profile"}
                className="px-4 py-2 rounded-full border border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 transition-all shadow-sm"
              >
                Profile
              </Link>
            ) : (
              <Link
                to={"/auth"}
                className="px-5 py-2 rounded-full bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-900/20 transition-all active:scale-95"
              >
                Login/Register
              </Link>
            )}

            {token && (
              <button
                onClick={() =>dispatch(logout()) }
                className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-rose-400 transition-colors"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
