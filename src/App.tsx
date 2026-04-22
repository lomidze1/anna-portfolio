import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/animations/CustomCursor';
import ScrollProgress from './components/animations/ScrollProgress';

const Home = lazy(() => import('./pages/Home'));
const MyWork = lazy(() => import('./pages/MyWork'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const ContactMe = lazy(() => import('./pages/ContactMe'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const IOSProjects = lazy(() => import('./pages/IOSProjects'));
const IPadProjects = lazy(() => import('./pages/IPadProjects'));
const GraphicProjects = lazy(() => import('./pages/GraphicProjects'));
const DesignWork = lazy(() => import('./pages/DesignWork'));
const CreativeProducts = lazy(() => import('./pages/CreativeProducts'));

function MainLayout() {
  return (
    <>
      <Header />
      <main id='main-content' tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Suspense fallback={<div className='page-loading' />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/my-work' element={<MyWork />} />
            <Route path='/about-me' element={<AboutMe />} />
            <Route path='/contact-me' element={<ContactMe />} />
            <Route path='/design-work' element={<DesignWork />} />
            <Route path='/creative-products' element={<CreativeProducts />} />
            <Route path='/ios-projects' element={<IOSProjects />} />
            <Route path='/ipad-projects' element={<IPadProjects />} />
            <Route path='/graphic-projects' element={<GraphicProjects />} />
            <Route path='/projects/:id' element={<ProjectDetail />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
