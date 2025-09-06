import React from 'react';
import { Star, Zap, Crown, Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Essential",
      icon: <Star className="w-6 h-6" />,
      description: "Perfect for skincare beginners",
      price: "$9",
      period: "/month",
      features: [
        "Access to 5 articles",
        "Access to 5 videos", 
        "Basic skincare tips",
        "Community support"
      ],
      buttonText: "Current Plan",
      buttonStyle: "bg-[#c3d4c3] text-[#3a523a] cursor-not-allowed",
      borderColor: "border-[#a5c0a5]",
      popular: false
    },
    {
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
        "Product recommendations"
      ],
      buttonText: "Select Plan",
      buttonStyle: "bg-[#4c6a4c] hover:bg-[#3a523a] text-white",
      borderColor: "border-[#87ac87]",
      popular: true
    },
    {
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
        "Priority support"
      ],
      buttonText: "Select Plan", 
      buttonStyle: "bg-[#faf6ed] hover:bg-[#f5f0e3] text-[#3a523a] border border-[#a5c0a5]",
      borderColor: "border-[#f0ebd9]",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefcf7] to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2d4a2d] mb-4">
            Choose Your Skincare Journey
          </h2>
          <p className="text-lg text-[#4c6a4c] max-w-2xl mx-auto">
            Select the perfect plan for your skincare goals. All plans include access to our expert-curated content and supportive community.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.borderColor} border-2 ${
                plan.popular ? 'transform scale-105 border-[#87ac87]' : ''
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

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                plan.popular ? 'bg-[#e1e8e1] text-[#4c6a4c]' : 'bg-[#faf6ed] text-[#4c6a4c]'
              }`}>
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
                  <span className="text-[#4c6a4c] ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-[#3a523a]">
                      <Check className="w-4 h-4 text-[#6a9669] mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button 
                className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${plan.buttonStyle}`}
                disabled={plan.buttonText === "Current Plan"}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-[#4c6a4c] text-sm">
            All plans include 30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;