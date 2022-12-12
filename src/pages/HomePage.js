/* import CreateTask from "../components/CreateTask"; */
import ImportantTask from "../components/ImportantTasks";
import ScheduledTask from "../components/ScheduledTasks";
import ProjectList from "../components/ProjectList"
import CreateTask from "../components/CreateTask";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateProject from "../components/CreateProject";


const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"


function HomePage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);



  const getAllProjects = () => {
    axios
      .get(`${API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  const getAllTasks = () => {
    console.log("getAllTasks")
    axios
      .get(`${API_URL}/api/tasks`)
      .then((response) => {
          setTasks(response.data)
        
      }).then((response) => {
        console.log(tasks)
        
      })
      .catch((error) => console.log(error));
  }
  
  const deleteTask = (id) => {
    axios
    .post(`${API_URL}/api/tasks/${id}/delete`)
    .then(() => getAllProjects())
    .catch((error) => console.log(error));
  };

  
    useEffect(()=>{
      getAllProjects()
      getAllTasks()
    },[])

  const {logOutUser, user} = useContext(AuthContext);


    return (
      <div>
          <ImportantTask allProjects={projects} tasks={tasks} getAllTasks={getAllTasks} deleteTask={deleteTask}/>
          <ScheduledTask allProjects={projects} tasks={tasks} getAllTasks={getAllTasks} deleteTask={deleteTask}/>
          <ProjectList projects={projects} getAllProjects={getAllProjects} deleteTask={deleteTask} setProjects={setProjects} getAllTasks={getAllTasks} tasks={tasks} setTasks={setTasks}/>
          <CreateProject getAllProjects={getAllProjects}/>

          <button onClick={logOutUser}>Logout</button>
      </div>
    );
  }
   
  export default HomePage;