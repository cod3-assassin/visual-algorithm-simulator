import React from "react";
import { PlayIcon, RefreshIcon } from "@heroicons/react/solid";

const ControlButtons = ({ handleStart, handleReset }) => {
  return (
    <div className="flex space-x-4 justify-center">
      <button
        onClick={handleStart}
        className="bg-green-500 hover:bg-green-600 flex items-center space-x-2 text-white font-bold py-2 px-6 rounded-lg"
      >
        <PlayIcon className="h-6 w-6" />
        <span>Start</span>
      </button>
      <button
        onClick={handleReset}
        className="bg-red-500 hover:bg-red-600 flex items-center space-x-2 text-white font-bold py-2 px-6 rounded-lg"
      >
        <RefreshIcon className="h-6 w-6" />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default ControlButtons;
