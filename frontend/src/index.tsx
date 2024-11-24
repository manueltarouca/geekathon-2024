import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { Home } from './pages/home/page.home';
import { ThemeProvider } from './contexts/theme.context';
import { TimeLine } from './pages/timeline/page.timeline';
import { NotFound } from './pages/not-found/page.not.found';
import { AuthProvider, useAuthContext } from './contexts/auth.context';
import { Login } from './pages/login/login';
import Loading from './shared/ui/components/loading/ui.loading';
import { Register } from './pages/register/register';
import { Summary } from './pages/Summary/page.summary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const PrivateRoutes = () => {
  const { authenticated, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/tm/:pluginId" element={<TimeLine />} />
              <Route path="/tm/:pluginId/dt/:transId" element={<Summary />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
