import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { ProtectedRoutes } from './utils/routes';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './components/PageNotFound';
import Login from './pages/Login';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  const { loading } = useSelector(state => state?.Loader)
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/user_list" replace />} />
                {ProtectedRoutes.map(({ route, component: Component }) => (
                  <Route key={route} path={route} element={<Component />} />
                ))}
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {loading && <Spinner></Spinner>}
    </>
  );
}

export default App;
