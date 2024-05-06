import React, { useState, useEffect } from "react";

const DeletionByPosition = ({ data, target }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (data?.length > 0 && target !== undefined && target !== "") {
      const startTime = performance.now();
      deleteElement(data, parseInt(target));
      const endTime = performance.now();
      setTimeTaken((endTime - startTime).toFixed(2));
    }
  }, [data, target]);

  const deleteElement = (array, position) => {
    if (position < 0 || position >= array.length) {
      setErrorMessage(
        "Invalid position: Position must be within the range of the array length."
      );
      return; // Invalid position
    }

    const deletedValue = array[position];
    const newArray = array.filter((_, index) => index !== position);

    setDeletedIndex(position);

    const deletionStep = {
      step: 1,
      action: "Find the Element to Delete",
      deletedIndex: null,
      newArray: [...array],
    };

    setSteps([deletionStep]);

    const stepsCopy = [];
    stepsCopy.push({
      step: stepsCopy.length + 1,
      action: "Find the Element to Delete",
      deletedIndex: position,
      newArray: [...array],
    });

    stepsCopy.push({
      step: stepsCopy.length + 1,
      action: `Comparing index ${position} with target ${position}`,
      deletedIndex: position,
      newArray: [...array],
      compareIndex: position,
      compareTarget: position,
    });

    stepsCopy.push({
      step: stepsCopy.length + 1,
      action: "Delete Element",
      deletedIndex: position,
      newArray: [...newArray],
    });

    stepsCopy.push({
      step: stepsCopy.length + 1,
      action: "Show Updated Array",
      deletedIndex: null,
      newArray: [...newArray],
      isNewArray: true,
    });

    setSteps(stepsCopy);
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              <span className="italic mx-2 text-blue-500">{step.action}</span>
              {step.deletedIndex !== null && (
                <span className="font-bold text-indigo-600">
                  {step.action === "Find the Element to Delete"
                    ? `Element found at index ${step.deletedIndex}`
                    : step.action.includes("Comparing")
                    ? `Comparing index ${step.compareIndex} with target ${step.compareTarget}`
                    : `Deleting element at index ${step.deletedIndex}`}
                </span>
              )}
            </div>
            <div className="flex justify-center flex-wrap">
              {step.newArray.map((value, index) => (
                <div
                  key={index}
                  className={`border p-2 ${
                    index === step.deletedIndex
                      ? "bg-red-500 text-white"
                      : step.isNewArray
                      ? "bg-green-500 text-white hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:-translate-y-2"
                      : ""
                  }`}
                  style={{
                    transition: "all 0.3s ease",
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {errorMessage && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-red-700 shadow-lg">
            Error:
          </h2>
          <p className="text-xl text-red-500">{errorMessage}</p>
        </div>
      )}
      {deletedIndex !== -1 && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-green-700 shadow-lg">
            Deletion Complete !!
          </h2>
          <p className="text-xl text-orange-500 shadow hover:text-orange-700 transition-colors duration-300">
            Element at index {deletedIndex} deleted successfully.
          </p>
          <p className="text-xl text-orange-500 shadow hover:text-orange-700 transition-colors duration-300">
            Deletion completed in {timeTaken} milliseconds.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeletionByPosition;
