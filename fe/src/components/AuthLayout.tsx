import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-[#FAFAFB] relative">
      {/* Background miring */}
      <div
        className={`absolute top-0 left-0 right-0 bg-white`}
        style={{
          height: "55vh",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
        }}
      ></div>
      {/* Content container */}
      <div className="relative z-10 flex justify-center min-h-screen pt-20 pb-14">
        <div className="max-w-md w-full flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-[56px] font-bold text-[#44444F] mb-8 leading-[100%] tracking-[0.23px]">
              {title}
            </h1>
            <p className="text-[#92929D] font-normal text-[16px] leading-[26px] tracking-[0.1px]">
              {subtitle}
            </p>
          </div>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
