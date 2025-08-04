// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import MyWork from './pages/MyWork';
// import AboutMe from './pages/AboutMe';
// import ContactMe from './pages/ContactMe';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import ProjectDetail from './pages/ProjectDetail';
// import PageNotFound from './pages/PageNotFound';

// function App() {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/my-work' element={<MyWork />} />
//         <Route path='/about-me' element={<AboutMe />} />
//         <Route path='/contact-me' element={<ContactMe />} />
//         <Route path='/projects/:id' element={<ProjectDetail />} />
//         <Route path='*' element={<PageNotFound />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;

import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import MyWork from './pages/MyWork';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import ProjectDetail from './pages/ProjectDetail';
import PageNotFound from './pages/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/Footer';

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
  );
}
