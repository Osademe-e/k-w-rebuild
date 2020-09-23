import { useEffect, useState } from 'react';

import { kingsportFirestore } from '../config/fbConfig';

const useFilters = (
  collection,
  { fieldKey, comparismOperator, value },
  limit
) => {
  const [ordered, setOrdered] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setError(null);
    setFetching(true);
    let unsub;

    if (limit) {
      unsub = kingsportFirestore
        .collection(collection)
        .where(fieldKey, comparismOperator, value)
        .limit(limit)
        .onSnapshot(
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
    } else {
      unsub = kingsportFirestore
        .collection(collection)
        .where(fieldKey, comparismOperator, value)
        .onSnapshot(
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
    }

    return () => {
      unsub();
    };
  }, [collection, limit, fieldKey, comparismOperator, value]);

  return { ordered, data, error, fetching };
};

export default useFilters;
