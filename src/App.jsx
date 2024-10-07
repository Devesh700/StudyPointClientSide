import React, { Suspense } from 'react';
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
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './pages/UserProfile';
import PostArticle from './pages/PostArticle';
import Admin from './pages/Admin';
import TutorialsCopy from './pages/TutorialsCopy';
import ArticlePreview from './pages/Components/ArticlePreview';
import About from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import LogTable from './pages/LogTable';
import Footer from './components/Footer';
import { verifyLogin } from './components/utils';

function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const version = import.meta.env.VITE_VERSION;

  return (

    <Suspense fallback={()=><div>loading...</div>} >
      <div>
      <ErrorBoundary>
        <NavBar />
        <Routes>
          <Route path='*' element={<NotFoundPage/>}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/articles" element={<ArticlePage />}></Route>
          <Route path="/:title/:_id" element={<ArticlePreview />}></Route>
          <Route path="/tutorials" element={<TutorialsCopy />}></Route>
          <Route path="/tutorials/:id" element={<Tutorials />}></Route>
          <Route path='/user/:id' element={<UserProfile/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<ContactUs/>}></Route>
          {verifyLogin() && <>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/postarticle' element={<PostArticle/>}></Route>
          <Route path='/logs' element={<LogTable/>}></Route>
          </>}
          
          
        </Routes>
        <Footer/>
      </ErrorBoundary>


    </div>
    </Suspense>
  );
}

export default App;
