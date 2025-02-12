import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials=true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // Set initial state for userdata as an empty object or null
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userdata, setUserdata] = useState(null); // Corrected initial state
  const getAuthState=async ()=>{
    try {
      const {data}= await axios.get(backendUrl + '/api/auth/isauth')
      if(data.success){
     setIsLoggedin(true);
     getUserData();
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getUserData=async ()=>{
    try {
      const {data}= await axios.get(backendUrl + '/api/user/data');
      console.log(data)
      data.success ? setUserdata(data.userData):toast.error(data.message)
    } catch (error) {
      toast.error(data.message)
    }
  }
  useEffect(()=>{
    getAuthState();
  },[])
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userdata,
    setUserdata,
    getUserData
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
