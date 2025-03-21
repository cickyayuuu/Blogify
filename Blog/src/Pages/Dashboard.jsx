import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../Dashboard/Sidebar';
import MyProfile from "../Dashboard/MyProfile"
import MyBlogs from "../Dashboard/MyBlogs"
import UpdateBlog from "../Dashboard/Updateblog"
import CreateBlog from "../Dashboard/CreateBlog"
import { Navigate } from 'react-router-dom';


const Dashboard = () => {
  const {profile, isAuth} = useAuth();
  const [component, setComponent]=useState("My Blogs")
  // console.log(profile)
  // console.log(isAuth);

  if(!isAuth){
    return <Navigate to={"/"}/>
  }
  return (
    <div>
      <Sidebar component={component} setComponent={setComponent}/>
      {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
    </div>
  )
}

export default Dashboard
