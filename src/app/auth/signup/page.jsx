"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ add
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter(); // ✅ add

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      callbackURL: "/dashboard", // ✅ better
    });

    if (error) {
      alert(error.message || "Something went wrong");
      return;
    }

    // ✅ redirect after signup
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Please, sign up</h2>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          
          <TextField isRequired name="name">
            <Label>Name</Label>
            <Input name="name" placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField isRequired name="email">
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="Enter your email" />
            <FieldError />
          </TextField>

          <div className="flex flex-col gap-1">
            <Label>Password</Label>

            <div className="flex items-center border rounded-md px-2">
              <Input
                className="flex-1 border-none"
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

            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
          </div>

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

export default SignUpPage;