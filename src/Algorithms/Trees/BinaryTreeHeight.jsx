import React, { useState, useEffect } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";

const BinaryTreeHeight = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [completeTree, setCompleteTree] = useState(null);
  const [treeHeight, setTreeHeight] = useState(null);

  useEffect(() => {
    if (data?.length > 0) {
      const newSteps = [];
      const tree = buildTree(data);
      const height = calculateHeight(tree);
      newSteps.push({ height, step: 1, action: "Calculate Tree Height" });
      setCompleteTree(renderTreeNode(tree, 0, true));
      setTreeHeight(height);
      setSteps(newSteps);
    }
  }, [data]);

  // Function to build the binary tree
  const buildTree = (data) => {
    // Initialize the root node
    let root = null;

    // Insert each value into the binary tree
    data.forEach((value) => {
      root = insertNode(root, value);
    });

    return root;
  };

  // Function to insert a node into the binary tree
  const insertNode = (root, value) => {
    if (!root) {
      return { value, left: null, right: null };
    }

    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }

    return root;
  };

  // Function to calculate the height of the binary tree
  const calculateHeight = (root) => {
    if (!root) {
      return 0;
    }

    const leftHeight = calculateHeight(root.left);
    const rightHeight = calculateHeight(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  // Render the tree node
  const renderTreeNode = (node, level, isFirstNode) => {
    if (!node) return null;

    return (
      <div
        key={node.value}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: isFirstNode ? "0" : "40px", // Adjust marginLeft for the first node
          marginRight: "40px",
          position: "relative", // Added for hover effect
          cursor: "pointer", // Added for hover effect
        }}
        className="node"
      >
        <div
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "8px",
          }}
          className="node-circle"
        >
          {node.value}
        </div>
        <FaLongArrowAltDown style={{ fontSize: "20px" }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {renderTreeNode(node.left, level + 1, false)}
          {renderTreeNode(node.right, level + 1, false)}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              <span className="italic mx-2 text-blue-500">{step.action}</span>
            </div>
            <div className="flex justify-center flex-wrap">
              {renderTreeNode({ value: step.height }, 0, true)}
            </div>
          </div>
        ))}
        {completeTree && (
          <div className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Complete Tree:</span>
              <span className="italic mx-2 text-blue-500">
                Tree Height: {treeHeight}
              </span>
            </div>
            <div className="flex justify-center flex-wrap">{completeTree}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinaryTreeHeight;
