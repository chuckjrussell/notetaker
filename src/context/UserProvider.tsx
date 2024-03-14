import {User, onAuthStateChanged} from 'firebase/auth';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../firebase/firebase.config';
import {UserModel} from '../firebase/firestoreTypes';
import firestore from '../firebase/firestore';

type UserContextType = {
  loggedInUser: User | null;
  userData: UserModel | null;
  initialized: boolean;
};

const UserContext = createContext<UserContextType>({
  loggedInUser: null,
  userData: null,
  initialized: false,
});

type UserProviderProps = {
  children: ReactNode;
};
export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        firestore.getUser(user?.uid).then(data => {
          console.log('got user: ', JSON.stringify(data));
          setUserData(data);
        });
      }
      setInitialized(true);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUser: user,
        initialized: initialized,
        userData: userData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
