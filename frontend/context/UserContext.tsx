"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "@/actions/auth";
import eventBus from "@/lib/events";

interface User {
  pk: string | number;
  email: string;
  first_name: string;
  last_name: string;
  type: string;
}

interface UserProviderProps {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserProviderProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getSession();
        setUser(data?.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const handleSessionUpdate = () => {
      console.log("Updating session");
      fetchUser();
    };

    eventBus.on("sessionUpdated", handleSessionUpdate);

    return () => {
      eventBus.off("sessionUpdated", handleSessionUpdate); //remove listener
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
