import React, { useState } from "react";

const toBanglaNumber = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => banglaDigits[d]);
};

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const clearAll = () => {
    setExpression("");
    setResult("");
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handlePercentage = () => {
    try {
      if (expression) {
        const evaluated = eval(expression) / 100;
        setExpression(evaluated.toString());
        setResult(evaluated);
      }
    } catch {
      setResult("ভুল ইনপুট");
    }
  };

  const calculate = () => {
    try {
      const evalResult = eval(expression);
      setResult(evalResult);
    } catch {
      setResult("ভুল ইনপুট");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-amber-600 mb-4">
           ক্যালকুলেটর
        </h1>

        {/* Display */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="text-right text-gray-800 text-lg break-words min-h-[24px]">
            {toBanglaNumber(expression) || "০"}
          </div>
          <div className="text-right text-amber-700 text-2xl font-bold mt-2 min-h-[30px]">
            {result !== "" ? toBanglaNumber(result) : ""}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3 text-lg">
          <button
            onClick={clearAll}
            className="bg-red-200 hover:bg-red-300 text-red-800 font-semibold py-2 rounded-lg"
          >
            রিসেট
          </button>
          <button
            onClick={handleBackspace}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg"
          >
            ←
          </button>
          <button
            onClick={handlePercentage}
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 rounded-lg"
          >
            %
          </button>
          <button
            onClick={() => handleClick("/")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
          >
            ÷
          </button>

          <button
            onClick={() => handleClick("7")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("7")}
          </button>
          <button
            onClick={() => handleClick("8")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("8")}
          </button>
          <button
            onClick={() => handleClick("9")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("9")}
          </button>
          <button
            onClick={() => handleClick("*")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
          >
            ×
          </button>

          <button
            onClick={() => handleClick("4")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("4")}
          </button>
          <button
            onClick={() => handleClick("5")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("5")}
          </button>
          <button
            onClick={() => handleClick("6")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("6")}
          </button>
          <button
            onClick={() => handleClick("-")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
          >
            −
          </button>

          <button
            onClick={() => handleClick("1")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("1")}
          </button>
          <button
            onClick={() => handleClick("2")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("2")}
          </button>
          <button
            onClick={() => handleClick("3")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("3")}
          </button>
          <button
            onClick={() => handleClick("+")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
          >
            +
          </button>

          <button
            onClick={() => handleClick("0")}
            className="col-span-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            {toBanglaNumber("0")}
          </button>
          <button
            onClick={() => handleClick(".")}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg shadow"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
