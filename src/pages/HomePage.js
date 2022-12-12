import ImportantTask from "../components/ImportantTasks";
import ScheduledTask from "../components/ScheduledTasks";
import ProjectList from "../components/ProjectList"
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
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
        console.log("RESPONSEEEEEEEE", response.data)
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
      .then(() => getAllProjects())
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    getAllProjects()
  }, [])

  const { logOutUser, user } = useContext(AuthContext);


  return (
    <div>
      <ImportantTask allProjects={projects} tasks={tasks} getSpecificTasks={getSpecificTasks} deleteTask={deleteTask} />

      <ScheduledTask allProjects={projects} tasks={tasks} getSpecificTasks={getSpecificTasks} deleteTask={deleteTask} />

      <TaskListPage projects={projects} getAllProjects={getAllProjects} deleteTask={deleteTask} setProjects={setProjects} getSpecificTasks={getSpecificTasks} tasks={tasks} setTasks={setTasks} projectId={projectId} getAllTasks={getAllTasks} allTasks={allTasks}/>

      <ProjectList projects={projects} getAllProjects={getAllProjects} deleteTask={deleteTask} setProjects={setProjects} getSpecificTasks={getSpecificTasks} tasks={tasks} setTasks={setTasks} showForm={showForm} />

      <CreateProject getAllProjects={getAllProjects} />

      <button onClick={logOutUser}>Logout</button>
    </div>
  );
}

export default HomePage;
