"use client";

import React, { useState, Fragment } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "My Orders", href: "/orders", icon: ClipboardDocumentListIcon },
    { name: "My Wishlist", href: "/wishlist", icon: HeartIcon },
    { name: "My Writers", href: "/writers", icon: UsersIcon },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-sidebar border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Hamburger (mobile) + Brand logo */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Open mobile menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-white tracking-wide hover:opacity-90 transition-opacity"
            >
              <span className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <BookOpenIcon className="h-5 w-5" />
              </span>
              <span>
                Book <span className="text-amber-400">Worm</span>
              </span>
            </Link>
          </div>

          {/* Center section: Navigation links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 px-3 py-2 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right section: Cart and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart link */}
            <Link
              href="/checkout"
              className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-rose-600 rounded-full shadow-lg animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Auth Menu */}
            {session ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center space-x-2 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <UserCircleIcon className="h-7 w-7 text-indigo-400" />
                  <span className="hidden sm:inline-block text-xs font-medium text-slate-200 max-w-[100px] truncate">
                    {session.user?.name || session.user?.email}
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-card border border-slate-700 shadow-xl py-1 text-slate-200 focus:outline-none z-50">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold truncate text-white">
                        {session.user?.email}
                      </p>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account"
                          className={`${
                            active ? "bg-slate-800 text-white" : "text-slate-300"
                          } flex items-center px-4 py-2 text-xs font-medium`}
                        >
                          <UserCircleIcon className="mr-2 h-4 w-4" />
                          Account Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/orders"
                          className={`${
                            active ? "bg-slate-800 text-white" : "text-slate-300"
                          } flex items-center px-4 py-2 text-xs font-medium`}
                        >
                          <ClipboardDocumentListIcon className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className={`${
                            active ? "bg-rose-900/50 text-rose-200" : "text-rose-400"
                          } flex w-full items-center px-4 py-2 text-xs font-medium border-t border-slate-700/60`}
                        >
                          <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
              >
                <UserCircleIcon className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Headless UI Dialog) */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-sidebar border-r border-slate-800 pt-5 pb-4">
                <div className="flex items-center justify-between px-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-indigo-600 text-white">
                      <BookOpenIcon className="h-5 w-5" />
                    </span>
                    <span className="text-lg font-bold text-white">
                      Book <span className="text-amber-400">Worm</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4 flex-1 px-4 space-y-1">
                  <p className="px-2 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Navigation
                  </p>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                      >
                        <Icon className="h-5 w-5 text-indigo-400" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/checkout"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingBagIcon className="h-5 w-5 text-indigo-400" />
                      <span>Shopping Cart</span>
                    </div>
                    {itemCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-rose-600 text-white rounded-full">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Mobile footer auth info */}
                <div className="px-4 pt-4 border-t border-slate-800">
                  {session ? (
                    <div className="space-y-3">
                      <div className="text-xs text-slate-400">
                        Signed in as <span className="text-white font-medium">{session.user?.email}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-md bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 text-xs font-semibold transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 text-sm font-semibold transition-colors shadow-sm"
                    >
                      <UserCircleIcon className="h-5 w-5" />
                      <span>Sign In / Register</span>
                    </Link>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
}
