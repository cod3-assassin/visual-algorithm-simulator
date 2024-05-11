import React, { useState, useEffect } from "react";

const BinarySearchTreeDeletion = ({ data, target }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (data?.length > 0 && target !== undefined && target !== "") {
      const startTime = performance.now();
      performDeletion(
        [...data].sort((a, b) => a - b),
        parseInt(target)
      );
      const endTime = performance.now();
      setTimeTaken((endTime - startTime).toFixed(2));
    }
  }, [data, target]);

  const performDeletion = (array, target) => {
    const stepsCopy = [];
    let root = buildTree(array);
    stepsCopy.push({ tree: root, step: 1, action: "Initial Tree" });
    if (searchNode(root, target)) {
      root = deleteNode(root, target, stepsCopy);
    } else {
      stepsCopy.push({
        tree: root,
        step: stepsCopy.length + 1,
        action: `Target ${target} not found, deletion aborted.`,
        notFound: true,
      });
    }
    setSteps(stepsCopy);
  };

  const buildTree = (array) => {
    let root = null;
    array.forEach((value) => {
      root = insertNode(root, value);
    });
    return root;
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

  const searchNode = (root, value) => {
    if (!root) return false;
    if (root.value === value) return true;
    if (value < root.value) {
      return searchNode(root.left, value);
    } else {
      return searchNode(root.right, value);
    }
  };

  const deleteNode = (root, target, stepsCopy) => {
    if (!root) return null;

    stepsCopy.push({
      tree: root,
      step: stepsCopy.length + 1,
      action: `Searching for node ${target} to delete.`,
    });

    if (target < root.value) {
      root.left = deleteNode(root.left, target, stepsCopy);
    } else if (target > root.value) {
      root.right = deleteNode(root.right, target, stepsCopy);
    } else {
      if (!root.left) {
        stepsCopy.push({
          tree: root,
          step: stepsCopy.length + 1,
          action: `Node ${target} found. Deleting node with no left child.`,
        });
        return root.right;
      } else if (!root.right) {
        stepsCopy.push({
          tree: root,
          step: stepsCopy.length + 1,
          action: `Node ${target} found. Deleting node with no right child.`,
        });
        return root.left;
      }

      root.value = minValue(root.right);
      root.right = deleteNode(root.right, root.value, stepsCopy);

      stepsCopy.push({
        tree: root,
        step: stepsCopy.length + 1,
        action: `Node ${target} deleted successfully.`,
      });
    }
    return root;
  };

  const minValue = (root) => {
    let minValue = root.value;
    while (root.left) {
      minValue = root.left.value;
      root = root.left;
    }
    return minValue;
  };

  const renderTreeNode = (node, level) => {
    if (!node) return null;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        <div style={{ display: "flex" }}>
          {renderTreeNode(node.left, level + 1)}
          {renderTreeNode(node.right, level + 1)}
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
              <span className="italic mx-2 text-blue-500">
                {step.action}
                {step.notFound && (
                  <span style={{ color: "red" }}> Node not found!</span>
                )}
              </span>
            </div>
            <div className="flex justify-center flex-wrap">
              {step.tree && renderTreeNode(step.tree, 0)}
            </div>
          </div>
        ))}
      </div>
      {steps.length > 0 && (
        <div className="text-center mt-4">
          <h2
            className={`text-2xl font-bold mb-2 ${
              steps[steps.length - 1].notFound
                ? "text-red-700"
                : "text-green-700"
            } shadow-lg`}
          >
            {steps[steps.length - 1].notFound
              ? "Node not found!"
              : "Deletion Complete!!"}
          </h2>
          {steps.length > 0 && !steps[steps.length - 1].notFound && (
            <p className="text-xl text-orange-500 shadow hover:text-orange-700 transition-colors duration-300">
              Deletion completed in {timeTaken} milliseconds.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BinarySearchTreeDeletion;
