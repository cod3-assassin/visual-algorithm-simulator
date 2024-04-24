import React from "react";
import { DatabaseIcon } from "@heroicons/react/solid";

const InputSection = ({
  input,
  target,
  handleInputChange,
  handleTargetChange,
  algorithm,
}) => {
  const showTargetInput = algorithm === "Binary Search"; // Change "Binary Search" to the desired algorithm name

  return (
    <div className="md:col-span-3 bg-gray-800 p-4 rounded-lg shadow-lg w-full">
      <label className="block text-lg font-semibold mb-2">
        <DatabaseIcon className="h-6 w-6 mr-2" /> Input Data
      </label>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="form-input block w-full p-3 rounded bg-gray-700 placeholder-gray-300"
        placeholder="Enter comma-separated numbers..."
      />
      {/* Conditionally render the target input based on the selected algorithm */}
      {showTargetInput && (
        <div className="mt-4">
          <label className="block text-lg font-semibold mb-2">Target</label>
          <input
            type="text"
            value={target}
            onChange={handleTargetChange} // Add onChange handler for the target input
            className="form-input block w-full p-3 rounded bg-gray-700 placeholder-gray-300"
            placeholder="Enter the target value..."
          />
        </div>
      )}
    </div>
  );
};

export default InputSection;
