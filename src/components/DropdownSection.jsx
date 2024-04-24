import React from "react";
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
  return (
    <div className="relative md:col-span-9 bg-gray-800 p-7 rounded-lg shadow-lg flex flex-col w-full">
      <div className="mb-4 flex-grow">
        <label className="block text-lg font-semibold mb-2">
          <CodeIcon className="h-6 w-6 mr-2" /> Choose Category
        </label>
        <div ref={categoryRef} className="relative">
          <button
            onClick={toggleDropdownCategory}
            className="flex justify-between items-center w-full p-3 rounded bg-gray-700"
          >
            {category || "Select Category"}
            <ChevronDownIcon className="h-5 w-5" />
          </button>
          {isOpenCategory && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 z-50">
              {Object.keys(categories).map((key) => (
                <button
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  className="block w-full text-left p-3 text-white hover:bg-gray-700"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div ref={algorithmRef} className="relative">
        <label className="block text-lg font-semibold mb-2">
          <CodeIcon className="h-6 w-6 mr-2" /> Choose Algorithm
        </label>
        <button
          onClick={toggleDropdownAlgorithm}
          className="flex justify-between items-center w-full p-3 rounded bg-gray-700"
        >
          {algorithm || "Select Algorithm"}
          <ChevronDownIcon className="h-5 w-5" />
        </button>
        {isOpenAlgorithm && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 z-50">
            {categories[category]?.map((algo) => (
              <button
                key={algo}
                onClick={() => handleAlgorithmChange(algo)}
                className="block w-full text-left p-3 text-white hover:bg-gray-700"
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
