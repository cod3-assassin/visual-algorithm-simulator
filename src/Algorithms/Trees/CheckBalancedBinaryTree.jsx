import React, { useState, useEffect } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";

const CheckBalancedBinaryTree = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [completeTree, setCompleteTree] = useState(null);
  const [treeHeight, setTreeHeight] = useState(null);

  useEffect(() => {
    if (data?.length > 0) {
      const result = checkBalancedBinaryTree(data);
      setSteps(result.steps);
      setTreeHeight(result.height);
      setCompleteTree(result.root);
    }
  }, [data]);

  const checkBalancedBinaryTree = (data) => {
    const result = {
      steps: [],
      height: -1,
      root: null,
    };

    const calculateHeight = (node) => {
      if (!node) return 0;
      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);
      const currentHeight = Math.max(leftHeight, rightHeight) + 1;
      return currentHeight;
    };

    const isBalanced = (node) => {
      if (!node) return true;
      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return isBalanced(node.left) && isBalanced(node.right);
    };

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

    let root = null;
    const steps = [];
    data.forEach((value, index) => {
      root = insertNode(root, value);
      const currentHeight = calculateHeight(root) - 1;
      const isCurrentBalanced = isBalanced(root);
      steps.push({
        step: index + 1,
        value,
        height: currentHeight,
        isBalanced: isCurrentBalanced,
      });
    });

    result.steps = steps;
    result.height = calculateHeight(root) - 1;
    result.root = root;

    return result;
  };

  const renderTreeNode = (node, level) => {
    if (!node) return null;

    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      cursor: "pointer",
    };

    const valueStyle = {
      backgroundColor: "#4CAF50",
      color: "white",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "8px",
    };

    const horizontalLineStyle = {
      position: "absolute",
      top: "calc(50% - 1px)",
      width: "calc(50% - 20px)",
      height: "2px",
      backgroundColor: "#000",
      zIndex: "-1",
    };

    const childContainerStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    };

    const leftChildStyle = {
      position: "relative",
    };

    const rightChildStyle = {
      position: "relative",
    };

    return (
      <div key={node.value} style={containerStyle} className="node">
        <div style={valueStyle} className="node-circle">
          {node.value}
        </div>
        {node.left && node.right && <div style={horizontalLineStyle}></div>}
        <div style={childContainerStyle}>
          {node.left && (
            <div style={leftChildStyle}>
              {renderTreeNode(node.left, level + 1)}
            </div>
          )}
          {node.right && (
            <div style={rightChildStyle}>
              {renderTreeNode(node.right, level + 1)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step) => (
          <div key={step.step} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              <span className="italic mx-2 text-blue-500">
                Inserted Node: {step.value}
              </span>
              <span
                className={`font-bold ${
                  step.isBalanced ? "text-green-700" : "text-red-700"
                }`}
              >
                {step.isBalanced ? "Balanced" : "Unbalanced"}
              </span>
            </div>
            <div className="flex justify-center flex-wrap">
              {data.slice(0, step.step).map((value, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: step.isBalanced ? "#4CAF50" : "#F44336",
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
                  {value}
                </div>
              ))}
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
            <div
              className={`flex justify-center flex-wrap ${
                steps[steps.length - 1].isBalanced
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {renderTreeNode(completeTree)}
            </div>
          </div>
        )}
      </div>
      {steps.length > 0 && (
        <div className="text-center mt-4">
          <h2
            className={`text-2xl font-bold mb-2 ${
              steps[steps.length - 1].isBalanced
                ? "text-green-700"
                : "text-red-700"
            } shadow-lg`}
          >
            {steps[steps.length - 1].isBalanced
              ? "Tree is Balanced"
              : "Tree is Unbalanced"}
          </h2>
        </div>
      )}
    </div>
  );
};

export default CheckBalancedBinaryTree;
