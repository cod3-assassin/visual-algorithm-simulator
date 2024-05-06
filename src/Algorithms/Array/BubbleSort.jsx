import React, { useState, useEffect, useRef } from "react";

const BubbleSortVisualizer = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0) {
      const startTime = performance.now();
      bubbleSort([...data]).then(() => {
        const endTime = performance.now();
        setTimeTaken((endTime - startTime).toFixed(2));
      });
    }
  }, [data]);

  const bubbleSort = async (array) => {
    let localComparisons = 0;
    let localSwaps = 0;
    const stepsCopy = [];
    for (let i = 0; i < array.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < array.length - 1 - i; j++) {
        localComparisons++;
        stepsCopy.push({
          type: "compare",
          indices: [j, j + 1],
          array: [...array],
          step: stepsCopy.length + 1,
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (array[j] > array[j + 1]) {
          localSwaps++;
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          stepsCopy.push({
            type: "swap",
            indices: [j, j + 1],
            array: [...array],
            step: stepsCopy.length + 1,
          });
          swapped = true;
        }
      }
      if (!swapped) break;
    }
    stepsCopy.push({
      type: "sorted",
      array: [...array],
      step: stepsCopy.length + 1,
      indices: [],
    });
    setSteps(stepsCopy);
    setComparisons(localComparisons);
    setSwaps(localSwaps);
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              <span
                className={`italic mx-2 ${
                  step.type === "compare" ? "text-blue-500" : "text-red-500"
                }`}
              >
                {step.type === "compare"
                  ? "Comparing"
                  : step.type === "swap"
                  ? "Swapping"
                  : ""}
              </span>
              <span
                className={`font-bold ${
                  step.type === "sorted"
                    ? "text-green-400 shadow-lg"
                    : "text-indigo-600"
                }`}
              >
                {step.type === "sorted"
                  ? "Sorted Array"
                  : step.indices
                      .map((index) => step.array[index])
                      .join(" and ")}
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
                        : "bg-blue-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                      : step.type === "sorted"
                      ? "bg-green-800 hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
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
            Total comparisons: {comparisons}, Total swaps: {swaps}
          </p>
          <p className="text-lg text-blue-700 shadow hover:text-blue-900 transition-colors duration-300">
            Theoretical time complexity of Bubble Sort is O(n^2) for the worst
            and average case, and O(n) for the best case when the array is
            already sorted.
          </p>
        </div>
      )}
    </div>
  );
};

export default BubbleSortVisualizer;
