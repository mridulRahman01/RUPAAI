import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Open the authentication modal
  const openModal = (signup) => {
    setIsSignUp(signup);
    setIsModalOpen(true);
  };

  return (
    <>
      <nav className="bg-green-700 text-white py-4 px-10 flex items-center justify-between shadow-lg">
        {/* Left - Brand Name */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Rupaai
        </div>

        {/* Center - Navigation Links */}
        <div className="flex space-x-8 text-lg font-semibold">
          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-300 cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/problems"
            className="hover:text-yellow-400 transition duration-300 cursor-pointer"
          >
            Problems
          </Link>
          <Link
            to="/leaderboard"
            className="hover:text-yellow-400 transition duration-300 cursor-pointer"
          >
            Leaderboard
          </Link>
          <Link
            to="/profile"
            className="hover:text-yellow-400 transition duration-300 cursor-pointer"
          >
            Profile
          </Link>
        </div>

        {/* Right - Auth Buttons */}
        <div className="flex space-x-4">
          {user ? (
            <button
              onClick={() => signOut(auth)}
              className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => openModal(false)}
                className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
              >
                Sign In
              </button>
              <button
                onClick={() => openModal(true)}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        isSignUp={isSignUp}
      />
    </>
  );
}
