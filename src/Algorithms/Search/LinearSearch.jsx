import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const LinearSearch = ({ data, target }) => {
  const [steps, setSteps] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const elementRefs = useRef([]);
  const [foundIndex, setFoundIndex] = useState(-1);

  useEffect(() => {
    if (data?.length > 0 && target !== undefined && target !== "") {
      const startTime = performance.now();
      linearSearch([...data], parseInt(target));
      const endTime = performance.now();
      setTimeTaken((endTime - startTime).toFixed(2));
    }
  }, [data, target]);

  useEffect(() => {
    if (steps.length > 0) {
      animateElements();
    }
  }, [steps]);

  const linearSearch = (array, target) => {
    const stepsCopy = [];

    for (let i = 0; i < array.length; i++) {
      const currentValue = array[i];
      const found = currentValue === target;
      const action = found ? `Target Found at ${i} index` : "Checking";

      if (found) {
        setFoundIndex(i);
      }

      stepsCopy.push({
        step: i + 1,
        action: action,
        currentIndex: i,
        currentValue: currentValue,
        found: found,
        target: target,
        array: [...array],
      });

      if (found) {
        break;
      }
    }
    setSteps(stepsCopy);
  };

  const animateElements = () => {
    elementRefs.current.forEach((ref, index) => {
      if (ref) {
        const node = d3.select(ref);
        node
          .transition()
          .duration(300)
          .on("start", function () {
            d3.select(this).style("background-color", "orange");
          })
          .on("end", function () {
            d3.select(this)
              .transition()
              .duration(300)
              .style("background-color", index === foundIndex ? "green" : "");
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="array-step mb-8">
            <div className="step-info mb-4">
              <span className="font-bold text-lg">Step {step.step}:</span>
              <span className="italic mx-2 text-blue-500">{step.action}</span>
              {!step.found && (
                <span className="font-bold text-indigo-600">
                  Checking {step.currentValue} against target {step.target}
                </span>
              )}
            </div>
            <div className="flex justify-center flex-wrap">
              {step.array.map((value, index) => (
                <div
                  ref={(el) => (elementRefs.current[index] = el)}
                  key={index}
                  className={`animated-element border p-2 ${
                    index === step.currentIndex
                      ? "bg-yellow-500 hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
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
      {steps.length > 0 && steps[steps.length - 1].found && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-green-700 shadow-lg">
            Search Complete !!
          </h2>
          <p className="text-xl text-orange-500 shadow hover:text-orange-700 transition-colors duration-300">
            Searching completed in {timeTaken} milliseconds.
          </p>
        </div>
      )}
      {steps.length > 0 && !steps[steps.length - 1].found && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-2 text-red-700 shadow-lg">
            Target Not Found!
          </h2>
        </div>
      )}
    </div>
  );
};

export default LinearSearch;
