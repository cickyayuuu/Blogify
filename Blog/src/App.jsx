import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Blogs from "./Pages/Blogs"
import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import Register from "./Pages/Register"
import About from "./Pages/About"
import Notfound from './Pages/Notfound'
import Contact from "./Pages/Contact"
import { useAuth } from "./context/AuthProvider";
import Creators from "./Pages/Creators";
import toast, { Toaster } from 'react-hot-toast';
import Updateblog from "./Dashboard/Updateblog";
import Detail from "./Pages/Detail";
const App = () => {
  
  const location = useLocation();
  const hideNavbarFooter =["/dashboard","/login","/register"].includes(
    location.pathname
  )
  const {blogs, isAuth} = useAuth()
  console.log(blogs)
  console.log(isAuth)
  return (
    <div>
      {!hideNavbarFooter && <Navbar />} 
      {/* // defining Routes */}
        <Routes>
          <Route path="/" element={isAuth===true?<Home/>:<Navigate to={"/login"}/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/creators" element={<Creators/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
           {/* single details page route  */}
          <Route path="/blog/:id" element={<Detail/> } />
           {/* Update page route  */}
          <Route path="/blog/update/:id" element={<Updateblog/>}/>

          {/* universal route  */}

          <Route path="*" element={<Notfound/>} />
        </Routes>
        <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
