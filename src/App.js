import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthService from './service/AuthService';
import { login } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = AuthService.usuarioCorrente();
    if (loggedInUser) {
      dispatch(login(loggedInUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;