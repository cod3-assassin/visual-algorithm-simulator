import React, { useState, useEffect, useRef } from "react";

const Reversal = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0) {
      const startTime = performance.now();
      reverseArray([...data]).then(() => {
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
          currentStep.type === "swap" ? "scale(1.1)" : "scale(1)";
        ref.style.backgroundColor =
          currentStep.type === "swap" ? "red" : "green";
      }
    });
  };

  const reverseArray = async (array) => {
    const stepsCopy = [];

    for (let i = 0; i < Math.floor(array.length / 2); i++) {
      const temp = array[i];
      array[i] = array[array.length - 1 - i];
      array[array.length - 1 - i] = temp;

      const newStep = {
        type: "swap",
        indices: [i, array.length - 1 - i],
        array: [...array],
        step: stepsCopy.length + 1,
        action: `Swapping elements at indices ${i} and ${array.length - 1 - i}`,
      };

      stepsCopy.push(newStep);

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setSteps(stepsCopy);
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-700 shadow-lg">
          Reversal Algorithm Visualization
        </h2>
        {timeTaken && (
          <p className="text-lg text-green-600">
            Time taken for reversal: {timeTaken} milliseconds
          </p>
        )}
      </div>
      <div className="flex flex-col items-center">
        {steps.map((step, index) => (
          <div key={index} className="my-4">
            <h3 className="text-lg font-bold mb-2">Step {step.step}</h3>
            <p className="text-blue-700 mb-1">{step.action}</p>
            <div className="flex justify-center">
              {step.array.map((value, idx) => (
                <div
                  ref={(el) => (elementRefs.current[idx] = el)}
                  key={idx}
                  className={`border p-2 mr-2 animated-element ${
                    step.indices.includes(idx)
                      ? "bg-red-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                      : "bg-green-500 hover:bg-green-600 transition-colors duration-300"
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
    </div>
  );
};

export default Reversal;
