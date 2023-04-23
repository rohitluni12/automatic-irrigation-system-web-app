
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.database();

module.exports = db;