// pages/clubProfile.js
"use client";

import Profile from "@/components/ui/profile"; // Adjust the import path as necessary

const ClubProfilePage = () => {
  const clubId = "671d12328b073ac138553b50"; // The ID of the club
  const profileType = "club"; // Setting the profile type to 'club'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Club Profile</h1>
      <Profile profileId={clubId} profileType={profileType} />
    </div>
  );
};

export default ClubProfilePage;
