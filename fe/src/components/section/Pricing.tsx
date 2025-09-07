import React from "react";
import { Star, Zap, Crown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useUpdateMembership } from "@/hooks/dashboard-hook";

const PricingSection = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: updateMembership, isPending } = useUpdateMembership();

  const currentPackage = user?.membership_package || null;

  const plans = [
    {
      id: "A",
      name: "Essential",
      icon: <Star className="w-6 h-6" />,
      description: "Perfect for skincare beginners",
      price: "$9",
      period: "/month",
      features: [
        "Access to 5 articles",
        "Access to 5 videos",
        "Basic skincare tips",
        "Community support",
      ],
      buttonText: currentPackage === "A" ? "Current Plan" : "Select Plan",
      buttonStyle:
        currentPackage === "A"
          ? "bg-[#c3d4c3] text-[#3a523a] cursor-not-allowed"
          : "bg-[#faf6ed] hover:bg-[#f5f0e3] text-[#3a523a] border border-[#a5c0a5]",
      borderColor:
        currentPackage === "A" ? "border-[#6a9669]" : "border-[#f0ebd9]",
      popular: false,
      isCurrent: currentPackage === "A",
    },
    {
      id: "B",
      name: "Advanced",
      icon: <Zap className="w-6 h-6" />,
      description: "For dedicated skincare enthusiasts",
      price: "$19",
      period: "/month",
      features: [
        "Access to 10 articles",
        "Access to 10 videos",
        "Advanced routines",
        "Expert consultations",
        "Product recommendations",
      ],
      buttonText: currentPackage === "B" ? "Current Plan" : "Select Plan",
      buttonStyle:
        currentPackage === "B"
          ? "bg-[#c3d4c3] text-[#3a523a] cursor-not-allowed"
          : "bg-[#4c6a4c] hover:bg-[#3a523a] text-white",
      borderColor:
        currentPackage === "B" ? "border-[#6a9669]" : "border-[#87ac87]",
      popular: !isAuthenticated || !currentPackage,
      isCurrent: currentPackage === "B",
    },
    {
      id: "C",
      name: "Premium",
      icon: <Crown className="w-6 h-6" />,
      description: "Complete skincare mastery",
      price: "$29",
      period: "/month",
      features: [
        "Unlimited articles",
        "Unlimited videos",
        "Personalized routines",
        "1-on-1 expert sessions",
        "Exclusive content",
        "Priority support",
      ],
      buttonText: currentPackage === "C" ? "Current Plan" : "Select Plan",
      buttonStyle:
        currentPackage === "C"
          ? "bg-[#c3d4c3] text-[#3a523a] cursor-not-allowed"
          : "bg-[#faf6ed] hover:bg-[#f5f0e3] text-[#3a523a] border border-[#a5c0a5]",
      borderColor:
        currentPackage === "C" ? "border-[#6a9669]" : "border-[#f0ebd9]",
      popular: false,
      isCurrent: currentPackage === "C",
    },
  ];

  const handlePlanSelect = (planId: "A" | "B" | "C") => {
    if (planId === currentPackage) return; // Don't do anything if it's current plan

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push("/signIn");
      return;
    }

    // Update membership using the hook
    updateMembership(planId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefcf7] to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2d4a2d] mb-4">
            Choose Your Skincare Journey
          </h2>
          <p className="text-lg text-[#4c6a4c] max-w-2xl mx-auto">
            Select the perfect plan for your skincare goals. All plans include
            access to our expert-curated content and supportive community.
          </p>
          {isAuthenticated && currentPackage && (
            <div className="mt-4 p-3 bg-[#e8f3e8] rounded-lg inline-block">
              <p className="text-[#3a523a] text-sm">
                Welcome back, {user?.full_name}! You're currently on the{" "}
                <span className="font-semibold">
                  {plans.find((p) => p.id === currentPackage)?.name}
                </span>{" "}
                plan.
              </p>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.borderColor
              } border-2 ${
                plan.popular ? "transform scale-105 border-[#87ac87]" : ""
              } ${
                plan.isCurrent ? "ring-2 ring-[#6a9669] ring-opacity-50" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#6a9669] text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Current Plan Badge */}
              {plan.isCurrent && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-[#4c6a4c] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg">
                    Current
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  plan.popular || plan.isCurrent
                    ? "bg-[#e1e8e1] text-[#4c6a4c]"
                    : "bg-[#faf6ed] text-[#4c6a4c]"
                }`}
              >
                {plan.icon}
              </div>

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#2d4a2d] mb-2">
                  {plan.name}
                </h3>
                <p className="text-[#4c6a4c] text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-[#2d4a2d]">
                    {plan.price}
                  </span>
                  <span className="text-[#4c6a4c] ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-[#3a523a]"
                    >
                      <Check className="w-4 h-4 text-[#6a9669] mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  plan.buttonStyle
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={plan.isCurrent || isPending}
                onClick={() => handlePlanSelect(plan.id as "A" | "B" | "C")}
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  plan.buttonText
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-[#4c6a4c] text-sm">
            All plans include 30-day money-back guarantee • Cancel anytime
          </p>
          {!isAuthenticated && (
            <p className="text-[#4c6a4c] text-xs mt-2">
              Please log in to see your current plan and make changes
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
