// components/ui/profile.js
"use client";

import React, { useEffect, useState } from "react";

export default function Profile({ profileId, profileType }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      let url;

      // Set URL based on profile type
      switch (profileType) {
        case "student":
          url = `${process.env.NEXT_PUBLIC_API_URL}/students/${profileId}`;
          break;
        case "college":
          url = `${process.env.NEXT_PUBLIC_API_URL}/colleges/${profileId}`;
          break;
        case "club":
          url = `${process.env.NEXT_PUBLIC_API_URL}/clubs/${profileId}`;
          console.log(url);
          break;
        default:
          setError("Invalid profile type");
          return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId, profileType]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Profile Photo */}
      {profileData.profilePhotoUrl && (
        <img
          src={profileData.profilePhotoUrl}
          alt={profileData.name}
          className="w-full h-32 object-cover rounded-lg"
        />
      )}

      {/* Profile Details */}
      <h2 className="text-2xl font-bold mt-4">{profileData.name}</h2>
      {profileType === "student" && (
        <p className="text-sm text-gray-500">
          <strong>Department:</strong> {profileData.department}
        </p>
      )}
      {profileType === "college" && (
        <p className="text-sm text-gray-500">
          <strong>Location:</strong> {profileData.location}
        </p>
      )}
      {profileType === "club" && (
        <p className="text-sm text-gray-500">
          <strong>Domain:</strong> {profileData.domain}
        </p>
      )}

      <p className="text-sm text-gray-600 mt-2">{profileData.about}</p>

      {/* Additional Info */}
      {profileType === "student" && profileData.interests && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Interests:</strong> {profileData.interests.join(", ")}
          </p>
        </div>
      )}
      {profileType === "club" && (
        <p className="text-sm text-gray-500">
          <strong>Founded Year:</strong> {profileData.foundedYear}
        </p>
      )}
    </div>
  );
}
