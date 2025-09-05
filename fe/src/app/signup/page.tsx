"use client";

import AuthLayout from "@/components/AuthLayout";
import Text from "@/components/input/Text";
import { useRegister } from "@/hooks/auth-hooks";
import { RegisterFormData, registerSchema } from "@/lib/validation";
import { useState } from "react";
import { toast } from "sonner";
import { clsx } from "clsx";
import Link from "next/link";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const registerMutation = useRegister();

  const validateForm = (): boolean => {
    const result = registerSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    if (result.success) {
      setErrors({});
      return true;
    }

    const formattedErrors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        formattedErrors[issue.path[0] as string] = issue.message;
      }
    });

    setErrors(formattedErrors);
    return false;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    const formData: RegisterFormData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password,
      confirmPassword: confirmPassword,
    };

    registerMutation.mutate(formData);
  };

  return (
    <AuthLayout
      title="Sign Up"
      subtitle="Create your account to get started with Square Website"
    >
      <div className="bg-white rounded-[20px] w-[560px] h-auto p-8 shadow-lg">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Text
              label="First Name"
              type="text"
              value={firstName}
              onChange={setFirstName}
              required
              error={errors.firstName}
            />
            <Text
              label="Last Name"
              type="text"
              value={lastName}
              onChange={setLastName}
              required
              error={errors.lastName}
            />
          </div>

          <Text
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            required
            error={errors.email}
          />

          <div className="grid grid-cols-2 gap-4">
            <Text
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
              error={errors.password}
            />
            <Text
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
              error={errors.confirmPassword}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={registerMutation.isPending}
            className={clsx(
              "w-full font-semibold text-[12px] py-3 px-4 rounded-lg transition-all",
              registerMutation.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0062FF] hover:bg-blue-700 text-white"
            )}
          >
            {registerMutation.isPending ? "Creating Account..." : "Sign Up"}
          </button>
        </div>
      </div>

      <div className="text-center mt-6 text-[#0062FF] font-normal text-[14px]">
        <p className="">
          Already have an account?{" "}
          <Link
            href="/"
            className="hover:text-blue-800 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
