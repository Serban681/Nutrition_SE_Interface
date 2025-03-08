import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/login.tsx'

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA3H92tPEYFGYw65ipUP3aWx2TNmhXhUas",
  authDomain: "stayfresh-e455b.firebaseapp.com",
  projectId: "stayfresh-e455b",
  storageBucket: "stayfresh-e455b.firebasestorage.app",
  messagingSenderId: "802575890253",
  appId: "1:802575890253:web:fa0205a9e71f6542286904",
  measurementId: "G-WQ708F08WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

export { auth }
