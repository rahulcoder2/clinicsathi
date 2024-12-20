"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../shared/CustomFormField";
import Link from "next/link";
import SubmitButton from '../shared/SubmitButton';
import { useState } from "react";


import FileUploader from "../shared/FileUploader";
import { doctorFormValidation } from "@/lib/validation";
// import { useRouter } from "next/navigation";

const DoctorRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);


  //   const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof doctorFormValidation>>({
    defaultValues: {
      user: {
        username: ""
      }
      
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof doctorFormValidation>) {
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
            name="username"
            label="User Name"
            placeholder="Hospital Name"
            iconAlt="hospitaluser"
          />

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

          {/* Identification and verfication */}
          
          <section className="space-y-5">
            <div className="mb-8 space-y-1">
              <h2 className="sub-header">Identification and Verfication</h2>
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label="Identification Number"
              placeholder="123456789"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Identification Document"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange}  />
                </FormControl>
              )}
            />
          </section>
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

export default DoctorRegisterForm;
