import {User, onAuthStateChanged} from 'firebase/auth';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {auth} from './firebase.config';

type UserContextType = {
  loggedInUser: User | null;
  initialized: boolean;
};

const UserContext = createContext<UserContextType>({
  loggedInUser: null,
  initialized: false,
});

type UserProviderProps = {
  children: ReactNode;
};
export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
      setInitialized(true);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{loggedInUser: user, initialized: initialized}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
