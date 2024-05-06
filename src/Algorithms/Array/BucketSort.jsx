import React, { useState, useEffect, useRef } from "react";

const BucketSort = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [distributions, setDistributions] = useState(0);
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0) {
      const startTime = performance.now();
      bucketSort([...data]).then(() => {
        const endTime = performance.now();
        setTimeTaken((endTime - startTime).toFixed(2));
      });
    }
  }, [data]);

  const bucketSort = async (array) => {
    let localDistributions = 0;
    const stepsCopy = [];

    const max = Math.max(...array);
    const min = Math.min(...array);
    const bucketSize = 5; // Adjust this value as needed

    const bucketSortHelper = async (arr, bucketCount) => {
      const buckets = Array.from({ length: bucketCount }, () => []);
      for (let num of arr) {
        let bucketIndex = Math.floor((num - min) / bucketSize);
        buckets[bucketIndex].push(num);
      }
      let index = 0;
      for (let bucket of buckets) {
        bucket.sort((a, b) => a - b);
        for (let num of bucket) {
          arr[index++] = num;
          stepsCopy.push({
            type: "distribution",
            description: `Distributing ${num} to bucket ${Math.floor(
              (num - min) / bucketSize
            )}`,
            array: [...arr],
            step: stepsCopy.length + 1,
          });
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
    };

    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    await bucketSortHelper(array, bucketCount);
    localDistributions++; // Increment distribution count

    stepsCopy.push({
      type: "sorted",
      array: [...array],
      step: stepsCopy.length + 1,
      indices: Array.from({ length: array.length }, (_, i) => i),
    });

    setSteps(stepsCopy);
    setDistributions(localDistributions);
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
                  ? step.description
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
                    step.type === "sorted" &&
                    step.indices &&
                    step.indices.includes(index)
                      ? "bg-green-800 hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
                      : step.type === "distribution"
                      ? "bg-blue-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
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
            Total distributions: {distributions}
          </p>
          <p className="text-lg text-blue-700 shadow hover:text-blue-900 transition-colors duration-300">
            Theoretical time complexity of Bucket Sort is O(n + k), where n is
            the number of elements and k is the number of buckets.
          </p>
        </div>
      )}
    </div>
  );
};

export default BucketSort;
