import React, { useState, useEffect } from "react";

const EnqueueVisualizer = ({ data }) => {
  const [enqueueSteps, setEnqueueSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [stack, setStack] = useState([]);

  useEffect(() => {
    const startTime = performance.now();
    if (data.length > 0) {
      const steps = [];
      let queue = [];
      let tempStack = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        queue.push(element); // Element goes into queue
        tempStack.push(element); // Element goes into stack
        const step = {
          enqueuedElement: element,
          remainingQueue: [...queue],
          stackState: [...tempStack],
          action: "Pushed", // Indicate that element is pushed
        };
        steps.push(step);
      }
      const endTime = performance.now();
      setTimeTaken((endTime - startTime).toFixed(2));
      setEnqueueSteps(steps);
      setStack([]);
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enqueue Operation</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {enqueueSteps.map((step, index) => (
          <div key={index} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {index + 1}:</span>
              <span className="italic mx-2">Element {step.action}:</span>
              <span className="font-bold text-indigo-600">
                {step.enqueuedElement}
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
                {step.action === "Pushed" ? (
                  <div className="text-lg font-bold mb-2">Element Pushed</div>
                ) : (
                  <div className="text-lg font-bold mb-2">Element Popped</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {enqueueSteps.length > 0 && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-green-700 shadow-lg">
            Queue Enqueued!
          </h2>
          <p className="text-xl text-orange-500 shadow hover:text-orange-700 transition-colors duration-300">
            Enqueuing completed in {timeTaken} milliseconds.
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

export default EnqueueVisualizer;
