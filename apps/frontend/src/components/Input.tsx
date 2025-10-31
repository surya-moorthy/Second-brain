import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="px-4 py-2 border rounded m-2"
      />
    );
  }
);
