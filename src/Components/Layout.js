/**
 * @file Layout.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Josef Škorpík
 * @brief A small component to wrap a navbar and the rest.
 */

import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />

      <div>{children}</div>
    </div>
  );
}

export default Layout;
