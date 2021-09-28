import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase  from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArvd3HLd_ZBMVawywzZhH9AqT01-cX0uY",
  authDomain: "cart-1d864.firebaseapp.com",
  projectId: "cart-1d864",
  storageBucket: "cart-1d864.appspot.com",
  messagingSenderId: "232121303602",
  appId: "1:232121303602:web:6c1132469a284a1e40322b"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


