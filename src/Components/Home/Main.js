import React from "react";

// outlet is used to render the content of nested routes
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from "./Footer";

const Main = () => {
  return (
    <div>
        {/* rendering the header component */}
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Main;