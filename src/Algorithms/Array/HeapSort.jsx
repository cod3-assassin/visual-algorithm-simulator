import React, { useState, useEffect, useRef } from "react";

const HeapSort = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [sortingMethod, setSortingMethod] = useState("");
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0) {
      const startTime = performance.now();
      heapSort([...data]).then(() => {
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
        const currentStep = steps[steps.length - 1];
        ref.style.transform =
          currentStep.type === "sorted" ? "scale(1)" : "scale(1.1)";
        ref.style.backgroundColor =
          currentStep.type === "compare"
            ? "blue"
            : currentStep.type === "swap"
            ? "red"
            : currentStep.type === "sorted"
            ? ""
            : "purple";
      }
    });
  };

  const heapSort = async (array) => {
    const stepsCopy = [];

    async function heapify(arr, n, i) {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }

      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        stepsCopy.push({
          type: "swap",
          indices: [i, largest],
          array: [...arr],
          step: stepsCopy.length + 1,
          method: "Heapify",
        });
        await new Promise((resolve) => setTimeout(resolve, 300));

        await heapify(arr, n, largest);
      }
    }

    async function buildHeap(arr) {
      for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        await heapify(arr, arr.length, i);
      }
    }

    async function sort(arr) {
      await buildHeap(arr);

      for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        stepsCopy.push({
          type: "swap",
          indices: [0, i],
          array: [...arr],
          step: stepsCopy.length + 1,
          method: "Swap",
        });
        await new Promise((resolve) => setTimeout(resolve, 300));

        await heapify(arr, i, 0);
      }
    }

    await sort(array);

    stepsCopy.push({
      type: "sorted",
      array: [...array],
      step: stepsCopy.length + 1,
      indices: Array.from({ length: array.length }, (_, i) => i),
      method: "Sorted",
    });

    setSteps(stepsCopy);
    setSortingMethod(stepsCopy[0]?.method ?? "");
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
                    : step.type === "sorted"
                    ? "text-green-400 shadow-lg"
                    : "text-purple-500"
                }`}
              >
                {step.type === "compare"
                  ? "Comparing"
                  : step.type === "swap"
                  ? "Swapping"
                  : step.type === "sorted"
                  ? "Sorted Array"
                  : "Building Heap"}
              </span>
              <span className="font-bold text-indigo-600">
                {step.indices.map((index) => step.array[index]).join(", ")}
              </span>
              <span className="font-bold text-yellow-500">{step.method}</span>
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
                        : step.type === "sorted"
                        ? "bg-green-800 hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:-translate-y-2"
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
            Sorting Method: {sortingMethod}
          </p>
          <p className="text-lg text-blue-700 shadow hover:text-blue-900 transition-colors duration-300">
            Theoretical time complexity of Heap Sort is O(n log n) for all
            cases.
          </p>
        </div>
      )}
    </div>
  );
};

export default HeapSort;
