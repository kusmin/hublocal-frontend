import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { login } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(login(user));
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Utilize o componente PrivateRoute para rotas protegidas: */}
        {/* <PrivateRoute path="/" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;