"use client";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LucideProps } from "lucide-react";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  IconImage?: React.ForwardRefExoticComponent<
    Omit<LucideProps, " ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, IconImage, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [passwordValue, setPasswordValue] = React.useState("");
    const isPassword = type === "password";

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isPassword) {
        setPasswordValue(e.target.value);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div
        className={cn(
          "flex items-center w-full rounded-md border-2 border-input bg-transparent shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring",
          className
        )}
      >
        {IconImage && (
          <div className="pl-3 text-muted-foreground flex items-center">
            <IconImage height={16} />
          </div>
        )}
        <input
          type={isPassword && showPassword ? "text" : type}
          ref={ref}
          {...props}
          onChange={handleChange}
          className={cn(
            "h-9 w-full bg-transparent py-1 px-3 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-base text-muted-foreground",
            isPassword ? "pr-10" : ""
          )}
        />

        {isPassword && passwordValue.length > 0 && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="px-3 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    );
  }
);

TextInput.displayName = "Input";

export { TextInput };
