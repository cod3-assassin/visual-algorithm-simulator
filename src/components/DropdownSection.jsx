import React, { useState } from "react";
import { CodeIcon, ChevronDownIcon } from "@heroicons/react/solid";

const DropdownSection = ({
  category,
  algorithm,
  isOpenCategory,
  isOpenAlgorithm,
  toggleDropdownCategory,
  toggleDropdownAlgorithm,
  handleCategoryChange,
  handleAlgorithmChange,
  categories,
  categoryRef,
  algorithmRef,
}) => {
  const [startIdxCategory, setStartIdxCategory] = useState(0);
  const [startIdxAlgorithm, setStartIdxAlgorithm] = useState(0);

  const handleCategoryScroll = (event) => {
    const direction = event.deltaY > 0 ? "down" : "up";
    let newIdx = startIdxCategory;
    if (direction === "up") {
      newIdx = Math.max(0, startIdxCategory - 1);
    } else {
      newIdx = Math.min(
        Object.keys(categories).length - 3,
        startIdxCategory + 1
      );
    }
    setStartIdxCategory(newIdx);
  };

  const handleAlgorithmScroll = (event) => {
    const direction = event.deltaY > 0 ? "down" : "up";
    let newIdx = startIdxAlgorithm;
    const totalAlgorithms = categories[category]?.length || 0;

    if (direction === "up") {
      newIdx = Math.max(0, startIdxAlgorithm - 1);
    } else {
      newIdx = Math.min(totalAlgorithms - 3, startIdxAlgorithm + 1);
    }

    setStartIdxAlgorithm(newIdx);
  };

  return (
    <div className="relative md:col-span-9 bg-gray-800 p-7 rounded-lg shadow-lg flex flex-col w-full">
      <div className="mb-4 flex-grow">
        <p className="block text-lg font-semibold mb-2">
          <CodeIcon className="h-6 w-6 mr-2" /> Choose Data Structures
        </p>
        <div ref={categoryRef} className="relative">
          <button
            onClick={toggleDropdownCategory}
            className="flex justify-between items-center w-full p-3 rounded bg-gray-700"
          >
            {category || "Select Category"}
            <ChevronDownIcon className="h-5 w-5" />
          </button>
          {isOpenCategory && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 z-50 overflow-y-auto"
              onWheel={handleCategoryScroll}
            >
              {Object.keys(categories)
                .slice(startIdxCategory, startIdxCategory + 3)
                .map((key) => (
                  <button
                    key={key}
                    onClick={() => handleCategoryChange(key)}
                    className="block w-full text-left p-3 text-white hover:bg-gray-700 transition-all duration-300"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
      <div ref={algorithmRef} className="relative">
        <p className="block text-lg font-semibold mb-2">
          <CodeIcon className="h-6 w-6 mr-2" /> Choose Algorithm
        </p>
        <button
          onClick={toggleDropdownAlgorithm}
          className="flex justify-between items-center w-full p-3 rounded bg-gray-700"
        >
          {algorithm || "Select Algorithm"}
          <ChevronDownIcon className="h-5 w-5" />
        </button>
        {isOpenAlgorithm && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 z-50 overflow-y-auto"
            onWheel={handleAlgorithmScroll}
          >
            {categories[category]
              ?.slice(startIdxAlgorithm, startIdxAlgorithm + 3)
              .map((algo) => (
                <button
                  key={algo}
                  onClick={() => handleAlgorithmChange(algo)}
                  className="block w-full text-left p-3 text-white hover:bg-gray-700 transition-all duration-300"
                >
                  {algo}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSection;
