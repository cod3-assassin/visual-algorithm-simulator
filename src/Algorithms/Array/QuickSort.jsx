import React, { useState, useEffect, useRef } from "react";

const QuickSort = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [comparisons, setComparisons] = useState(0);
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0) {
      const startTime = performance.now();
      quickSort([...data]).then(() => {
        const endTime = performance.now();
        setTimeTaken((endTime - startTime).toFixed(2));
      });
    }
  }, [data]);

  const quickSort = async (array) => {
    let localComparisons = 0;
    const stepsCopy = [];

    async function partition(low, high) {
      let pivot = array[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        localComparisons++;
        stepsCopy.push({
          type: "compare",
          indices: [j, high],
          array: [...array],
          step: stepsCopy.length + 1,
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (array[j] <= pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          stepsCopy.push({
            type: "swap",
            indices: [i, j],
            array: [...array],
            step: stepsCopy.length + 1,
          });
        }
      }

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      stepsCopy.push({
        type: "partition",
        indices: [i + 1],
        array: [...array],
        step: stepsCopy.length + 1,
      });
      return i + 1;
    }

    async function quickSortHelper(low, high) {
      if (low < high) {
        let pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      }
    }

    await quickSortHelper(0, array.length - 1);

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
                    : step.type === "partition"
                    ? "text-yellow-500"
                    : "text-green-400 shadow-lg"
                }`}
              >
                {step.type === "compare"
                  ? "Comparing"
                  : step.type === "swap"
                  ? "Swapping"
                  : step.type === "partition"
                  ? "Partitioning"
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
                        : step.type === "partition"
                        ? "bg-yellow-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                        : step.type === "compare"
                        ? "bg-orange-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                        : step.type === "sorted"
                        ? "bg-green-800 hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
                        : ""
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
            Theoretical time complexity of Quick Sort is O(n log n) for the
            average case and O(n^2) for the worst case.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickSort;
