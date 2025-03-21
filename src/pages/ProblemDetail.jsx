import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const problemsData = {
  1: {
    title: "Build a Calculator",
    description:
      "Create a simple calculator using JavaScript. Implement basic operations like addition, subtraction, multiplication, and division.",
  },
  2: {
    title: "Palindrome Checker",
    description:
      "Write a function that checks if a given string is a palindrome (reads the same backward and forward).",
  },
  3: {
    title: "FizzBuzz Problem",
    description:
      "Write a program that prints numbers from 1 to 100. For multiples of 3, print 'Fizz'. For multiples of 5, print 'Buzz'. For multiples of both, print 'FizzBuzz'.",
  },
  4: {
    title: "To-Do List App",
    description:
      "Build a simple to-do list app where users can add, edit, and delete tasks. Use local storage to persist data.",
  },
};

export default function ProblemDetail() {
  const { id } = useParams();
  const problem = problemsData[id];

  const [code, setCode] = useState("");

  const handleSubmit = () => {
    alert("Code submitted successfully!");
  };

  if (!problem)
    return <div className="text-center text-white">Problem not found.</div>;

  return (
    <div className="min-h-screen bg-green-500 text-white p-10">
      <h1 className="text-4xl font-bold text-center">{problem.title}</h1>
      <p className="text-center mt-4">{problem.description}</p>

      {/* Image Placeholder */}
      <div className="w-3/4 mx-auto bg-gray-200 text-gray-500 rounded-lg p-10 text-center mt-6">
        Problem Image Placeholder
      </div>

      {/* Code Editor */}
      <div className="mt-8 mx-auto w-3/4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          className="w-full h-40 p-4 text-black rounded-lg"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-white text-green-700 px-6 py-2 rounded-lg mt-4 font-semibold hover:bg-green-600 hover:text-white transition"
        >
          Submit Code
        </button>
      </div>
    </div>
  );
}
