// InputSection.jsx
import React from "react";
import ArrayInput from "./Inputs/ArrayInput";
import LinkedListInput from "./Inputs/LinkedListInput";
import QueueInput from "./Inputs/QueueInput";
import TreeInput from "./Inputs/TreeInput";

const InputSection = ({
  input,
  target,
  handleInputChange,
  handleTargetChange,
  category,
  algorithm,
}) => {
  // Render input component based on the selected category
  let inputComponent = null;

  switch (category) {
    case "Array":
      inputComponent = (
        <ArrayInput
          input={input}
          handleInputChange={handleInputChange}
          target={target}
          handleTargetChange={handleTargetChange}
          algorithm={algorithm}
        />
      );
      break;
    case "Linked List":
      inputComponent = (
        <LinkedListInput
          input={input}
          handleInputChange={handleInputChange}
          target={target}
          handleTargetChange={handleTargetChange}
          algorithm={algorithm}
        />
      );
      break;
    case "Queue":
      inputComponent = (
        <QueueInput
          input={input}
          handleInputChange={handleInputChange}
          target={target}
          handleTargetChange={handleTargetChange}
          algorithm={algorithm}
        />
      );
      break;
    case "Trees":
      inputComponent = (
        <TreeInput
          input={input}
          handleInputChange={handleInputChange}
          target={target}
          handleTargetChange={handleTargetChange}
          algorithm={algorithm}
        />
      );
      break;

    default:
      inputComponent = null;
  }

  return (
    <div className="md:col-span-3 bg-gray-800 p-4 rounded-lg shadow-lg w-full">
      <p className="block text-lg font-semibold mb-2">Input Data</p>
      {/* Render input component */}
      {inputComponent}
    </div>
  );
};

export default InputSection;
