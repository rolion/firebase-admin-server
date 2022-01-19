require('dotenv').config();
const config = {
    dev: process.env.ENV !== "production",
    port: process.env.PORT,
    host: process.env.HOST,
    https: process.env.HTTPS,
    firebase: {
        GoogleApplicationCredentials:process.env.GOOGLE_APPLICATION_CREDENTIALS,
        ApiKey:process.env.FIREBASE_API_KEY,
        AuthDomain:process.env.FIREBASE_AUTH_DOMAIN,
        ProjectId:process.env.FIREBASE_PROJECT_ID,
        StorageBucket:process.env.FIREBASE_STORAGE_BUCKET,
        MessagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,
        AppId:process.env.FIREBASE_APP_ID,
        MeasurementId:process.env.FIREBASE_MEASUREMENT_ID
    }
}
