import React from "react";

const AdditionalInfoSection = () => {
  return (
    <div className="relative md:col-span-9 bg-gray-600 p-7 rounded-lg shadow-lg flex flex-col w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
        <p className="text-gray-300">To use the algorithm visualizer:</p>
        <ul className="list-disc pl-6 text-gray-300">
          <li>
            Step 1: Select the appropriate data structure for visualization.
          </li>
          <li>Step 2: Choose the algorithm you want to visualize.</li>
          <li>
            Step 3: Input the necessary data for the selected algorithm
            execution.
          </li>
          <li>Step 4: Click the "Start" button to begin visualization.</li>
          <li>
            Step 5: Follow the step-by-step execution to understand the
            algorithm's behavior.
          </li>
          <li>
            Step 6: After completion, click the "Clear" button to reset and
            proceed to the next algorithm.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
