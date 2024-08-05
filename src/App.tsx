import React from 'react';

import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';

import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';

function App() {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);
    return (
        <ChakraProvider theme={currentTheme}>
            <Routes>
                <Route path="auth/*" element={<AuthLayout />} />
                <Route
                    path="admin/*"
                    element={
                        <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
                    }
                />
                <Route path="/" element={<Navigate to="/admin" replace />} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
