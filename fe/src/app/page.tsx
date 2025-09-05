"use client";

import Text from "@/components/input/Text";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { toast } from "sonner";
import { useLogin } from "@/hooks/auth-hooks";
import { LoginFormData, loginSchema } from "@/lib/validation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginMutation = useLogin();

  const validateForm = (): boolean => {
    const result = loginSchema.safeParse({ email, password });

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

    const formData: LoginFormData = {
      email: email.trim(),
      password: password,
    };

    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/login.jpg"
          alt="Login Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Log in or Sign Up
            </h1>
          </div>

          <form className="space-y-6">
            <div>
              <Text
                label="Your Email / Username"
                type="email"
                value={email}
                onChange={setEmail}
                required
                error={errors.email}
                className={clsx(
                  errors.email &&
                    "border-red-500 focus:ring-red-500 focus:border-red-500"
                )}
              />
            </div>

            <div>
              <Text
                label="Your Password"
                type="password"
                value={password}
                onChange={setPassword}
                required
                error={errors.password}
                className={clsx(
                  errors.password &&
                    "border-red-500 focus:ring-red-500 focus:border-red-500"
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loginMutation.isPending}
              className={clsx(
                "w-full font-semibold py-3 px-4 rounded-lg transition-all",
                loginMutation.isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0062FF] hover:bg-blue-700 text-white"
              )}
            >
              {loginMutation.isPending ? "Signing In..." : "Login"}
            </button>

            {/* Divider */}
            <div className="relative ">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
