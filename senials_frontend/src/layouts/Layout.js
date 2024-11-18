import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    // 레이아웃 최대높이 (사이트 최대높이 브라우저 창 크기)
    <div style={{height: '100vh'}}>
      <Outlet />
    </div>
  );
}

export default Layout;
