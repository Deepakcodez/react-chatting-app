import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD-eKo4TaykYnJdQ91AlXJ51auhgyDSWY0",
  authDomain: "chat-app-a22c7.firebaseapp.com",
  projectId: "chat-app-a22c7",
  storageBucket: "chat-app-a22c7.appspot.com",
  messagingSenderId: "448452663841",
  appId: "1:448452663841:web:2f229a318c76a3a5cf2160",
  measurementId: "G-YDZ71MM8VN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
