"use client";
import React, { useState } from "react";
import { Calculator } from "lucide-react";
import CountUp from "react-countup";
import NumberFormat from "react-number-format";
import svgIcon from "../../public/i_empty.svg";
import Image from "next/image";
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/^£/, "");
};

const calculateMortgage = (amount, years, rate, type) => {
  const principal = parseFloat(amount.replace(/,/g, ""));
  const interestRate = parseFloat(rate) / 100 / 12;
  const payments = parseFloat(years) * 12;

  if (type === "interest-only") {
    const monthlyPayment = principal * interestRate;
    const totalPayment = monthlyPayment * payments;
    return {
      monthlyPayment,
      totalPayment,
    };
  } else {
    const monthlyPayment =
      (principal * (interestRate * Math.pow(1 + interestRate, payments))) /
      (Math.pow(1 + interestRate, payments) - 1);
    const totalPayment = monthlyPayment * payments;
    return {
      monthlyPayment,
      totalPayment,
    };
  }
};

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    interestRate: "",
    type: "",
  });

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "This field is required";
    if (!formData.term) newErrors.term = "This field is required";
    if (!formData.interestRate)
      newErrors.interestRate = "This field is required";
    if (!formData.type) newErrors.type = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleClearAll = () => {
    setFormData({
      amount: "",
      term: "",
      interestRate: "",
      type: "",
    });
    setErrors({});
    setResults(null);
  };

  const handleCalculate = () => {
    if (validateForm()) {
      const result = calculateMortgage(
        formData.amount,
        formData.term,
        formData.interestRate,
        formData.type
      );
      setResults(result);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F7FC] p-4 md:p-8 font-['Plus_Jakarta_Sans'] flex items-center justify-center">
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-lg relative">
        {/* Left Section */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#193549]">
              Mortgage Calculator
            </h2>
            <button
              onClick={handleClearAll}
              className="text-[#4D6B88] hover:text-[#193549] text-sm underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[#4D6B88] mb-2 font-semibold">
                Mortgage Amount
              </label>
              <div className="relative">
                <div
                  className={`absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center mr-2 ${
                    errors.amount ? "bg-error" : "bg-[#F2F7FC]"
                  } rounded-l-lg`}
                >
                  <span
                    className={`font-bold ${
                      errors.amount ? "text-white" : "text-[#4D6B88]"
                    }`}
                  >
                    £
                  </span>
                </div>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border font-bold ${
                    errors.amount
                      ? "border-error bg-white"
                      : "border-[#D5E4F2] bg-white"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-lime`}
                  placeholder="300,000"
                />
              </div>
              {errors.amount && (
                <p className="text-error text-sm mt-1 font-semibold">
                  {errors.amount}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4D6B88] mb-2 font-semibold">
                  Mortgage Term
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    className={`w-full pr-16 pl-4 py-3 border font-bold ${
                      errors.term
                        ? "border-error bg-[#F3E6E5]"
                        : "border-[#D5E4F2] bg-white"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-lime`}
                  />
                  <div
                    className={`absolute right-0 top-0 bottom-0 px-4 flex items-center ${
                      errors.term ? "bg-error" : "bg-[#F2F7FC]"
                    } rounded-r-lg`}
                  >
                    <span
                      className={`font-bold ${
                        errors.amount ? "text-white" : "text-[#4D6B88]"
                      }`}
                    >
                      years
                    </span>
                  </div>
                </div>
                {errors.term && (
                  <p className="text-error text-sm mt-1 font-semibold">
                    {errors.term}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#4D6B88] mb-2 font-semibold">
                  Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    className={`w-full pr-10 pl-4 py-3 border font-bold ${
                      errors.interestRate
                        ? "border-error bg-[#F3E6E5]"
                        : "border-[#D5E4F2] bg-white"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0E75C]`}
                  />
                  <div
                    className={`absolute right-0 top-0 bottom-0 px-4 flex items-center ${
                      errors.interestRate ? "bg-error" : "bg-[#F2F7FC]"
                    } rounded-r-lg`}
                  >
                    <span
                      className={`font-bold ${
                        errors.amount ? "text-white" : "text-[#4D6B88]"
                      }`}
                    >
                      %
                    </span>
                  </div>
                </div>
                {errors.interestRate && (
                  <p className="text-error text-sm mt-1 font-semibold">
                    {errors.interestRate}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[#4D6B88] mb-2 font-semibold">
                Mortgage Type
              </label>
              <div className="space-y-2">
                <label
                  className={`flex items-center p-4 rounded-lg cursor-pointer 
          ${
            formData.type === "repayment"
              ? "bg-[#D0E75C] bg-opacity-20"
              : "border border-[#D5E4F2]"
          }`}
                >
                  <div className="relative flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="repayment"
                      checked={formData.type === "repayment"}
                      onChange={handleInputChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-lime checked:border-lime transition-all"
                    />
                    <span className="absolute bg-lime w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </div>

                  <span className="ml-2 text-[#193549] font-bold">
                    Repayment
                  </span>
                </label>
                <label
                  className={`flex items-center p-4 rounded-lg cursor-pointer 
          ${
            formData.type === "interest-only"
              ? "bg-[#D0E75C] bg-opacity-20"
              : "border border-[#D5E4F2]"
          }`}
                >
                  <div className="relative flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="interest-only"
                      checked={formData.type === "interest-only"}
                      onChange={handleInputChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-lime checked:border-lime transition-all"
                    />
                    <span className="absolute bg-lime w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </div>

                  <span className="ml-2 text-[#193549] font-bold">
                    Interest Only
                  </span>
                </label>
              </div>
              {errors.type && (
                <p className="text-error text-sm mt-1 font-semibold">
                  {errors.type}
                </p>
              )}
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-[#D0E75C] hover:bg-[#bdd052] text-[#193549] font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Calculate Repayments
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#193549] p-8 md:rounded-bl-[70px] flex flex-col items-center justify-center">
          {!results ? (
            <div className="text-center">
              <Image
                priority
                src={svgIcon}
                alt="Calculator Icon"
                className="mx-auto mb-6"
              />
              {/* <img
                src={svgIcon}
                
              
              /> */}
              <h3 className="text-2xl font-bold text-white mb-4">
                Results shown here
              </h3>
              <p className="text-[#7A93AA]">
                Complete the form and click "calculate repayments" to see what
                your monthly repayments would be.
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Your results
              </h3>
              <p className="text-[#7A93AA] mb-8">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                "calculate repayments" again.
              </p>
              <div className="bg-[#132C3E] p-6 rounded-lg border-t-4 border-lime">
                <div className="mb-6">
                  <p className="text-[#7A93AA] mb-2">Your monthly repayments</p>
                  <p className="text-lime text-4xl font-bold">
                    £{formatCurrency(results.monthlyPayment)}
                  </p>
                </div>
                <div>
                  <p className="text-[#7A93AA] mb-2">
                    Total you'll repay over the term
                  </p>
                  <p className="text-white text-2xl font-bold">
                    £{formatCurrency(results.totalPayment)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
