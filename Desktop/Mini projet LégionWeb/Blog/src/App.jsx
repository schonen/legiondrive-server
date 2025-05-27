import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import BlogList from './pages/BlogList';
import BlogForm from './pages/BlogForm';
import BlogDetail from './pages/BlogDetail';
import ErrorBoundary from './components/ErrorBoundary';
import Register from "./pages/Register";




const App = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/new" element={<BlogForm />} />
      <Route path="/edit/:id" element={<BlogForm />} />
      <Route path="/post/:id" element={<BlogDetail />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </ErrorBoundary>
);

export default App;