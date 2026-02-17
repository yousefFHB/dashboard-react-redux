import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-500 mb-4">
              MY WEBSITE
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Redefining the digital shopping experience with premium gear and
              seamless design.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li>
                <Link
                  to="/products"
                  className="hover:text-violet-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-violet-400 transition-colors"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-violet-400 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-violet-400 transition-colors"
                >
                  Discounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-violet-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-violet-400 transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-violet-400 transition-colors"
                >
                  Return Center
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-violet-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
            <p className="text-zinc-500 text-sm mb-4">
              Subscribe for early access and exclusive offers.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded-lg transition-all active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            © 2026 My Website Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              {/* Replace with Icon */}
              <div className="w-5 h-5 bg-zinc-800 rounded-full hover:bg-violet-500/20" />
            </a>
            <a
              href="#"
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              <span className="sr-only">Instagram</span>
              {/* Replace with Icon */}
              <div className="w-5 h-5 bg-zinc-800 rounded-full hover:bg-violet-500/20" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
