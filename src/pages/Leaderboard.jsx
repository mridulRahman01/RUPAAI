import React, { useState } from "react";

// Sample leaderboard data (initial state)
const initialLeaderboard = [
  { id: 1, name: "Alice", points: 200 },
  { id: 2, name: "Timmy", points: 150 },
  { id: 3, name: "Mary", points: 100 },
  { id: 4, name: "Carol", points: 85 },
  { id: 5, name: "Maria", points: 70 },
  { id: 6, name: "John", points: 60 },
  { id: 7, name: "Emma", points: 50 },
  { id: 8, name: "Sophia", points: 40 },
  { id: 9, name: "Liam", points: 30 },
  { id: 10, name: "Oliver", points: 20 },
];

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Filter users based on search term
  const filteredUsers = leaderboard.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredUsers.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  // Function to handle pagination click
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-green-500 text-white p-10">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-4">🏆 Leaderboard 🏆</h1>

      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search players..."
          className="p-3 rounded-lg text-black w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Leaderboard Table */}
      <div className="mt-8 max-w-4xl mx-auto">
        <table className="w-full bg-orange-300 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-orange-400 text-left">
              <th className="p-3">Rank</th>
              <th className="p-3">Name</th>
              <th className="p-3">Points</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length > 0 ? (
              currentEntries.map((user, index) => (
                <tr key={user.id} className="hover:bg-orange-200 transition">
                  <td className="p-3">{indexOfFirstEntry + index + 1}</td>
                  <td className="p-3 font-semibold">{user.name}</td>
                  <td className="p-3 font-bold">{user.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-800">
                  No players found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="px-3 py-1 bg-white text-green-700 rounded-md shadow-md hover:bg-gray-200"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-md shadow-md ${
              currentPage === i + 1
                ? "bg-green-700 text-white"
                : "bg-white text-green-700"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 bg-white text-green-700 rounded-md shadow-md hover:bg-gray-200"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
