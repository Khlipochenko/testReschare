import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Footer } from './footer/Footer';
import { SearchBar } from './search/SearchBar';
import { Header } from './header/Header';
export const Layout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/home';

  return (
    <>
      <Header></Header>
      <div
        className="
      relative
      overscroll-contain
      
      "
      >
        {/* ZEILE 31 (top-28) HÖHE HEADER V=N MING ANPASSEN */}

        {!isHomePage && (
          <div
            className="
              bg-[url(./assets/top.jpg)] 
              bg-clip-content
              bg-cover 
              bg-sticky
              fixed 
              top-32                       
              inset-0 
              bg-transparent
              opacity-30
              z-[-99]
              bg-center
        "
          ></div>
        )}
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};
