//const { initializeApp, applicationDefault } = require('firebase-admin/app');
var admin = require("firebase-admin");
const config = require("../../../config");
var serviceAccount = require("../../../../firebase-key.json");
//import { getAuth } from 'firebase/auth';
const appFirebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



module.exports = appFirebase;
