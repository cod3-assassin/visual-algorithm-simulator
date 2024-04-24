import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const SelectionSort = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [comparisons, setComparisons] = useState(0);
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0) {
      const startTime = performance.now();
      selectionSort([...data]).then(() => {
        const endTime = performance.now();
        setTimeTaken((endTime - startTime).toFixed(2));
      });
    }
  }, [data]);

  useEffect(() => {
    animateElements();
  }, [steps]);

  const animateElements = () => {
    elementRefs.current.forEach((ref, index) => {
      if (ref && steps.length) {
        const node = d3.select(ref);
        const currentStep = steps[steps.length - 1];
        node
          .transition()
          .duration(300)
          .style(
            "transform",
            currentStep.type === "sorted" ? "scale(1)" : "scale(1.1)"
          )
          .style(
            "background-color",
            currentStep.type === "sorted" ? "" : "purple"
          )
          .transition()
          .duration(300)
          .style("transform", "scale(1)")
          .style("background-color", currentStep.type === "sorted" ? "" : "");
      }
    });
  };

  const selectionSort = async (array) => {
    let localComparisons = 0;
    const stepsCopy = [];

    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        localComparisons++;
        stepsCopy.push({
          type: "compare",
          indices: [minIndex, j],
          array: [...array],
          step: stepsCopy.length + 1,
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        stepsCopy.push({
          type: "swap",
          indices: [i, minIndex],
          array: [...array],
          step: stepsCopy.length + 1,
        });
      }
    }

    stepsCopy.push({
      type: "sorted",
      array: [...array],
      step: stepsCopy.length + 1,
      indices: Array.from({ length: array.length }, (_, i) => i),
    });

    setSteps(stepsCopy);
    setComparisons(localComparisons);
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              <span
                className={`mx-2 font-bold ${
                  step.type === "compare"
                    ? "text-blue-500"
                    : step.type === "swap"
                    ? "text-red-500"
                    : "text-green-400 shadow-lg"
                }`}
              >
                {step.type === "compare"
                  ? "Comparing"
                  : step.type === "swap"
                  ? "Swapping"
                  : "Sorted Array"}
              </span>
              <span className="font-bold text-indigo-600">
                {step.indices.map((index) => step.array[index]).join(", ")}
              </span>
            </div>
            <div className="flex justify-center flex-wrap">
              {step.array.map((value, index) => (
                <div
                  ref={(el) => (elementRefs.current[index] = el)}
                  key={index}
                  className={`animated-element border p-2 ${
                    step.indices.includes(index)
                      ? step.type === "swap"
                        ? "bg-red-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                        : step.type === "compare"
                        ? "bg-orange-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                        : step.type === "sorted"
                        ? "bg-green-800 hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
                        : ""
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
      {steps.length > 0 && steps[steps.length - 1].type === "sorted" && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-green-700 shadow-lg">
            Array Sorted!
          </h2>
          <p className="text-xl text-orange-500 shadow hover:text-orange-700 transition-colors duration-300">
            Sorting completed in {timeTaken} milliseconds.
          </p>
          <p className="text-lg text-white-800 shadow">
            Total comparisons: {comparisons}
          </p>
          <p className="text-lg text-blue-700 shadow hover:text-blue-900 transition-colors duration-300">
            Theoretical time complexity of Selection Sort is O(n^2) for all
            cases.
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectionSort;
