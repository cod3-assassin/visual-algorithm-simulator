const LinkedListInput = ({
  input,
  handleInputChange,
  target,
  handleTargetChange,
  algorithm,
}) => {
  // Function to determine if the position input should be shown based on the algorithm
  const shouldShowPositionInput =
    algorithm === "Deletion by position" || algorithm === "Deletion by value";

  return (
    <div>
      <p className="block text-lg font-semibold mb-2">Linked List Input</p>
      {/* Render input field for linked list array */}
      <input
        id="input-linkedlist"
        type="text"
        value={input}
        onChange={handleInputChange}
        className="form-input block w-full p-3 rounded bg-gray-700"
        placeholder="Enter linked list array..."
      />
      {/* Render input field for position if required by the algorithm */}
      {shouldShowPositionInput && (
        <div className="mt-4">
          <p className="block text-lg font-semibold mb-2">Position</p>
          <input
            id="input-position"
            type="text"
            value={target}
            onChange={handleTargetChange}
            className="form-input block w-full p-3 rounded bg-gray-700 placeholder-gray-300"
            placeholder="Enter position..."
          />
        </div>
      )}
    </div>
  );
};

export default LinkedListInput;
