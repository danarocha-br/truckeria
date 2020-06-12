const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

admin.initializeApp(functions.config().firebase);

const schema = buildSchema(`
type Schedules {
  id: String
  address: String
  city: String
  state: String
  date_start: Date
  date_end: Date
  time_start: Date
  time_end: Date
}

type Query {
  schedules(): [Schedules!]
}
`);

const root = {
  schedules: async () => {
    const snapshot = await admin.database.ref("schedules").get();
    const schedules = [];
    snapshot;
  },
};

const app = express();

app.use(
  "/grapql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// admin.initializeApp();
// const db = admin.firestore();

// exports.schedules = functions.https.onRequest(async (request, response) => {
//   const snapshot = await db.collection("schedules").get();
//   const schedules = snapshot.empty
//     ? []
//     : snapshot.docs.map((doc) => Object.assign(doc.data(), { id: doc.id }));

//   response.send(schedules);
// });

exports.express = functions.https.onRequest(app);
