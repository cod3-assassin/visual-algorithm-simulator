// ArrayInput.js
import React from "react";

const ArrayInput = ({
  input,
  handleInputChange,
  target,
  handleTargetChange,
  algorithm,
}) => {
  // Function to determine if the target input should be shown based on the algorithm
  const shouldShowTargetInput =
    algorithm === "Linear Search" || algorithm === "Binary Search";

  return (
    <div>
      <p className="block text-lg font-semibold mb-2">Array Input</p>
      <input
        id="input-array"
        type="text"
        value={input}
        onChange={handleInputChange}
        className="form-input block w-full p-3 rounded bg-gray-700 placeholder-gray-300"
        placeholder="Enter comma-separated numbers..."
      />
      {/* Show target input if the condition is met */}
      {shouldShowTargetInput && (
        <div className="mt-4">
          <p className="block text-lg font-semibold mb-2">Target</p>
          <input
            id="input-target"
            type="text"
            value={target}
            onChange={handleTargetChange}
            className="form-input block w-full p-3 rounded bg-gray-700 placeholder-gray-300"
            placeholder="Enter the target value..."
          />
        </div>
      )}
    </div>
  );
};

export default ArrayInput;
