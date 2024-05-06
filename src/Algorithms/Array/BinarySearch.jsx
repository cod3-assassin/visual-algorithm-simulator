import React, { useState, useEffect, useRef } from "react";

const BinarySearch = ({ data, target }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const elementRefs = useRef([]);
  const [foundIndex, setFoundIndex] = useState(-1);

  useEffect(() => {
    if (data?.length > 0 && target !== undefined && target !== "") {
      const startTime = performance.now();
      binarySearch(
        [...data].sort((a, b) => a - b),
        parseInt(target)
      );
      const endTime = performance.now();
      setTimeTaken((endTime - startTime).toFixed(2));
    }
  }, [data, target]);

  const binarySearch = (array, target) => {
    const stepsCopy = [];
    let low = 0;
    let high = array.length - 1;

    stepsCopy.push({
      step: 1,
      action: "Initialize",
      low: low,
      high: high,
      mid: null,
      midValue: null,
      comparisonResult: null,
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midValue = array[mid];
      const comparisonResult = compareValues(midValue, target);
      stepsCopy.push({
        step: stepsCopy.length + 1,
        action: comparisonResult === 0 ? "Comparing" : "Updating",
        low: low,
        high: high,
        mid: mid,
        midValue: midValue,
        comparisonResult: comparisonResult,
      });
      if (comparisonResult === 0) {
        setFoundIndex(mid);
        break;
      } else if (comparisonResult < 0) {
        stepsCopy.push({
          step: stepsCopy.length + 1,
          action: "Update Low Bound",
          low: mid + 1,
          high: high,
          mid: null,
          midValue: null,
          comparisonResult: null,
        });
        low = mid + 1;
      } else {
        stepsCopy.push({
          step: stepsCopy.length + 1,
          action: "Update High Bound",
          low: low,
          high: mid - 1,
          mid: null,
          midValue: null,
          comparisonResult: null,
        });
        high = mid - 1;
      }
    }

    setSteps(stepsCopy);
  };

  const compareValues = (value1, value2) => {
    if (value1 === value2) {
      return 0;
    } else if (value1 < value2) {
      return -1;
    } else {
      return 1;
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              <span className="italic mx-2 text-blue-500">{step.action}</span>
              <span className="font-bold text-indigo-600">
                {step.comparisonResult !== null &&
                  step.action === "Comparing" &&
                  (step.comparisonResult === 0 ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      Target Found at index {step.mid}
                    </span>
                  ) : step.comparisonResult < 0 ? (
                    `Updating low bound to ${step.low}`
                  ) : (
                    `Updating high bound to ${step.high}`
                  ))}
              </span>
            </div>
            <div className="flex justify-center flex-wrap">
              {data.map((value, index) => (
                <div
                  ref={(el) => (elementRefs.current[index] = el)}
                  key={index}
                  className={`animated-element border p-2 ${
                    step.low <= index && index <= step.high
                      ? index === step.mid
                        ? "bg-yellow-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                        : "bg-red-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                      : ""
                  }`}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {steps.length > 0 && steps[steps.length - 1].comparisonResult === 0 && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-green-700 shadow-lg">
            Search Complete !!
          </h2>
          <p className="text-xl text-orange-500 shadow hover:text-orange-700 transition-colors duration-300">
            Searching completed in {timeTaken} milliseconds.
          </p>
        </div>
      )}
      {steps.length > 0 && steps[steps.length - 1].comparisonResult !== 0 && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-red-700 shadow-lg">
            Target Not Found!
          </h2>
        </div>
      )}
    </div>
  );
};

export default BinarySearch;
