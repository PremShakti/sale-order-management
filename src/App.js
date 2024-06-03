// src/App.js
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Orders from './pages/Orders';
import { Button, ChakraProvider, CSSReset, useColorMode } from '@chakra-ui/react';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  return (
    <ChakraProvider>
      <CSSReset />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/login" state={{ from: location }} />} />
        <Route path="/" element={<Navigate to="/orders" />} />
      </Routes>
      <Button onClick={toggleColorMode} position="fixed" bottom="1rem" right="1rem">
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </ChakraProvider>
  );
};

export default App;
