import { useEffect, useState } from 'react';

import { kingsportFirestore } from '../config/fbConfig';

const usePagination = (collection, limit, page, { orderBy, order }) => {
  const [ordered, setOrdered] = useState(null);
  const [data, setData] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setError(null);
    setFetching(true);
    let unsub;
    if (orderBy) {
      if (page) {
        unsub = kingsportFirestore
          .collection(collection)
          .orderBy(orderBy, order)
          .limit(limit)
          .startAfter(page)
          .onSnapshot(
            (querySnapshot) => {
              let ordered = [];
              let data = {};

              if (querySnapshot.size > 0) {
                setNextPage(querySnapshot.docs[querySnapshot.docs.length - 1]);

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
                setOrdered((prevState) => [...prevState, ...ordered]);
                setData((prevState) => ({ ...prevState, ...data }));
                setFetching(false);
              } else {
                setOrdered((prevState) => [...prevState, ...ordered]);
                setData((prevState) => ({ ...prevState, ...data }));
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
          .orderBy(orderBy, order)
          .limit(limit)
          .onSnapshot(
            (querySnapshot) => {
              let ordered = [];
              let data = {};

              if (querySnapshot.size > 0) {
                setNextPage(querySnapshot.docs[querySnapshot.docs.length - 1]);

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
    } else {
      if (page) {
        unsub = kingsportFirestore
          .collection(collection)
          .limit(limit)
          .startAfter(page)
          .onSnapshot(
            (querySnapshot) => {
              let ordered = [];
              let data = {};

              if (querySnapshot.size > 0) {
                setNextPage(querySnapshot.docs[querySnapshot.docs.length - 1]);

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
                setOrdered((prevState) => [...prevState, ...ordered]);
                setData((prevState) => ({ ...prevState, ...data }));
                setFetching(false);
              } else {
                setOrdered((prevState) => [...prevState, ...ordered]);
                setData((prevState) => ({ ...prevState, ...data }));
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
          .limit(limit)
          .onSnapshot(
            (querySnapshot) => {
              let ordered = [];
              let data = {};

              if (querySnapshot.size > 0) {
                setNextPage(querySnapshot.docs[querySnapshot.docs.length - 1]);

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
    }

    return function () {
      unsub();
    };
  }, [collection, limit, page, orderBy, order]);

  return { ordered, data, nextPage, error, fetching };
};

export default usePagination;
