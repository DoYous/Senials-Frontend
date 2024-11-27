import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    // 레이아웃 최대높이 (사이트 최소높이 브라우저 창 크기)
    <div style={{minHeight: '100vh'}}>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default Layout;
