import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import MyWork from './pages/MyWork';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import ProjectDetail from './pages/ProjectDetail';
import PageNotFound from './pages/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/my-work' element={<MyWork />} />
          <Route path='/about-me' element={<AboutMe />} />
          <Route path='/contact-me' element={<ContactMe />} />
          <Route path='/projects/:id' element={<ProjectDetail />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}
