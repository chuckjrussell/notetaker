import {User, onAuthStateChanged} from 'firebase/auth';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {auth} from './firebase.config';

type UserContextType = {
  loggedInUser: User | null;
};

const UserContext = createContext<UserContextType>({loggedInUser: null});

type UserProviderProps = {
  children: ReactNode;
};
export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={{loggedInUser: user}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
