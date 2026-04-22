import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Product from "./components/Product";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/product" element={<Product />} />
      </Routes>
  );
}

export default App;