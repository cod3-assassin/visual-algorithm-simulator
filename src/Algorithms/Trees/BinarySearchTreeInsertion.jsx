import { FaLongArrowAltDown } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const BinarySearchTreeInsertion = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [completeTree, setCompleteTree] = useState(null);

  useEffect(() => {
    if (data?.length > 0) {
      const newSteps = [];
      const tree = { value: data[0], left: null, right: null };
      newSteps.push({ value: data[0], step: 1, action: "Initial Tree" });
      for (let i = 1; i < data.length; i++) {
        insertNode(tree, data[i], newSteps);
      }
      setCompleteTree(renderTreeNode(tree, 0, true));
      setSteps(newSteps);
    }
  }, [data]);

  const insertNode = (root, value, steps) => {
    let currentNode = root;
    let parent = null;
    let isLeftChild = false;
    let step = steps.length + 1;

    while (currentNode) {
      parent = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
        isLeftChild = true;
      } else {
        currentNode = currentNode.right;
        isLeftChild = false;
      }
      step++;
    }

    if (isLeftChild) {
      parent.left = { value, left: null, right: null };
      steps.push({ value, step, action: `Inserting ${value}` });
    } else {
      parent.right = { value, left: null, right: null };
      steps.push({ value, step, action: `Inserting ${value}` });
    }
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
          marginLeft: isFirstNode ? "0" : "20px", // Adjust marginLeft for the first node
          marginRight: "20px",
          marginBottom: "20px",
        }}
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
        >
          {node.value}
        </div>
        <FaLongArrowAltDown style={{ fontSize: "20px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
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
              {renderTreeNode({ value: step.value }, 0, true)}
            </div>
          </div>
        ))}
        {completeTree && (
          <div className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Complete Tree:</span>
              <span className="italic mx-2 text-blue-500">
                Hover for effect
              </span>
            </div>
            <div className="flex justify-center flex-wrap">{completeTree}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinarySearchTreeInsertion;
