import React from 'react';
import SideNav from '../components/SideNav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row items-stretch h-screen w-full md:overflow-y-hidden">
      <SideNav />
      <Outlet />
    </div>
  );
};

export default Layout;
