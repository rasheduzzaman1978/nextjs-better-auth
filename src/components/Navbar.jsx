"use client";

import React from "react";
import NextLink from "next/link";
import { Button, Link as HeroLink } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const { data, isPending } = useSession();
  const user = data?.user;

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-6">
          <NextLink href="/" className="text-xl font-bold text-black no-underline">
            ACME
          </NextLink>

          <ul className="hidden items-center gap-6 md:flex">
            <li>
              <NextLink href="/" className="text-sm font-medium text-gray-600 hover:text-black no-underline">
                Home
              </NextLink>
            </li>
            <li>
              <NextLink href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-black no-underline">
                Dashboard
              </NextLink>
            </li>
            <li>
              <NextLink href="/about" className="text-sm font-medium text-gray-600 hover:text-black no-underline">
                About
              </NextLink>
            </li>
          </ul>
        </div>

        {/* Right Side: User Info & Auth Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Loading Skeleton */}
          {isPending && (
            <div className="h-9 w-24 rounded-lg bg-gray-200 animate-pulse" />
          )}

          {/* If User is Logged In */}
          {!isPending && user && (
            <div className="flex items-center gap-4">
              <p className="hidden text-sm font-medium text-gray-700 md:block">
                Welcome, {user.name}
              </p>
              <Button
                color="danger"
                variant="danger"
                onPress={() => signOut()}
                size="sm"
              >
                Sign Out
              </Button>
            </div>
          )}

          {/* If User is NOT Logged In */}
          {!isPending && !user && (
            <div className="flex items-center gap-2">
              <NextLink href="/auth/signin">
                <Button
                  color="secondary"
                  variant="secondary"
                  size="sm"
                >
                  Sign In
                </Button>
              </NextLink>

              <NextLink href="/auth/signup">
                <Button
                  color="primary"
                  variant="primary"
                  size="sm"
                >
                  Sign Up
                </Button>
              </NextLink>
            </div>
          )}
        </div>
      </header>
    </nav>
  );
};

export default Navbar;