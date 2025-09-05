import React from "react";

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  id?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder = " ",
  className = "",
  required = false,
  disabled = false,
  rows = 4,
  id,
}) => {
  const textareaId =
    id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`relative ${className}`}>
      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className="w-full px-4 py-3 text-[14px]  border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50B5FF] focus:border-[#50B5FF] outline-none transition-all peer text-gray-900 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
      />

      <label
        htmlFor={textareaId}
        className="absolute left-3 -top-2.5 bg-white px-2 text-[12px] font-normal text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-[#50B5FF] peer-focus:text-[12px] peer-disabled:text-gray-400"
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
