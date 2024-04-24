import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const RadixSort = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [distributions, setDistributions] = useState(0); // Changed state name
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0) {
      const startTime = performance.now();
      radixSort([...data]).then(() => {
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

  const radixSort = async (array) => {
    let localDistributions = 0; // Changed variable name
    const stepsCopy = [];

    const getMax = () => {
      let max = 0;
      for (let num of array) {
        if (num > max) {
          max = num;
        }
      }
      return max;
    };

    const countSort = async (arr, exp) => {
      let output = new Array(arr.length).fill(0);
      let count = new Array(10).fill(0);
      let buckets = Array.from({ length: 10 }, () => []);

      // Distributing elements into buckets based on their digits
      for (let num of arr) {
        let digit = Math.floor(num / exp) % 10;
        buckets[digit].push(num);
      }

      // Flattening the buckets and updating the output array
      let index = 0;
      for (let bucket of buckets) {
        for (let num of bucket) {
          output[index++] = num;
          // Update step for visualization
          stepsCopy.push({
            type: "distribution",
            indices: [index - 1],
            array: [...output],
            step: stepsCopy.length + 1,
          });
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }

      // Copying sorted elements back to the original array
      for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
      }
    };

    const max = getMax();
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countSort(array, exp);
      localDistributions++; // Increment distribution count
    }

    stepsCopy.push({
      type: "sorted",
      array: [...array],
      step: stepsCopy.length + 1,
      indices: Array.from({ length: array.length }, (_, i) => i),
    });

    setSteps(stepsCopy);
    setDistributions(localDistributions); // Set distribution count
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
                  step.type === "distribution"
                    ? "text-blue-500"
                    : step.type === "sorted"
                    ? "text-green-400 shadow-lg"
                    : "text-red-500"
                }`}
              >
                {step.type === "distribution"
                  ? "Bucket Distribution"
                  : step.type === "sorted"
                  ? "Sorted Array"
                  : "Comparison"}
              </span>
            </div>
            <div className="flex justify-center flex-wrap">
              {step.array.map((value, index) => (
                <div
                  ref={(el) => (elementRefs.current[index] = el)}
                  key={index}
                  className={`animated-element border p-2 ${
                    step.indices.includes(index)
                      ? step.type === "sorted"
                        ? "bg-green-800 hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
                        : step.type === "distribution"
                        ? "bg-blue-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
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
            Total distributions: {distributions} {/* Updated label */}
          </p>
          <p className="text-lg text-blue-700 shadow hover:text-blue-900 transition-colors duration-300">
            Theoretical time complexity of Radix Sort is O(nk) for all cases,
            where n is the number of elements and k is the number of digits in
            the largest number.
          </p>
        </div>
      )}
    </div>
  );
};

export default RadixSort;
