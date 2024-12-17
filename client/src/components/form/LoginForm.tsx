"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../shared/CustomFormField";
import Link from "next/link";

import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "@/components/shared/SubmitButton";
// import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    // const { email, password } = values;
    // try {
    //   const userData = { email, password };
    //   const user = console.log(userData)
    //   if(user)router.push(`/patient`)
    // } catch (error) {
    //   console.log(error);
    // }
    setIsLoading(false);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        <section className="mb-9 space-y-2 text-center md:text-left">
          <h1 className="header text-primary">Welcome to ClinicSathi</h1>
          <p className="text-blue-500">Schedule your appointment with ease.</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          label="Email:"
          name="email"
          placeholder="Enter your email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PASSWORD_INPUT}
          label="Password:"
          name="password"
          placeholder="Enter you Password"
        />

        <div className="flex-between">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.CHECKBOX}
            label="Remember me"
            name="rememberMe"
          />
          <Link href="/?forgetpassword">Forget Password?</Link>
        </div>

        <div className="flex-center flex-col">
          <SubmitButton isLoading={isLoading}>Login</SubmitButton>

          <div className="flex-center flex-col md:flex-row gap-2 mt-2">
            <p className="text-blue-500">Don&apos;t have an account?</p>
            <Link href="/sign-up" className="text-primary">
              Create an account
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
