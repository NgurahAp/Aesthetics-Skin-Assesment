import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { clsx } from "clsx";

interface TextProps {
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  error?: string; 
}

const Text: React.FC<TextProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  className = "",
  required = false,
  disabled = false,
  id,
  error, 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const inputType = type === "password" && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <div className={`relative ${className}`}>
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={clsx(
            "w-full px-4 py-3 text-[14px] border rounded-lg focus:ring-2 focus:ring-[#50B5FF] focus:border-[#50B5FF] outline-none transition-all peer text-gray-900 disabled:bg-gray-50 disabled:text-gray-500",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300"
          )}
          style={type === "password" ? { paddingRight: "3rem" } : {}}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        <label
          htmlFor={inputId}
          className={clsx(
            "absolute left-3 -top-2.5 bg-white px-2 text-[12px] font-normal transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-[12px] peer-disabled:text-gray-400",
            error
              ? "text-red-500 peer-focus:text-red-500"
              : "text-gray-400 peer-focus:text-[#50B5FF]"
          )}
        >
          {label}
        </label>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Text;
