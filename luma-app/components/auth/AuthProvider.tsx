import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase.config";

type Props = {
  children?: React.ReactNode;
};

type ContextProps = {
  user: User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user: User | any) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
