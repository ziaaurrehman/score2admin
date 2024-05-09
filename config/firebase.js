import firebaseAdmin from "firebase-admin";
import serviceAccount from "./my-flutter-football-app-firebase-adminsdk-2vc6l-cbf00bc31e.json" assert { type: "json" };

const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export default firebase;
