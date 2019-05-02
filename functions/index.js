const functions = require("firebase-functions");

exports.TestFunction = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
  });
