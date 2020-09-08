import { useState, useEffect } from 'react';
import { firebase } from '../config/fbConfig';

const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const unsub = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          const userInfo = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            uid: user.uid,
            providerData: user.providerData,
          };
          setUser(userInfo);
          setAuthLoaded(true);
        } else {
          setUser(null);
          setAuthLoaded(true);
        }
      },
      (error) => {
        console.log(error);
        setError(error);
      }
    );

    return () => unsub();
  }, []);

  return { user, auth: firebase.auth, authLoaded, error };
};

export default useFirebase;
