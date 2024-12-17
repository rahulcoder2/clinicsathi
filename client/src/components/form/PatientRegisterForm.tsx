"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../shared/CustomFormField";
import Link from "next/link";
import SubmitButton from "../shared/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
// import { useRouter } from "next/navigation";
import { SelectItem } from "../ui/select";
import { genderOptions } from "@/constants";

const PatientRegisterForm = () => {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 "
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-blue-500">Let us know more about yourself.</p>
        </section>

        <section className="space-y-5">
          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Your Name"
            iconAlt="user"
          />

          {/* DOB and Gender */}

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="dob"
              label="Date of Birth"
              placeholder="Your Date of Birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select a Gender"
            >
              {genderOptions.map((option, i) => (
                <SelectItem key={i + option} value={option}>
                  <div>{option}</div>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>

          {/* EMAIL & PHONE */}

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="Enter your email address"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Your Phone Number"
            />
          </div>

          {/* PASSWORD */}

          <CustomFormField
            fieldType={FormFieldType.PASSWORD_INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Your Password"
            iconAlt="password"
          />

          {/* CONFIRM PASSWORD */}

          <CustomFormField
            fieldType={FormFieldType.PASSWORD_INPUT}
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            iconAlt="password"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.CHECKBOX}
            label="Accept terms and conditions"
            name="termsandconditions"
          />
        </section>

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
