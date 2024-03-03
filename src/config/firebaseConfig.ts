import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRBASE_API_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRBASE_API_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRBASE_API_STORE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRBASE_API_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRBASE_API_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIRBASE_API_MEASURMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
