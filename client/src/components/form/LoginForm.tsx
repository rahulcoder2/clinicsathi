"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../shared/CustomFormField";
import Link from "next/link";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import SubmitButton from "@/components/shared/SubmitButton";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Define the form using React Hook Form
  const form = useForm<z.infer<typeof userFormValidation>>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Define the form submission handler
  async function onSubmit(values: z.infer<typeof userFormValidation>) {
    setIsLoading(true);
    setErrorMessage(null);

    const { username, password } = values;

    try {
      const response = await axiosInstance.post(
        "/api/login/",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful login
      const { role } = response.data; // Backend sets token in httpOnly cookie

      // Redirect based on role
      switch (role) {
        case "patient":
          router.push("/patient/dashboard");
          break;
        case "doctor":
          router.push("/doctor/dashboard");
          break;
        default:
          setErrorMessage("Invalid role. Please contact support.");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      setErrorMessage(
        error.response?.data?.detail || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        <section className="mb-9 space-y-2 text-center md:text-left">
          <h1 className="header text-primary">Welcome to ClinicSathi</h1>
          <p className="text-blue-500">Schedule your appointment with ease.</p>
        </section>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Email Input */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          label="UserName:"
          name="username"
          placeholder="Enter your email"
        />

        {/* Password Input */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PASSWORD_INPUT}
          label="Password:"
          name="password"
          placeholder="Enter your password"
        />

        <div className="flex justify-end">

          <Link href="/?forgetpassword">Forget Password?</Link>
        </div>

        {/* Submit Button */}
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
