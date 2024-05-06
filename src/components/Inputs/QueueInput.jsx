import React from "react";

const QueueInput = ({ input, handleInputChange }) => {
  return (
    <div>
      <p className="block text-lg font-semibold mb-2">Queue Input</p>
      <input
        id="input-queue"
        type="text"
        value={input}
        onChange={handleInputChange}
        className="form-input block w-full p-3 rounded bg-gray-700 placeholder-gray-300"
        placeholder="Enter queue values..."
      />
    </div>
  );
};

export default QueueInput;
