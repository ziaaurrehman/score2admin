import firebaseAdmin from "firebase-admin";
// import serviceAccount from "./blue-football-application-firebase-adminsdk-8jjza-d15f74a4f0.json" assert { type: "json" };

const firebase_key = {
  type: "service_account",
  project_id: "blue-football-sports",
  private_key_id: "51eb997ae14bd77dae9a2b664d26b5ea7a951658",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCW/tq2JUJmyFqJ\noTZYbXhuqVB6X0VXLChl07MdlgyJ6NmGJ3LdGrbsz0kbavODa4qMHl0zViYZp3EC\nSXxV4mYpYzRRTAqW781TwxrpNQKkkYzF2prKVmE69e9fj5Md9GXEN53Vp6iSUnZl\nspUCGHNLuzAKTr2DVm/1ma5d0yR3N0FhXeQeixnNNlrrlMNMnJu6+Quy/6n5oljt\nOnqZ/z0LvSi/LnLP3XEuwQxSDPiJ9Ml3Q8PczAv/oe13hPAKzyKGjsIn6XQc64+i\nYPrU3AluE9azl3SYlBoN/XVvRAudxe6a8ksccP+Uvh4BpNZS5N2k+JC7nWk/Xz2E\nqmJ8KQ/xAgMBAAECgf9bXNmTKZHqa+n19nw4a54min90WMq1p4JjtDSTMlD9h5oW\n3y4hNIjg9CUui26Zll7xz9P7VaUeekvNMBAlGotP5gOoYHQH4BF2tuPeaxtH3snO\n7cO7Q+9d1z5MenmjjL2gfGzqjW4lgYy7yQXGvtFq577c5C5g/QXBfCIe1omGy0ce\n3JlneyIOV9qMgkPDZpAGchleADRuRdbSNBDOw3af/n8On8WIn1X4m2tDghKzqqyf\nv6sMy3M0jAUKgQWRth9PUsDS8Ze6+MIxBkduEetKIiyLHrp7zqAoeXscidTlu9sP\nuVALtRwwTYFidW7X/PIZTRSUIqmEzPX2XRoysbkCgYEAxxeRSbpS8hj49++yCR+2\nWCO437xBZOceLU9AMiRZvN4QGMW4UkuPLCjsEPjRoZTlK+nxv6tPFNFdCFJj91nO\nx9gyjJNzmvsv6qFv7l0V4v18nkI7yRXYS8DyN4j9r48Rt79ONgu1mW2KOvE1JTZJ\nPWFSSTCgmc32QtCw5MeQJcUCgYEAwifanj+6Uxu8oHoMBZVn9OFxN1iU/8XedNdB\nXsChQGdsvOzeCHUcaLs5pXUeBskzBa+oduQ0P2cgVGPkNuBg4n8ErabPZVJhbTQz\n3ZtkELD1UW+3HA1Vp6+LGD3VvavuTQMCKZvatShWml4BmCb8KPZkXzWu5tJRi4n0\nwbGg0D0CgYEAkfBMp+bU9nInzlb+AoIkf+dvlVHB/d0M2dnGDPtobHG7Cu2kd267\nvHsi0C4UPIWQl+gdNYq1pWTy9S6v6JkEYqmwJCvSCkEmlq9QBUJm0MVPnBKhEH3a\n12zQILVigFY3fqHVCvj6XUVWlm5JrsVkWoIEd3IVx6iaY8/mW02N9KECgYAVNXNN\nLBr3byU4xnw/s+VqO6I5cIS+N+goDUeHyTUUKvgW3y0V8W0MB7+xUkzYYuwe5+RY\nMG+AqYw/i7XnRLVwqH1jVsB7Cfe4jSZJQ+s3Y404uyJefxpnOebQ3BhYIsriQLzg\nvLS0a1aigDheXYvYEao/OEcF0d20h3pkGjo95QKBgEb7GkEL2Lph7UyEWzl2Totf\nINWI/rqT4Hqfdb+dpCXbDLdGR7aiEKd4zkgcdR3BKck54cjj8ImqI7iKf9f3nFI2\n/otEGppOGT50qbynTqG0Dq2yqIhTSlcwuje4tZLVZECjNjOTD6HBpjyoHQJQhBmM\nG1S6uuGoyfi7Bszg4ffl\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-ihoeb@blue-football-sports.iam.gserviceaccount.com",
  client_id: "103740915933793358093",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ihoeb%40blue-football-sports.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
//const serviceAccount = JSON.parse(firebase_key);

const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebase_key),
});

export default firebase;
