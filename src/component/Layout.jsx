import React from "react";
import "./Css/Layout.css";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="background">
      <div className="layout_box">
        <div className="menu_box">
          <div className="menu_title">MENU</div>
          <Link to="/" className="menu_nav">To-do List</Link>
          <Link to="/planner" className="menu_nav">Planner</Link>
          <Link to="/record" className="menu_nav">Record</Link>
        </div>
        
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
