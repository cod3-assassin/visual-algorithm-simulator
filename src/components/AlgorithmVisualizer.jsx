import React, { useState, useRef, useEffect } from "react";
import InputSection from "./InputSection";
import DropdownSection from "./DropdownSection";
import ControlButtons from "./ControlButtons";
import VisualizationArea from "./VisualizationArea";
import AdditionalInfoSection from "./AdditionalInfoSection";
import Header from "./Header";
import Footer from "./Footer";

const AlgorithmVisualizer = () => {
  const [input, setInput] = useState("");
  const [target, setTarget] = useState("");
  const [category, setCategory] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenAlgorithm, setIsOpenAlgorithm] = useState(false);
  const [startVisualization, setStartVisualization] = useState(false);
  const [data, setData] = useState([]);

  const categories = {
    Array: [
      "Bubble Sort",
      "Merge Sort",
      "Quick Sort",
      "Insertion Sort",
      "Heap Sort",
      "Selection Sort",
      "Radix Sort",
      "Bucket Sort",
      "Binary Search",
      "Linear Search",
    ],

    Graph: [
      "Dijkstra's Algorithm",
      "Breadth-First Search",
      "Depth-First Search",
      "Bellman-Ford Algorithm",
      "Floyd-Warshall Algorithm",
      "Kruskal's Algorithm",
      "Prim's Algorithm",
      "Topological Sorting",
      "Strongly Connected Components",
    ],
    "Linked List": [
      "Insertion at beginning",
      "Insertion at end",
      "Deletion by value",
      "Deletion by position",
      "Reversal",
      "Detect Loop",
      "Remove Loop",
    ],
    Queue: ["Enqueue", "Dequeue", "Peek", "Empty check", "Size check"],
    Trees: [
      "BST Insertion",
      "BST Deletion",
      "Depth-First Traversals",
      "Breadth-First Traversal",
      "Finding height of binary tree",
      "Check if binary tree is balanced",
      "Lowest Common Ancestor",
    ],
  };

  const categoryRef = useRef(null);
  const algorithmRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsOpenCategory(false);
      }
      if (
        algorithmRef.current &&
        !algorithmRef.current.contains(event.target)
      ) {
        setIsOpenAlgorithm(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (event) => setInput(event.target.value);

  const handleCategoryChange = (category) => {
    setCategory(category);
    setAlgorithm("");
    setIsOpenCategory(false);
    setIsOpenAlgorithm(false);
  };

  const handleAlgorithmChange = (algorithm) => {
    setAlgorithm(algorithm);
    setIsOpenAlgorithm(false);
  };

  const handleStart = () => {
    if (algorithm && input) {
      setData(input.split(",").map(Number));
      setStartVisualization(true);
    }
  };

  const handleReset = () => {
    setData([]);
    setStartVisualization(false);
  };
  const handleTargetChange = (event) => {
    if (!startVisualization || event.target.value === "") {
      setTarget(event.target.value);
    }
    console.log("Target :", target);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-white flex items-center justify-center px-4 py-4 w-full">
      <div className="space-y-6 w-full bg-white/10 backdrop-blur-md shadow-xl rounded-lg p-6">
        <Header />
        {/* <h1 className="text-4xl font-bold text-center">Algorithm Visualizer</h1> */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:items-stretch">
          <div className="flex flex-col w-full md:w-1/3">
            <InputSection
              input={input}
              target={target}
              handleInputChange={handleInputChange}
              handleTargetChange={handleTargetChange}
              algorithm={algorithm} // Pass the algorithm prop here
              category={category}
              className="flex-1 p-4 bg-gray-800 rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <DropdownSection
              category={category}
              algorithm={algorithm}
              isOpenCategory={isOpenCategory}
              isOpenAlgorithm={isOpenAlgorithm}
              toggleDropdownCategory={() => setIsOpenCategory(!isOpenCategory)}
              toggleDropdownAlgorithm={() =>
                setIsOpenAlgorithm(!isOpenAlgorithm)
              }
              handleCategoryChange={handleCategoryChange}
              handleAlgorithmChange={handleAlgorithmChange}
              categories={categories}
              categoryRef={categoryRef}
              algorithmRef={algorithmRef}
              className="flex-1 p-7 bg-gray-800 rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <AdditionalInfoSection className="flex-1 p-4 bg-white/10 rounded-lg shadow-inner" />
          </div>
        </div>
        <ControlButtons handleStart={handleStart} handleReset={handleReset} />
        <VisualizationArea
          startVisualization={startVisualization}
          algorithm={algorithm}
          data={data}
          target={target}
        />
        <Footer />
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
