import React from "react";
import useAlgorithm from "../hooks/useAlgorithm";

const VisualizationArea = ({ startVisualization, algorithm, data, target }) => {
  const algorithmComponent = useAlgorithm(algorithm, data, target);

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-center w-full overflow-auto"
      style={{ minHeight: "60vh" }}
    >
      {startVisualization ? (
        algorithmComponent
      ) : (
        <span className="text-xl text-white">
          Select an algorithm to visualize its process.
        </span>
      )}
    </div>
  );
};

export default VisualizationArea;
