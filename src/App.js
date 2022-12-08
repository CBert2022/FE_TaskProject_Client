import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";  
import Navbar from "./components/Navbar";     
import ProjectList from "./components/ProjectList";     
import CreateTask from "./components/CreateTask";
import ImportantTask from "./components/ImportantTasks";
import ScheduledTask from "./components/ScheduledTasks";

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
      <ImportantTask allProjects={projects}/>
      <ScheduledTask allProjects={projects}/>
       <Routes>      
        <Route path="/" element={ <ProjectList projects={projects} getAllProjects={getAllProjects}/> } />
      </Routes>
      <CreateTask />
    </div>
  );
}
 
export default App;