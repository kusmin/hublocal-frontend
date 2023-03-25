import React from 'react';
import Header from '../components/Header';
import ProtectedLayout from '../components/ProtectedLayout';

const HomePage = () => {
  return (
    <ProtectedLayout>
      <Header />
    </ProtectedLayout>
  );
};

export default HomePage;