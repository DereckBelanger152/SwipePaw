import React, { createContext, useState, useEffect } from "react";
import { UserPreferences } from "@/types";
import { mockUser } from "@/data/mockData";

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: UserPreferences) => void;
}

export const UserPreferencesContext = createContext<UserPreferencesContextType>(
  {
    preferences: mockUser.preferences,
    updatePreferences: () => {},
  }
);

export function UserPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] = useState<UserPreferences>(
    mockUser.preferences
  );

  const updatePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
