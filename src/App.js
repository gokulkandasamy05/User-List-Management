import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './layouts/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { ProtectedRoutes } from './utils/routes';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';

function App() {
  const { loading } = useSelector(state => state?.Loader)
  return (
    <>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
               <Route index element={<Navigate to="/user_list" replace />} />
              {ProtectedRoutes.map(({ route, component: Component }) => (
                <Route key={route} path={route} element={<Component />} />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
      {loading && <Spinner></Spinner>}
    </>
  );
}

export default App;
