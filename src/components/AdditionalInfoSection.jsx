import React from "react";
import { FaRegDotCircle } from "react-icons/fa";

const AdditionalInfoSection = () => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Instructions:</h3>
        <ol className="list-decimal pl-6 text-gray-300">
          <li className="flex items-center">
            <FaRegDotCircle className="mr-2 text-green-500" />
            Select the appropriate data structure for visualization.
          </li>
          <li className="flex items-center">
            <FaRegDotCircle className="mr-2 text-green-500" />
            Choose the algorithm you want to visualize.
          </li>
          <li className="flex items-center">
            <FaRegDotCircle className="mr-2 text-green-500" />
            Input the necessary data for the selected algorithm.
          </li>
          <li className="flex items-center">
            <FaRegDotCircle className="mr-2 text-green-500" />
            Click the "Start" button to begin visualization.
          </li>
          <li className="flex items-center">
            <FaRegDotCircle className="mr-2 text-green-500" />
            Follow the step-by-step execution to understand the algorithm's
            behavior.
          </li>
          <li className="flex items-center">
            <FaRegDotCircle className="mr-2 text-green-500" />
            After completion, click the "Clear" button to reset and proceed to
            the next algorithm.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
