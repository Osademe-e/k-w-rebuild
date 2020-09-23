import { useState, useEffect } from 'react';
import { kingsportFirestore } from '../config/fbConfig';

const useFiltersAndPagination = (
  collection,
  { fieldKey, comparismOperator, value },
  limit,
  page,
  { orderBy, order }
) => {
  const [ordered, setOrdered] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    setError(null);
    setFetching(true);
    let unsub;

    if (page) {
      if (fieldKey && comparismOperator && value) {
        unsub = kingsportFirestore
          .collection(collection)
          .where(fieldKey, comparismOperator, value)
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
                setOrdered((prevState) => {
                  if (prevState) {
                    return [...prevState, ...ordered];
                  } else {
                    return [...ordered];
                  }
                });
                setData((prevState) => {
                  if (prevState) {
                    return { ...prevState, ...data };
                  } else {
                    return { ...data };
                  }
                });
                setFetching(false);
              } else {
                setOrdered((prevState) => {
                  if (prevState) {
                    return [...prevState, ...ordered];
                  } else {
                    return [...ordered];
                  }
                });
                setData((prevState) => {
                  if (prevState) {
                    return { ...prevState, ...data };
                  } else {
                    return { ...data };
                  }
                });
                setFetching(false);
              }
            },
            (error) => {
              setError(error);
              setFetching(false);
            }
          );
      } else {
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
                setOrdered((prevState) => {
                  if (prevState) {
                    return [...prevState, ...ordered];
                  } else {
                    return [...ordered];
                  }
                });
                setData((prevState) => {
                  if (prevState) {
                    return { ...prevState, ...data };
                  } else {
                    return { ...data };
                  }
                });
                setFetching(false);
              } else {
                setOrdered((prevState) => {
                  if (prevState) {
                    return [...prevState, ...ordered];
                  } else {
                    return [...ordered];
                  }
                });
                setData((prevState) => {
                  if (prevState) {
                    return { ...prevState, ...data };
                  } else {
                    return { ...data };
                  }
                });
                setFetching(false);
              }
            },
            (error) => {
              setError(error);
              setFetching(false);
            }
          );
      }
    } else {
      if (fieldKey && comparismOperator && value) {
        unsub = kingsportFirestore
          .collection(collection)
          .where(fieldKey, comparismOperator, value)
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
              setError(error);
              setFetching(false);
            }
          );
      }
    }

    return () => {
      unsub();
    };
  }, [
    collection,
    limit,
    orderBy,
    order,
    fieldKey,
    comparismOperator,
    value,
    page,
  ]);

  return { ordered, data, error, fetching, nextPage };
};

export default useFiltersAndPagination;
