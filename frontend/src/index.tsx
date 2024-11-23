import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/home/page.home';
import { ThemeProvider } from './contexts/theme.context';
import { TimeLine } from './pages/timeline/page.timeline';
import { NotFound } from './pages/not-found/page.not.found';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/tm/:pluginId" element={<TimeLine />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
