"use client";

import React, { useState } from "react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Spinner, // Spinner ইমপোর্ট করা হয়েছে
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, setIsPending] = useState(false); // লোডিং স্টেট

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true); // লোডিং শুরু

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Login failed");
        setIsPending(false); // এরর হলে লোডিং বন্ধ
        return;
      }

      toast.success("Welcome back!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (err) {
      toast.error("Something went wrong");
      setIsPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Please, Sign In</h2>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => 
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
                ? "Please enter a valid email address" 
                : null
            }
          >
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="Enter your email" />
            <FieldError />
          </TextField>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <Label>Password</Label>
            <div className="flex items-center border rounded-md px-2 overflow-hidden focus-within:ring-2 ring-primary-500">
              <Input
                className="flex-1 border-none focus:ring-0 outline-none"
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
              />
              <Button
                isIconOnly
                type="button"
                variant="light"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeSlash /> : <Eye />}
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            {/* আপনার চাওয়া সেই লোডিং বাটন স্টাইল এখানে */}
            <Button 
              type="submit" 
              color="primary" 
              isLoading={isPending} // HeroUI এর বিল্ট-ইন লোডিং প্রপ
              disabled={isPending}
            >
              {isPending ? <Spinner color="current" size="sm" /> : <Check />}
              {isPending ? "Signing in..." : "Submit"}
            </Button>

            <Button type="reset" variant="bordered" disabled={isPending}>
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;