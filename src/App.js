import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import FileList from './components/FileList';
import FileForm from './components/FileForm';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/files" element={<FileList />} />
          <Route path="/upload" element={<FileForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
