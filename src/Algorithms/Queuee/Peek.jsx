import React, { useState, useEffect } from "react";

const PeekVisualizer = ({ data }) => {
  const [peekSteps, setPeekSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    const startTime = performance.now();
    const steps = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const remainingQueue = [...data]; // Create a copy of the queue
        const peekedElement = remainingQueue.shift(); // Peek the front element
        const step = {
          peekedElement: peekedElement,
          remainingQueue: remainingQueue,
          action: "Peeked",
        };
        steps.push(step);
      }
    }

    const endTime = performance.now();
    setTimeTaken((endTime - startTime).toFixed(2));
    setPeekSteps(steps);
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Peek Operation</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {peekSteps.map((step, index) => (
          <div key={index} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {index + 1}:</span>
              <span className="italic mx-2">Action:</span>
              <span className="font-bold text-indigo-600">{step.action}</span>
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
            </div>
            <div className="step-details mt-4">
              <div className="font-bold">Peeked Element:</div>
              <div className="border p-2 bg-green-700">
                {step.peekedElement}
              </div>
            </div>
          </div>
        ))}
      </div>
      {peekSteps.length > 0 && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-green-700 shadow-lg">
            Queue Peeked!
          </h2>
          <p className="text-xl text-orange-500 shadow hover:text-orange-700 transition-colors duration-300">
            Peek operation completed in {timeTaken} milliseconds.
          </p>
        </div>
      )}
    </div>
  );
};

export default PeekVisualizer;
