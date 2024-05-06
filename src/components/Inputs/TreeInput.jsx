import React from "react";

const TreeInput = ({ input, target, handleInputChange, algorithm }) => {
  // Determine if extra input sections should be shown based on the algorithm
  const showExtraInput =
    algorithm === "BST Insertion" || algorithm === "BST Deletion";

  // Additional input fields based on the algorithm
  const extraInputFields = showExtraInput ? (
    <div>
      <p className="block text-lg font-semibold mb-2">Additional Inputs</p>
      <input
        id="extra-input-tree"
        type="text"
        value={target}
        onChange={handleInputChange}
        className="form-input block w-full p-3 rounded bg-gray-700 placeholder-gray-300"
        placeholder="Enter additional values..."
      />
    </div>
  ) : null;

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
      {extraInputFields}
    </div>
  );
};

export default TreeInput;
