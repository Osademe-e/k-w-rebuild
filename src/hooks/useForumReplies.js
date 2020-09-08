import { useState, useEffect } from 'react';
import { kingsportFirestore } from '../config/fbConfig';

export default (forumDoc, commentDoc, limit, page) => {
  const [ordered, setOrdered] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    setFetching(true);
    console.log('useReplies');
    let unsub;
    if (commentDoc) {
      if (page) {
        unsub = kingsportFirestore
          .collection('forum')
          .doc(forumDoc)
          .collection('comments')
          .doc(commentDoc)
          .collection('replies')
          .limit(limit)
          .orderBy('createdAt', 'desc')
          .startAfter(page)
          .onSnapshot(
            (snapshots) => {
              let ordered = [];
              let data = {};
              if (snapshots.size > 0) {
                setNextPage(snapshots.docs[snapshots.docs.length - 1]);

                snapshots.forEach((snap) => {
                  ordered.push({ replyId: snap.id, ...snap.data() });
                  data = {
                    ...data,
                    [snap.id]: {
                      ...snap.data(),
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
              setError(error);
              setFetching(false);
            }
          );
      } else {
        unsub = kingsportFirestore
          .collection('forum')
          .doc(forumDoc)
          .collection('comments')
          .doc(commentDoc)
          .collection('replies')
          .limit(limit)
          .orderBy('createdAt', 'desc')
          .onSnapshot(
            (snapshots) => {
              let ordered = [];
              let data = {};
              if (snapshots.size > 0) {
                setNextPage(snapshots.docs[snapshots.docs.length - 1]);

                snapshots.forEach((snap) => {
                  ordered.push({ replyId: snap.id, ...snap.data() });
                  data = {
                    ...data,
                    [snap.id]: {
                      ...snap.data(),
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
    } else {
      setFetching(false);
    }

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [forumDoc, commentDoc, limit, page]);

  return { ordered, data, error, fetching, nextPage };
};
