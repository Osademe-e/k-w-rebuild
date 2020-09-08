import { useState, useEffect } from 'react';
import { kingsportFirestore } from '../config/fbConfig';

export default (collection, document) => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    let unsub;
    if (document) {
      unsub = kingsportFirestore
        .collection(collection)
        .doc(document)
        .onSnapshot(
          (d) => {
            if (d.exists) {
              setDoc({
                id: d.id,
                ...d.data(),
              });
              setFetching(false);
            } else {
              setDoc(null);
              setFetching(false);
            }
          },
          (error) => {
            setError(error);
            setFetching(false);
          }
        );
    } else {
      setFetching(false);
    }

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [collection, document]);

  return { doc, error, fetching };
};
