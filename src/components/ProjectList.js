import { useState, useEffect } from "react";
import axios from "axios";
import CreateProject from "./CreateProject";
import CreateTask from "./CreateTask";
import QuickEntryTask from "./QuickEntryTask";
import { Link } from "react-router-dom";
import TaskListPage from "./TaskList";
 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [isShown, setIsShown] = useState("")
   
  const getAllProjects = () => {
    console.log("get projects called")
    axios
      .get(`${API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  console.log("rendering")

  const deleteTask = (id) => {
    console.log("delete called")
    axios
      .post(`${API_URL}/api/tasks/${id}/delete`)
      .then(() => getAllProjects())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("works")
    getAllProjects();
  }, [] );
   
  projects && console.log(projects)
    
  return (
    <div className="ProjectListPage">
        
      {projects.map((project) => {
        return (
          <>

            <div className="ProjectCard card" key={project._id} >
              <Link onClick={() => setIsShown(project._id)}> 
                <h3>{project.title}</h3>
              </Link>
            </div>

            <div>

              <TaskListPage project={project} isShown={isShown} deleteTask={deleteTask}/>
               
            </div>

            {isShown === project._id && <div><QuickEntryTask projectId={project._id} refresh={getAllProjects}/></div>}
            {isShown === project._id && <div><CreateTask projectId={project._id} refresh={getAllProjects}/></div> }

          </>
        );
      })}  

      <div>
      <CreateProject refresh={getAllProjects}/>
      </div> 



    </div>
  );
}
   
  export default ProjectListPage;