import React from "react";
import {
  BubbleSortVisualizer,
  BucketSort,
  HeapSort,
  InsertionSort,
  MergeSortVisualizer,
  SelectionSort,
  RadixSort,
  QuickSort,
} from "../Algorithms/Sorting/ImpExpSortingAlgo";

import {
  BinarySearch,
  LinearSearch,
} from "../Algorithms/Search/ImpExpSearchAlgo";

const useAlgorithm = (algorithm, data, target) => {
  switch (algorithm) {
    case "Bubble Sort":
      return <BubbleSortVisualizer data={data} />;
    case "Merge Sort":
      return <MergeSortVisualizer data={data} />;
    case "Insertion Sort":
      return <InsertionSort data={data} />;
    case "Quick Sort":
      return <QuickSort data={data} />;
    case "Heap Sort":
      return <HeapSort data={data} />;
    case "Selection Sort":
      return <SelectionSort data={data} />;
    case "Radix Sort":
      return <RadixSort data={data} />;
    case "Bucket Sort":
      return <BucketSort data={data} />;
    case "Binary Search":
      return <BinarySearch data={data} target={target} />;
    case "Linear Search":
      return <LinearSearch data={data} target={target} />;
    default:
      return null;
  }
};

export default useAlgorithm;
