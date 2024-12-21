"use client";
import PatientRegisterForm from "@/components/form/PatientRegisterForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Link from "next/link";
import DoctorRegisterForm from "@/components/form/DoctorRegisterForm";

const SignUp = () => {
  const [selectedType, setSelectedType] = useState<
    "patient" | "hospital" | null
  >(null);
  const [showForm, setShowForm] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // Add this state to check if hydration is complete

  // This effect will run after the initial render to update hydration state
  useEffect(() => {
    setIsHydrated(true); // Indicate that hydration is complete
  }, []);

  const handleContinue = () => {
    setShowForm(true);
  };

  if (!isHydrated) {
    return null; // Return nothing until hydration is complete
  }

  if (showForm) {
    return (
      <div className="flex h-screen max-h-screen relative">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-8 w-16"
            />

            {selectedType === "patient" ? (
              <div className="w-full">
                <PatientRegisterForm />
              </div>
            ) : (
              <div className="w-full">
                <DoctorRegisterForm />
              </div>
            )}
          </div>
        </section>

        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="patient"
          priority={true}
          className="side-img max-w-[390px]"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-500">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Button
              variant="outline"
              className={`flex-1 h-12 ${
                selectedType === "patient"
                  ? "border-red-500 ring-2 ring-red-500"
                  : ""
              }`}
              onClick={() => setSelectedType("patient")}
            >
              Patient
            </Button>
            <Button
              variant="outline"
              className={`flex-1 h-12 ${
                selectedType === "hospital"
                  ? "border-red-500 ring-2 ring-red-500"
                  : ""
              }`}
              onClick={() => setSelectedType("hospital")}
            >
              Hospital
            </Button>
          </div>

          <Button
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={!selectedType}
            onClick={handleContinue}
          >
            Continue
          </Button>

          {/* Link to Login Page */}
          <div className="text-center mt-4">
            <Link href="/login" passHref>
              <Button
                variant="link"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Already have an account? Go to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;