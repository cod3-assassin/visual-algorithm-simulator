import React, { useState, useEffect } from "react";

const DequeueVisualizer = ({ data }) => {
  const [dequeuedSteps, setDequeuedSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [comparisons, setComparisons] = useState(0);
  const [stack, setStack] = useState([]);

  useEffect(() => {
    const startTime = performance.now();
    if (data.length > 0) {
      const steps = [];
      let queue = [...data];
      let tempStack = [];
      while (queue.length > 0) {
        const dequeuedElement = queue.shift();
        tempStack.push(dequeuedElement); // Element goes into stack
        const step = {
          dequeuedElement,
          remainingQueue: [...queue],
          stackState: [...tempStack],
          action: "Popped", // Indicate that element is popped
        };
        steps.push(step);
      }
      const endTime = performance.now();
      setTimeTaken((endTime - startTime).toFixed(2));
      setDequeuedSteps(steps);
      setComparisons(data.length - 1);
      setStack([]);
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dequeue Operation</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {dequeuedSteps.map((step, index) => (
          <div key={index} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {index + 1}:</span>
              <span className="italic mx-2">Dequeuing</span>
              <span className="font-bold text-indigo-600">
                {step.dequeuedElement}
              </span>
            </div>
            <div className="flex justify-center flex-wrap">
              <div className="flex flex-col mr-8">
                <div className="text-lg font-bold mb-2">Queue</div>
                {step.remainingQueue.map((value, index) => (
                  <div
                    key={index}
                    className="border p-2 animated-element bg-blue-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                  >
                    {value}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-bold mb-2">Stack</div>
                {step.stackState.map((value, index) => (
                  <div
                    key={index}
                    className={`border p-2 animated-element bg-green-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300`}
                  >
                    {value}
                  </div>
                ))}
                {step.action === "Popped" ? (
                  <div className="text-lg font-bold mb-2">Element Popped</div>
                ) : (
                  <div className="text-lg font-bold mb-2">Element Pushed</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {dequeuedSteps.length > 0 && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-green-700">
            Queue Dequeued!
          </h2>
          <p className="text-xl text-orange-500">
            Dequeuing completed in {timeTaken} milliseconds.
          </p>
          <p className="text-lg text-white-800">
            Total comparisons: {comparisons}
          </p>
          <p className="text-lg text-blue-700">
            Note: The theoretical time complexity of the Dequeue operation is
            O(1).
          </p>
          {/* Empty stack layout */}
          <div className="text-lg font-bold mb-2">Empty Stack</div>
          <div className="flex justify-center">
            <div className="border p-2 bg-gray-300">-</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DequeueVisualizer;
