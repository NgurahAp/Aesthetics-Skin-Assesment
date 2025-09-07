"use client";

import Text from "@/components/input/Text";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { toast } from "sonner";
import { useLogin, useGoogleLogin, useFacebookLogin } from "@/hooks/auth-hook";
import { LoginFormData, loginSchema } from "@/lib/validation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();
  const facebookLoginMutation = useFacebookLogin();

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

  const handleGoogleLogin = () => {
    googleLoginMutation.mutate();
  };

  const handleFacebookLogin = () => {
    facebookLoginMutation.mutate();
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
              type="button"
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

            {/* Google Login Button - Update dengan handler */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoginMutation.isPending}
              className={clsx(
                "w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors",
                googleLoginMutation.isPending
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Image
                src="/google.png"
                alt="Google Logo"
                width={14}
                height={14}
                className="object-cover mr-2"
              />
              {googleLoginMutation.isPending
                ? "Connecting..."
                : "Continue with Google"}
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={facebookLoginMutation.isPending}
              className={clsx(
                "w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors",
                facebookLoginMutation.isPending
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Image
                src="/facebook.png"
                alt="Facebook Logo"
                width={14}
                height={14}
                className="object-cover mr-2"
              />
              {facebookLoginMutation.isPending
                ? "Connecting..."
                : "Continue with Facebook"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signUp"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
