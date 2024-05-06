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
  BinarySearch,
  LinearSearch,
} from "../Algorithms/Array/ImpExport";
import {
  BellmanFordAlgorithm,
  BreadthFirstSearch,
  DepthFirstSearch,
  DijkstrasAlgorithm,
  FloydWarshallAlgorithm,
  KruskalsAlgorithm,
  PrimsAlgorithm,
  StronglyConnectedComponents,
  TopologicalSorting,
} from "../Algorithms/Graph/ImportExportGraph";

import {
  InsertionAtBeginning,
  InsertionAtEnd,
  DeletionByPosition,
  DeletionByValue,
  DetectLoop,
  RemoveLoop,
  Reversal,
} from "../Algorithms/Linked List/ImportExportLinklist";

import { Dequeue, Enqueue, Peek } from "../Algorithms/Queuee/ImportExportQueue";

const useAlgorithm = (algorithm, data, target) => {
  switch (algorithm) {
    case "Bubble Sort":
      return <BubbleSortVisualizer data={data} />;
    case "Demo":
      return <Demo data={data} />;
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
    case "Insertion at beginning":
      return <InsertionAtBeginning data={data} target={target} />;
    case "Insertion at end":
      return <InsertionAtEnd data={data} target={target} />;
    case "Dequeue":
      return <Dequeue data={data} />;
    case "Enqueue":
      return <Enqueue data={data} />;
    case "Peek":
      return <Peek data={data} />;
    case "Deletion by position":
      return <DeletionByPosition data={data} target={target} />;
    case "Deletion by value":
      return <DeletionByValue data={data} target={target} />;
    case "Detect Loop":
      return <DetectLoop data={data} />;

    default:
      return null;
  }
};

export default useAlgorithm;
