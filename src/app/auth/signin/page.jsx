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
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log("Form submitted with:", userData);

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "/",
    });

    console.log("Sign in response:", { data, error });

    if (error) {
      alert(`Sign in failed: ${error.message || "Something went wrong"}`);
      return;
    }

    alert("Sign in successful!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Please, Sign In</h2>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="Enter your email" />
            <FieldError />
          </TextField>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <Label>Password</Label>

            <div className="flex items-center border rounded-md px-2">
              <Input
                className="flex-1 border-none focus:ring-0"
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
            <Button type="submit" color="primary">
              <Check />
              Submit
            </Button>

            <Button type="reset" variant="bordered">
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;