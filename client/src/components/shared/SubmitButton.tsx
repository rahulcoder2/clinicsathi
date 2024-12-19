
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({
  children,
  isLoading,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? " w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <LoaderCircle width={24} height={24} className="animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
