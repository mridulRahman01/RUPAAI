import React, { useState, useEffect } from "react";
import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function AuthModal({ isOpen, closeModal, isSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Only for Sign Up
  const [error, setError] = useState("");

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-lg">
      <div className="relative bg-green-300 p-8 rounded-lg w-[400px] shadow-lg z-50">
        <h2 className="text-2xl font-bold text-center mb-2">
          WELCOME TO RUPAAI
        </h2>
        <p className="text-center text-sm text-gray-700 mb-4">
          {isSignUp
            ? "Sign up to get a better experience"
            : "Sign in to get a better experience"}
        </p>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Confirm Password Only for Sign Up */}
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm password"
              className="p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button className="bg-white text-green-700 p-2 rounded-md border border-green-700 hover:bg-green-600 hover:text-white transition">
            {isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        {/* OR Separator */}
        <div className="relative my-4">
          <div className="border-t border-gray-300"></div>
          <p className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-green-300 px-2">
            or continue with
          </p>
        </div>

        {/* Google Login Only */}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="bg-white p-3 rounded-full shadow-md flex items-center justify-center transition-transform transform hover:scale-110 cursor-pointer w-12 h-12"
          >
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded-md hover:bg-red-600"
        >
          X
        </button>
      </div>
    </div>
  );
}
