"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../shared/CustomFormField";
import Link from "next/link";
import SubmitButton from "../shared/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { patientFormValidation } from "@/lib/validation";

const PatientRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // React Hook Form setup with Zod validation
  const form = useForm<z.infer<typeof patientFormValidation>>({
    resolver: zodResolver(patientFormValidation),
    defaultValues: {
      user: {
        username: "",
        email: "",
        role: "patient",
        password: "",
      },
      phone: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof patientFormValidation>) {
    setIsLoading(true);
    setError(null); // Clear previous errors

    const { username, email, role, password } = values.user;
    const { phone } = values;

    const payload = {
      user: {
        username,
        email,
        role,
        password,
      },
      phone,
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await axiosInstance.post(
        "/api/register/patient/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Backend response:", response.data);

      // Redirect to login on success
      router.push("/sign-in");
    } catch (error: any) {
      console.error("Error response from backend:", error.response?.data);

      // Display the error to the user
      setError(
        error.response?.data?.detail || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-blue-500">Let us know more about yourself.</p>
        </section>

        <section className="space-y-5">
          {/* Username */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="user.username"
            label="User Name"
            placeholder="Enter your username"
            iconAlt="user"
          />

          {/* Email & Phone */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="user.email"
              label="Email address"
              placeholder="Enter your email address"
              iconAlt="email"
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password & Confirm Password */}
          <CustomFormField
            fieldType={FormFieldType.PASSWORD_INPUT}
            control={form.control}
            name="user.password"
            label="Password"
            placeholder="Enter your password"
            iconAlt="password"
          />
        </section>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <div className="flex-center flex-col">
          <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>

          <div className="flex-center flex-col md:flex-row gap-2 mt-2">
            <p className="text-blue-500">Already have an account?</p>
            <Link href="/sign-in" className="text-primary">
              Login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PatientRegisterForm;
