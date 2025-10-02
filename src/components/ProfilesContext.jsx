import React, { createContext, useState } from 'react';

const ProfilesContext = createContext();
export default ProfilesContext;

export const ProfilesProvider = ({ children, initialProfiles = [] }) => {
  const [profiles, setProfiles] = useState(initialProfiles);

  const addProfile = (profile) => {
    setProfiles(prev => [...prev, profile]);
  };

  return (
    <ProfilesContext.Provider value={{ profiles, addProfile }}>
      {children}
    </ProfilesContext.Provider>
  );
};
