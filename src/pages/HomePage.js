import CreateTask from "../components/CreateTask";
import ImportantTask from "../components/ImportantTasks";
import ScheduledTask from "../components/ScheduledTasks";
import ProjectList from "../components/ProjectList"
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function HomePage() {
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

  const {logOutUser} = useContext(AuthContext);

    return (
      <div>
          <ImportantTask allProjects={projects}/>
          <ScheduledTask allProjects={projects}/>
          <ProjectList projects={projects} getAllProjects={getAllProjects}/>
{/*           <CreateTask /> */}
          <button onClick={logOutUser}>Logout</button>
      </div>
    );
  }
   
  export default HomePage;