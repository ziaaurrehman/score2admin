import firebaseAdmin from "firebase-admin";
import serviceAccount from "./blue-football-application-firebase-adminsdk-8jjza-d15f74a4f0.json" assert { type: "json" };

const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export default firebase;
