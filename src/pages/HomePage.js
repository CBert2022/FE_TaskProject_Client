import ProjectList from "../components/ProjectList"
import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import axios from "axios";
import CreateProject from "../components/CreateProject";
import TaskListPage from "../components/TaskList";
import 'animate.css';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";


function HomePage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [projectId, setProjectId] = useState(null)
  const [taskId, setTaskId] = useState(null);
  const [schedueldTaskIsShown, setSchedueldTaskIsShown] = useState(false);
  const [importantTaskIsShown, setImportantTaskIsShown] = useState(false)

  const { user } = useContext(AuthContext);

  const showForm = (id) => {
    setProjectId(id)
  }

  const showChosenTaskForm = (id) => {
    setTaskId(id)
  }
  const getAllProjects = () => {
    axios
      .get(`${API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  const getSpecificTasks = (id) => {
    return axios
      .get(`${API_URL}/api/tasks/${id}`)
      .then((response) => {
        setTasks(response.data.tasks)
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

  const deleteTask = (e, id) => {
    e.stopPropagation() 

    axios
      .post(`${API_URL}/api/tasks/${id}/delete`)
      .then(() => getAllTasks())
      .then(() => getSpecificTasks(projectId))
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    getAllTasks()
    getAllProjects()
  }, [])

  const importantState = () => {
    !schedueldTaskIsShown && setImportantTaskIsShown(false) 
  }

  const scheduleState = () => {
    !importantTaskIsShown && setSchedueldTaskIsShown(false) 
  }


  return (
    <div id='flexcontainer' className="animate__animated animate__fadeIn">
      <div id='flexleft'>
        <div className="ImportantCard card" onClick={() => {setImportantTaskIsShown(!importantTaskIsShown);scheduleState();}}>
          <h2>Important tasks</h2>
        </div>
        <div className="ScheduledCard card" onClick={() => {setSchedueldTaskIsShown(!schedueldTaskIsShown);importantState();}}>
          <h2>Scheduled tasks</h2>
        </div>
        
        <hr className="space"/>

{        <h3 className="projectFakeCard">Projects</h3>}
        <ProjectList setImportantTaskIsShown={setImportantTaskIsShown} setSchedueldTaskIsShown={setSchedueldTaskIsShown} projects={projects} getAllProjects={getAllProjects} setProjects={setProjects} getSpecificTasks={getSpecificTasks} showForm={showForm} />
        <CreateProject getAllProjects={getAllProjects} />
      </div>

      <div id='flexright'>
        <TaskListPage deleteTask={deleteTask} getSpecificTasks={getSpecificTasks} tasks={tasks} setTasks={setTasks} projectId={projectId} getAllTasks={getAllTasks} allTasks={allTasks} taskId={taskId} showChosenTaskForm={showChosenTaskForm} schedueldTaskIsShown={schedueldTaskIsShown} setSchedueldTaskIsShown={setSchedueldTaskIsShown} importantTaskIsShown={importantTaskIsShown} setImportantTaskIsShown={setImportantTaskIsShown} user={user}/>

      </div>
    </div>
  );
}

export default HomePage;
