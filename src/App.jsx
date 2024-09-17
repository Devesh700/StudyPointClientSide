import React from 'react';
// import NavBar from './components/NavBar';
import ErrorBoundary from './ErrorBoundary';
import myRoutes from './myRoutes';
import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import NotFoundPage from './components/NotFoundPage';
import { Home, NavBar, NotFoundPage } from '.';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import Tutorials from './pages/Tutorials';

function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const version = import.meta.env.VITE_VERSION;

  return (
    <div>
      <ErrorBoundary>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/articles" element={<ArticlePage />}></Route>
          <Route path="/tutorials" element={<Tutorials />}></Route>
          <Route path='*' element={<NotFoundPage/>}></Route>
        </Routes>
      </ErrorBoundary>


    </div>
  );
}

export default App;
