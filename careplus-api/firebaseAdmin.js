// Firebase Admin SDK — server-side auth verification
// Used to verify Firebase ID tokens from the frontend

import admin from "firebase-admin";

let initialized = false;

export function initFirebaseAdmin() {
    if (initialized) return;

    // Option 1: Using a downloaded serviceAccountKey.json file
    // Place the file in careplus-api/ and update the path below:
    const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    if (keyPath) {
        // Since we are in ESM, we can't 'require' a JSON file directly easily.
        // We'll skip this for now or use the individual env variables.
        console.warn("⚠️  FIREBASE_SERVICE_ACCOUNT_PATH is set but ESM doesn't support direct require. Using individual env variables instead.");
    }

    if (process.env.FIREBASE_PROJECT_ID) {
        // Option 2: Using individual environment variables
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Replace escaped \n in private key from .env
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
        });
        console.log("✅ Firebase Admin initialized from environment variables");
    } else {
        console.warn("⚠️  Firebase Admin not configured. Set FIREBASE_PROJECT_ID in .env");
    }

    initialized = true;
}

// Verify a Firebase ID token (sent from the frontend after login)
export async function verifyFirebaseToken(idToken) {
    try {
        initFirebaseAdmin();
        const decoded = await admin.auth().verifyIdToken(idToken);
        return decoded; // { uid, email, name, picture, ... }
    } catch (err) {
        throw new Error("Invalid or expired Firebase token: " + err.message);
    }
}
