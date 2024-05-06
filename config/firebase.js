import firebaseAdmin from "firebase-admin";
import serviceAccount from "./green-football-app-firebase-adminsdk-gdpxf-b3f393d289.json" assert { type: "json" };

const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export default firebase;
