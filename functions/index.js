const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const axios = require('axios');

admin.initializeApp();
db = admin.firestore();

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

// collection leagues
// id - league id from rapidapi
// {
//     country: {
//         name: String,
//         code: String,
//         flag: Url
//     },

//     id: Number,
//     name:String,
//     type:String,
//     logo:Url,
//     Year: String,
// }
