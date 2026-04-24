"use client";

import React from "react";
import NextLink from "next/link";
import { Button, Link } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const { data, isPending } = useSession();
  const user = data?.user;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <Link
            as={NextLink}
            href="/"
            className="text-xl font-bold text-black"
          >
            ACME
          </Link>

          <ul className="hidden items-center gap-4 md:flex">
            <li>
              <Link as={NextLink} href="/" color="foreground">
                Home
              </Link>
            </li>

            <li>
              <Link as={NextLink} href="/dashboard" color="foreground">
                Dashboard
              </Link>
            </li>

            <li>
              <Link as={NextLink} href="/about" color="foreground">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* 👇 Structure same রাখা হয়েছে */}
          
          {/* Username */}
          <p className="hidden text-sm font-medium text-gray-700 md:block">
            {isPending
              ? "Loading..."
              : user
              ? `Welcome, ${user.name}`
              : ""}
          </p>

          {/* Auth Buttons */}
          {isPending ? (
            <div className="h-9 w-20 rounded bg-gray-200 animate-pulse" />
          ) : user ? (
            <Button
              color="danger"
              variant="flat"
              onPress={() => signOut()}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link as={NextLink} href="/auth/signin" color="foreground">
                Sign In
              </Link>

              <Link as={NextLink} href="/auth/signup">
                <Button color="primary">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </nav>
  );
};

export default Navbar;