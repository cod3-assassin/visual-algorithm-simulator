import React, { useState, useEffect, useRef } from "react";

const InsertionAtBeginning = ({ data = [], target }) => {
  const [steps, setSteps] = useState([]);
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0 && target !== null) {
      insertAtBeginning([...data], target).then((newArray) => {
        const stepsCopy = [];
        newArray.forEach((value, index) => {
          if (index === 0) {
            stepsCopy.push({
              array: [...newArray],
              insertedValue: value,
              insertedIndex: index,
              step: stepsCopy.length + 1,
            });
          } else {
            stepsCopy.push({
              array: [...newArray],
              shiftedValue: value,
              insertedIndex: index,
              step: stepsCopy.length + 1,
              shift: true,
            });
          }
        });
        stepsCopy.push({
          array: [...newArray],
          step: stepsCopy.length + 1,
          isNewArray: true,
        });
        setSteps(stepsCopy);
      });
    }
  }, [data, target]);

  const insertAtBeginning = async (array, value) => {
    const newArray = [value, ...array];
    return newArray;
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              {step.shift && (
                <>
                  <span className=" bold italic mx-2 text-red-500">
                    Shifting
                  </span>
                  <span className="font-bold mx-2 text-blue-500">
                    {step.shiftedValue} to index
                  </span>
                  <span className="font-bold text-indigo-600">
                    {step.insertedIndex}
                  </span>
                </>
              )}
              {step.insertedValue && (
                <>
                  <span className="italic mx-2 text-blue-500">Inserting</span>
                  <span className="font-bold text-indigo-600">
                    {step.insertedValue}
                  </span>
                  <span className="font-bold italic mx-2 text-blue-500">
                    at index
                  </span>
                  <span className="font-bold text-indigo-600">
                    {step.insertedIndex}
                  </span>
                </>
              )}
              {step.isNewArray && (
                <span className="font-bold  mx-2 text-green-400">
                  New Array !!
                </span>
              )}
            </div>
            <div className="flex justify-center flex-wrap">
              {step.array.map((value, index) => (
                <div
                  ref={(el) => (elementRefs.current[index] = el)}
                  key={index}
                  className={`animated-element border p-2 ${
                    index === step.insertedIndex
                      ? "bg-orange-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                      : step.isNewArray
                      ? "bg-green-800 hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
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
    </div>
  );
};

export default InsertionAtBeginning;
