import ImportantTask from "../components/ImportantTasks";
import ScheduledTask from "../components/ScheduledTasks";
import ProjectList from "../components/ProjectList"
import { useState, useEffect } from "react";
import axios from "axios";
import CreateProject from "../components/CreateProject";
import TaskListPage from "../components/TaskList";



const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"


function HomePage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [projectId, setProjectId] = useState(null)


  const showForm = (id) => {
    setProjectId(id)
  }

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  const getSpecificTasks = (id) => {
    console.log("this is the project id: ", id)
    console.log("getSpecificTasks")
    axios
      .get(`${API_URL}/api/tasks/${id}`)
      .then((response) => {
        /*         console.log("RESPONSEEEEEEEE", response.data) */
        setTasks(response.data)
      }).then((response) => {
        console.log(tasks)
      })
      .catch((error) => console.log(error));
  }

  const getAllTasks = () => {
    axios
      .get(`${API_URL}/api/tasks`)
      .then((response) => {
        setAllTasks(response.data)
      })
      .catch((error) => console.log(error));
  }

  const deleteTask = (id) => {
    axios
      .post(`${API_URL}/api/tasks/${id}/delete`)
      .then(() => getAllTasks())
      .then(() => getSpecificTasks(projectId))
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    getAllProjects()
  }, [])


  return (
    <div id='flexcontainer'>
      <div id='flexleft'>

        <ImportantTask allTasks={allTasks} getAllTasks={getAllTasks} deleteTask={deleteTask} />

        <ScheduledTask allTasks={allTasks} getAllTasks={getAllTasks} deleteTask={deleteTask} />

        <ProjectList projects={projects} getAllProjects={getAllProjects} setProjects={setProjects} getSpecificTasks={getSpecificTasks} showForm={showForm} />

        <CreateProject getAllProjects={getAllProjects} />

      </div>
      <div id='flexright'>

        <TaskListPage deleteTask={deleteTask} getSpecificTasks={getSpecificTasks} tasks={tasks} setTasks={setTasks} projectId={projectId} />

      </div>
    </div>
  );
}

export default HomePage;
