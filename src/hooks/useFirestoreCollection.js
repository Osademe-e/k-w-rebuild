import { useEffect, useState } from 'react';

import { kingsportFirestore } from '../config/fbConfig';

const useFirestoreCollection = (collection) => {
  const [ordered, setOrdered] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setError(null);
    setFetching(true);
    console.log(collection);
    const unsub = kingsportFirestore.collection(collection).onSnapshot(
      (querySnapshot) => {
        let ordered = [];
        let data = {};

        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            ordered.push({
              id: doc.id,
              ...doc.data(),
            });

            data = {
              ...data,
              [doc.id]: {
                ...doc.data(),
              },
            };
          });
          setOrdered(ordered);
          setData(data);
          setFetching(false);
        } else {
          setOrdered(ordered);
          setData(data);
          setFetching(false);
        }
      },
      (error) => {
        console.log(error);
        setError(error);
        setFetching(false);
      }
    );
    // setFetching(true);
    // kingsportFirestore
    //   .collection(collection)
    //   .get()
    //   .then((docs) => {
    //     let ordered = [];
    //     let data = {};

    //     docs.forEach((doc) => {
    //       ordered.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       });

    //       data = {
    //         ...data,
    //         [doc.id]: {
    //           ...doc.data(),
    //         },
    //       };
    //     });
    //     setOrdered(ordered);
    //     setData(data);
    //     setFetching(false);
    //     console.log(ordered);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    return () => {
      unsub();
    };
  }, [collection]);

  return { ordered, data, error, fetching };
};

export default useFirestoreCollection;
