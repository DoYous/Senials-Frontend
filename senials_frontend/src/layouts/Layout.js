import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={{minHeight: '100vh'}}>
      <Outlet />
    </div>
  );
}

export default Layout;
