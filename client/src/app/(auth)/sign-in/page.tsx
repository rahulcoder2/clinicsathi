import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo.svg" width={64} height={40} alt="patient" className="w-10" />
            
          <LoginForm />
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default SignIn;
