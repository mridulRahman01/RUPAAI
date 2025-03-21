import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample problem list
const problems = [
  { id: 1, title: "Build a Calculator", creator: "Alice" },
  { id: 2, title: "Palindrome Checker", creator: "Bob" },
  { id: 3, title: "FizzBuzz Problem", creator: "Charlie" },
  { id: 4, title: "To-Do List App", creator: "David" },
];

export default function Problems({ updateLeaderboard }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter problems based on search term
  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-500 text-white p-10">
      <h1 className="text-4xl font-bold text-center">🧩 Problems 🧩</h1>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search problems..."
          className="p-2 rounded-lg text-black w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Problems Table */}
      <div className="mt-8 max-w-4xl mx-auto">
        <table className="w-full bg-orange-300 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-orange-400 text-left">
              <th className="p-3">SL No.</th>
              <th className="p-3">Title</th>
              <th className="p-3">Created By</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, index) => (
                <tr
                  key={problem.id}
                  className="hover:bg-orange-200 transition cursor-pointer"
                  onClick={() => navigate(`/problems/${problem.id}`)}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{problem.title}</td>
                  <td className="p-3">{problem.creator}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-800">
                  No problems found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
