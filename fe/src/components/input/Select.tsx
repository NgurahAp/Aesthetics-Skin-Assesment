import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={!disabled ? () => setIsOpen(!isOpen) : undefined}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50B5FF] focus:border-[#50B5FF] outline-none transition-all cursor-pointer text-gray-900 bg-white ${
          disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""
        } ${isOpen ? "ring-2 ring-[#50B5FF] border-[#50B5FF]" : ""}`}
      >
        <div className="flex items-center justify-between text-[14px] ">
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <label
        htmlFor={selectId}
        className={`absolute left-3 -top-2.5 bg-white px-2 text-[12px] font-normal transition-all ${
          isOpen ? "text-[#50B5FF]" : "text-gray-400"
        } ${disabled ? "text-gray-400" : ""}`}
      >
        {label}
      </label>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-50 text-[14px] cursor-pointer text-gray-900 border-b border-gray-100 last:border-b-0"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default Select;
