import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const defaultProfile = {
    name: "",
    email: "",
    phone: "",
    institute: "",
    totalSolved: 0,
    totalUnsolved: 0,
    profileImage: null,
  };

  const [profileData, setProfileData] = useState(defaultProfile);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileSaved, setProfileSaved] = useState(
    localStorage.getItem("profileData") !== null
  );

  // Handle input changes
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profileImage: reader.result });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile save
  const handleSaveProfile = () => {
    const { name, email, phone, institute } = profileData;

    if (!name || !email || !phone || !institute) {
      toast.error("Please fill out all required fields!", {
        position: "top-right",
      });
      return;
    }

    // Save profile to local storage
    localStorage.setItem("profileData", JSON.stringify(profileData));

    // Show success notification
    toast.success("Profile saved successfully!", { position: "top-right" });

    // Clear form after saving
    setProfileData(defaultProfile);
    setPreviewImage(null);
    setProfileSaved(true);
  };

  return (
    <div className="min-h-screen bg-green-500 p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-6">Profile</h1>

      {/* If a profile is already saved, show a message */}
      {profileSaved && (
        <div className="text-white mb-6 bg-orange-300 p-4 rounded-lg">
          Profile already saved! You can update it below.
        </div>
      )}

      {/* Profile Image Upload */}
      <label className="relative cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-gray-200 flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Upload Image</span>
          )}
        </div>
      </label>

      {/* Profile Fields */}
      <div className="w-full max-w-lg mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profileData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-orange-400 bg-orange-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={profileData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-orange-400 bg-orange-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={profileData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-orange-400 bg-orange-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="institute"
          placeholder="Institute"
          value={profileData.institute}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-orange-400 bg-orange-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="text-white block mb-1">Total Solved:</label>
            <input
              type="number"
              name="totalSolved"
              value={profileData.totalSolved}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-orange-400 bg-orange-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="w-1/2">
            <label className="text-white block mb-1">Total Unsolved:</label>
            <input
              type="number"
              name="totalUnsolved"
              value={profileData.totalUnsolved}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-orange-400 bg-orange-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveProfile}
        className="mt-6 px-6 py-3 bg-white text-green-700 font-bold rounded-lg shadow-lg hover:bg-green-600 hover:text-white transition"
      >
        Save Profile
      </button>

      {/* React Toastify for alerts */}
      <ToastContainer />
    </div>
  );
}
