import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";  
import Navbar from "./components/Navbar";     
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";


const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function App() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    console.log("get projects called")
    axios
      .get(`${API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(()=>{
    getAllProjects()
  },[])

  return (
    <div className="App">
      <Navbar />
        <Routes>      
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={ <IsPrivate> <HomePage /> </IsPrivate> } />
      </Routes>
    </div>
  );
}
 
export default App;