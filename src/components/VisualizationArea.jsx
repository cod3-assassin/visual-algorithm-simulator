import React from "react";
import BubbleSortVisualizer from "../Algorithms/Sorting/BubbleSort";
import MergeSortVisualizer from "../Algorithms/Sorting/MergeSort";
import InsertionSort from "../Algorithms/Sorting/InsertionSort";
import QuickSort from "../Algorithms/Sorting/QuickSort";
import HeapSort from "../Algorithms/Sorting/HeapSort";
import SelectionSort from "../Algorithms/Sorting/SelectionSort";
import RadixSort from "../Algorithms/Sorting/RadixSort";
import BucketSort from "../Algorithms/Sorting/BucketSort";
import BinarySearch from "../Algorithms/Search/BinarySearch";

const VisualizationArea = ({ startVisualization, algorithm, data, target }) => {
  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-center w-full overflow-auto"
      style={{ minHeight: "60vh" }}
    >
      {startVisualization && (
        <>
          {algorithm === "Bubble Sort" && <BubbleSortVisualizer data={data} />}
          {algorithm === "Merge Sort" && <MergeSortVisualizer data={data} />}
          {algorithm === "Insertion Sort" && <InsertionSort data={data} />}
          {algorithm === "Quick Sort" && <QuickSort data={data} />}
          {algorithm === "Heap Sort" && <HeapSort data={data} />}
          {algorithm === "Selection Sort" && <SelectionSort data={data} />}
          {algorithm === "Radix Sort" && <RadixSort data={data} />}
          {algorithm === "Bucket Sort" && <BucketSort data={data} />}
          {algorithm === "Binary Search" && (
            <BinarySearch data={data} target={target} />
          )}
        </>
      )}
      {!startVisualization && (
        <span className="text-xl text-white">
          Select an algorithm to visualize its sorting process.
        </span>
      )}
    </div>
  );
};

export default VisualizationArea;
