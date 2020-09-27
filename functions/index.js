const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const axios = require('axios');
const crypto = require('crypto');

admin.initializeApp();
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.updateLeague = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    //   get post body
    const { token, uid, name, country } = req.body;

    try {
      const { uid: decodedUid } = await admin.auth().verifyIdToken(token);
      const user = await db.collection('users').doc(uid).get();

      //   verify user making this request
      if (decodedUid === uid && user.data().role === 'super admin') {
        // get current season of the league
        const {
          data: { response },
        } = await axios({
          method: 'GET',
          url: 'https://api-football-beta.p.rapidapi.com/leagues',
          headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
            'x-rapidapi-key': functions.config().kingsports.rapidapikey,
            useQueryString: true,
          },
          params: {
            name,
            current: 'true',
            country,
          },
        });

        if (response.length > 0) {
          // construct data structure for storage
          const docId = response[0].league.id.toString();
          const docData = {
            country: response[0].country,
            year: Math.max(...response[0].seasons.map((s) => Number(s.year))),
            name: response[0].league.name,
            logo: response[0].league.logo,
            type: response[0].league.type,
          };

          // get league fixtures
          const {
            data: { response: fixtures },
          } = await axios({
            method: 'GET',
            url: 'https://api-football-beta.p.rapidapi.com/fixtures',
            headers: {
              'content-type': 'application/octet-stream',
              'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
              'x-rapidapi-key': functions.config().kingsports.rapidapikey,
              useQueryString: true,
            },
            params: {
              league: docId,
              season: docData.year,
            },
          });

          docData.fixtures = fixtures;

          // save to db
          await db.collection('leagues').doc(docId).set(docData);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(
            JSON.stringify({ message: 'Database update successfull.' })
          );
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          return res.end(
            JSON.stringify({
              error: 'Season not started.',
            })
          );
        }
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            error: 'Unauthorized',
          })
        );
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(
        JSON.stringify({
          error,
        })
      );
    }
  });
});

// webhook for successfull withdrawal
exports.transfer = functions.https.onRequest(async (req, res) => {
  //validate event
  let hash = crypto
    .createHmac('sha512', functions.config().kingsports.paystackkey)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash === req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    let { event, data } = req.body;

    if (event === 'charge.success') {
      // data.metadata
      const { userId } = data.metadata;

      try {
        const userDoc = await db.collection('users').doc(userId).get();

        let update = {};

        if (userDoc.data().subscriptions) {
          if (userDoc.data().subscriptions.premium) {
            update = {
              subscriptions: {
                ...userDoc.data().subscriptions,
                premium: {
                  ...userDoc.data().subscriptions.premium,
                  subscribed: true,
                  bundle: {
                    ...userDoc.data().subscriptions.premium.bundle,
                    subAt: FieldValue.serverTimestamp(),
                    expAt: admin.firestore.Timestamp.fromDate(
                      new Date(
                        new Date(data.created_at).getTime() +
                          1000 * 60 * 60 * 24 * 30
                      )
                    ),
                    trxref: data.reference,
                  },
                },
              },
            };
          } else {
            update = {
              subscriptions: {
                ...userDoc.data().subscriptions,
                premium: {
                  subscribed: true,
                  bundle: {
                    subAt: FieldValue.serverTimestamp(),
                    expAt: admin.firestore.Timestamp.fromDate(
                      new Date(
                        new Date(data.created_at).getTime() +
                          1000 * 60 * 60 * 24 * 30
                      )
                    ),
                    trxref: data.reference,
                  },
                },
              },
            };
          }
        } else {
          update = {
            subscriptions: {
              premium: {
                subscribed: true,
                bundle: {
                  ...userDoc.data().subscriptions.premium.bundle,
                  subAt: FieldValue.serverTimestamp(),
                  expAt: admin.firestore.Timestamp.fromDate(
                    new Date(
                      new Date(data.created_at).getTime() +
                        1000 * 60 * 60 * 24 * 30
                    )
                  ),
                  trxref: data.reference,
                },
              },
            },
          };
        }

        await db.collection('users').doc(userId).update(update);
      } catch (error) {
        console.log(error);
      }
    }

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
