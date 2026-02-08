import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

//export all the children and create the use of hook to use diff components
//component for auth provider
export function AuthProvider({ children }) {
  //state var for the current user, if login the user info is set
  const [currentUser, setCurrentUser] = useState(null);
  //if uer log in set to true otherwise false
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  //load the state of the user 
  const [loading, setLoading] = useState(true);

  
//this is a call back function in order to unsubcribe, for clean up 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

//if user login the user 
  async function initializeUser(user) {
    if (user) {

      setCurrentUser({ ...user });

      // check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // check if the auth provider is google or not
    //   const isGoogle = user.providerData.some(
    //     (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
    //   );
    //   setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}