import React, { useState, useEffect, useRef } from "react";

const LoopDetectionVisualization = ({ data }) => {
  const [steps, setSteps] = useState([]);
  const elementRefs = useRef([]);

  useEffect(() => {
    if (data.length > 0) {
      detectLoop([...data]);
    }
  }, [data]);

  const detectLoop = (array) => {
    const stepsCopy = [];
    let slow = 0;
    let fast = 0;
    let loopDetected = false;
    let loopStartIndex = -1;

    while (fast < array.length && fast < array.length - 1) {
      stepsCopy.push({
        array: [...array],
        step: stepsCopy.length + 1,
        description: `Moving slow pointer to index ${slow} and fast pointer to index ${fast}`,
        slowIndex: slow,
        fastIndex: fast,
      });

      slow = array[slow];
      fast = array[array[fast]];

      if (slow === fast) {
        loopDetected = true;
        break;
      }
    }

    if (loopDetected) {
      slow = 0;
      while (slow !== fast) {
        stepsCopy.push({
          array: [...array],
          step: stepsCopy.length + 1,
          description: `Loop starts at index ${fast}`,
          isLoopStart: true,
          loopStartIndex: fast,
        });
        slow = array[slow];
        fast = array[fast];
      }
    } else {
      stepsCopy.push({
        array: [...array],
        step: stepsCopy.length + 1,
        description: "No loop detected",
      });
    }

    setSteps(stepsCopy);
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              <span className="italic mx-2">{step.description}</span>
            </div>
            <div className="flex justify-center flex-wrap">
              {step.array.map((value, index) => (
                <div
                  ref={(el) => (elementRefs.current[index] = el)}
                  key={index}
                  className={`animated-element border p-2 ${
                    step.isLoopStart && index === step.loopStartIndex
                      ? "bg-red-500 text-white hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                      : "bg-blue-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
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

export default LoopDetectionVisualization;
