import { useState, useEffect } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import QuickEntryTask from "./QuickEntryTask";
import { Link } from "react-router-dom";
import TaskListPage from "./TaskList";
 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function ProjectListPage({projects, getAllProjects, deleteTask}) {
  const [isShown, setIsShown] = useState("")

  const deleteProject = (id) => {
    axios 
    .post(`${API_URL}/api/projects/${id}/delete`)
    .then(() => getAllProjects())
    .catch((error) => console.log(error));
  }


  useEffect(() => {
    getAllProjects();
  }, [] );
    
  return (
    <div className="ProjectListPage">
        
      {projects.map((project) => {
        return (
          <>

            <div className="ProjectCard card" key={project._id} >
              <Link onClick={() => setIsShown(project._id)}> 
                <h3>{project.title}</h3>
              </Link>
              <button onClick={()=>deleteProject(project._id)}  > Delete </button> 
            </div>

            <div>

              <TaskListPage project={project} isShown={isShown} deleteTask={deleteTask}/>
               
            </div>

            {isShown === project._id && <div><QuickEntryTask projectId={project._id} refresh={getAllProjects}/></div>}
            {isShown === project._id && <div><CreateTask projectId={project._id} refresh={getAllProjects}/></div> }

          </>
        );
      })}  



    </div>
  );
}
   
  export default ProjectListPage;