import React, { useState } from "react";

const GraphInput = ({
  handleVertexInputChange,
  handleEdgeInputChange,
  algorithm,
}) => {
  const [vertexInput, setVertexInput] = useState("");
  const [edgeInput, setEdgeInput] = useState("");

  // Function to handle vertex input change
  const handleVertexChange = (e) => {
    setVertexInput(e.target.value);
    handleVertexInputChange(e.target.value);
  };

  // Function to handle edge input change
  const handleEdgeChange = (e) => {
    setEdgeInput(e.target.value);
    handleEdgeInputChange(e.target.value);
  };
  // Function to render input fields based on the selected algorithm
  const renderInputs = () => {
    switch (algorithm) {
      case "Dijkstra's Algorithm":
        return (
          <div>
            <p className="text-gray-300">Enter source vertex:</p>
            <input
              type="text"
              value={vertexInput}
              onChange={handleVertexChange}
              className="form-input block w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-500"
              placeholder="Source vertex..."
            />
          </div>
        );
      case "Breadth-First Search":
        return (
          <div>
            <p className="text-gray-300">Enter starting vertex:</p>
            <input
              type="text"
              value={vertexInput}
              onChange={handleVertexChange}
              className="form-input block w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-500"
              placeholder="Starting vertex..."
            />
          </div>
        );
      case "Depth-First Search":
        return (
          <div>
            <p className="text-gray-300">Enter starting vertex:</p>
            <input
              type="text"
              value={vertexInput}
              onChange={handleVertexChange}
              className="form-input block w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-500"
              placeholder="Starting vertex..."
            />
          </div>
        );
      case "Bellman-Ford Algorithm":
        return (
          <div>
            <p className="text-gray-300">Enter source vertex:</p>
            <input
              type="text"
              value={vertexInput}
              onChange={handleVertexChange}
              className="form-input block w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-500"
              placeholder="Source vertex..."
            />
          </div>
        );
      case "Floyd-Warshall Algorithm":
        return (
          <div>
            <p className="text-gray-300">Enter source and target vertices:</p>
            <input
              type="text"
              value={vertexInput}
              onChange={handleVertexChange}
              className="form-input block w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-500"
              placeholder="Source and target vertices..."
            />
          </div>
        );
      case "Kruskal's Algorithm":
        return (
          <div>
            <p className="text-gray-300">No additional input required.</p>
          </div>
        );
      case "Prim's Algorithm":
        return (
          <div>
            <p className="text-gray-300">Enter starting vertex:</p>
            <input
              type="text"
              value={vertexInput}
              onChange={handleVertexChange}
              className="form-input block w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-500"
              placeholder="Starting vertex..."
            />
          </div>
        );
      case "Topological Sorting":
        return (
          <div>
            <p className="text-gray-300">No additional input required.</p>
          </div>
        );
      case "Strongly Connected Components":
        return (
          <div>
            <p className="text-gray-300">No additional input required.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <p className="block text-lg font-semibold mb-2">Graph Input</p>
      {renderInputs()}
      <div>
        <p className="text-gray-300">Enter edges:</p>
        <input
          value={edgeInput}
          onChange={handleEdgeChange}
          className="block w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-500"
          rows="4"
          placeholder="Enter edges..."
        ></input>
      </div>
    </div>
  );
};

export default GraphInput;
