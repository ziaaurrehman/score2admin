import firebaseAdmin from "firebase-admin";
// import serviceAccount from "./blue-football-application-firebase-adminsdk-8jjza-d15f74a4f0.json" assert { type: "json" };

const firebase_key = {
  "type": "service_account",
  "project_id": "yora-sport-app",
  "private_key_id": "f6d86cfad543eb49fb78560728f0f02412ec79e5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDeQGYHYcXb1X9c\nsx/+NmequhJPSsGkRCZqPb679f6osEFkbA/fWaMVVHpv+4KHjrFcB45dAeUCoy44\nphfzOdJOPaI5YUaFgcCZFwM9RXL+ksVWF23xl4pSUCzA1JdXPStfmIJUtgb6/48R\nfXjb+gNu4sFe+blbEw6r8xd54GQTDHgVYtdLOVXaSW55n7OlaI38npbc2DRS8fWn\ncsJ+XPPjoUttIp850ZyIZfyn3FryxFwxidDTmZxyKgolakEfUIcelncBybKRkGjN\n7HGlULAyB0p4G4h5oZyjhdAFnKKDeAOFovcz2wHfGyBQzDQhsj27bjx+CEinwbC0\nz67a6mbFAgMBAAECggEANeIlGmsQ/lBPtZjUC90C2ziLkd/M/Nds/NsFcCqe2CUL\nZZ5xZrQjvtshaB7xMY5d37MRR+larX4EicVzDwwYudFlkEXORDYGDNeweF1rGN9a\nqpm5lRYpefVoNEQWgRcaee3Ow1zyak4lUJc8AxElXe/p8+3Vi4geSYABVBIcESXE\nAYSthwdyQw5DzLpIQozLWnuGXBXZIvcCMnxAzQxzvxlH65Cl6U8UgJOAxxBEqntv\n131M7dKcPen+YufSZm6mF5GF/D4MsINC0MX+PUu6+JpPOYQo5wEw3Y0hT6g9K7pe\nqZ9fs0Y1JUV8MeutcNOirNC/rKMruCadUQG2KyIUbQKBgQD4b11EMLz/NQPQs79A\n+ECl1Pjh6fpLxNOjARdocQkVsbm+36cUDWzs7XkXPolJyl4kyf+q4cTiShlj1bsk\nFcW1vH9PAz1/h+SVaR1jjnn9Ejwpz07NOdKgAAaa3bAutafnyAJzqbQxhotRIBkl\nUMUAd6SZwS77CxHkAA2GK4W1YwKBgQDlBOzbwZTS2/qiacvwF9jhUas0F87KwFpF\nrAE75u3eGwJb1UibTU9PBUd0aRDiW2xyS088oMexE76KCWavolyVs59Ks+73NKiA\nXoc+oRxEG9NQrN6sV9ym2PzyNwcSYGe/AGCkPHItj5sD/4MiuN7gKefBvyOjHLB8\nIx+nGcJftwKBgQDHyM7pCoTCewDBcftIpRtgAJ/RFVcqXXOQb01CuTwEDTOBctwq\nvQ0uj15Eug6vn6UL0sHeysaI7+vxJCzlvPiMyLRcdw+aok7JdImkySwCvwpQ2RzW\n3zwpXTvyiHqpZX5MX8TQ/NUiyr74k2aFYqm6UXy2BOviCKnvf7dggVl6XwKBgQCh\nzW8Ce6wHpX9YC+MXx+Fkn2yTq1ZgjLG6k6Fzjt3zk6WA+BkKD/6+V356Ulipc+oU\nffyHWxh6lPaDU80GvXEoGvWps6JbaQq7Vw26Q91SiU4sq1XO8WxlPNzIy/PlGdNy\ncHPW1RXd9p2Qn48okvBz82dXzREChpxxt+b/CgX31QKBgQDO/xh2x5U9xiMCi8sK\nS0TrTJrdeJFTokC7OYwPU/dU7Ky59zEuEFJmdN9JG+M9qxA9epG5ndroau2P/P9n\nQAsVx+Pr9ywB9Vzzv0yuB/bVV9ovU6eSXZO7m2SdJ5/fozYe/uc7HTVew3VREPZY\nv1OQjUd7bACuTK+pI+aprteSeQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-qnlyo@yora-sport-app.iam.gserviceaccount.com",
  "client_id": "107253201387305051230",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qnlyo%40yora-sport-app.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

//const serviceAccount = JSON.parse(firebase_key);

const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebase_key),
});

export default firebase;
