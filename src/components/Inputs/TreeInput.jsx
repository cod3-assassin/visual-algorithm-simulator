import React from "react";

const TreeInput = ({
  input,
  target,
  handleInputChange,
  handleTargetChange,
  algorithm,
}) => {
  // Function to determine if the target input should be shown based on the algorithm
  const shouldShowTargetInput = algorithm === "BST Deletion";

  return (
    <div>
      <p className="block text-lg font-semibold mb-2">Tree Input</p>
      <input
        id="input-tree"
        type="text"
        value={input}
        onChange={handleInputChange}
        className="form-input block w-full p-3 rounded bg-gray-700 placeholder-gray-300"
        placeholder="Enter tree values..."
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

export default TreeInput;
