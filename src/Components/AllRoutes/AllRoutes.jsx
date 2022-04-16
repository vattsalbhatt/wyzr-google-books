import { Routes, Route } from "react-router";
import { OneBook } from "../Books/OneBook";
import { Home } from "../Home/Home";
import { Navbar } from "../Navbar/Navbar";
import { Search } from "../Search/Search";

export const AllRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:id" element={<OneBook />} />
        <Route path="/*" element={"not found"} />
      </Routes>
    </>
  );
};
