import React from "react";

interface PhoneProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const Phone: React.FC<PhoneProps> = ({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        {/* Country Code Input */}
        <div className="relative w-20">
          <input
            type="text"
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            placeholder=" "
            required={required}
            disabled={disabled}
            className="w-full px-3 py-3 text-[14px]  border border-gray-300 border-r-0 rounded-l-lg focus:ring-2 focus:ring-[#50B5FF] focus:border-[#50B5FF] outline-none transition-all text-gray-900 disabled:bg-gray-50 disabled:text-gray-500 text-center"
          />
        </div>

        {/* Phone Number Input */}
        <div className="relative flex-1">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            placeholder=" "
            required={required}
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 text-[14px]  rounded-r-lg focus:ring-2 focus:ring-[#50B5FF] focus:border-[#50B5FF] outline-none transition-all peer text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
          />

          <label className="absolute left-3 -top-2.5 bg-white px-2 text-[12px] font-normal text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-[#50B5FF] peer-focus:text-[12px] peer-disabled:text-gray-400">
            Phone Number
          </label>
        </div>
      </div>
    </div>
  );
};

export default Phone;
