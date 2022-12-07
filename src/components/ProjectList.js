import { useState, useEffect } from "react";
import axios from "axios";
import CreateProject from "./CreateProject";
import CreateTask from "./CreateTask";
import { Link } from "react-router-dom";
 
const API_URL = "http://localhost:5005";

function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [isShown, setIsShown] = useState("")
   
  const getAllProjects = () => {
    axios
      .get(`${API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  const deleteProject = (id) => {
    axios
      .post(`${API_URL}/api/tasks/${id}/delete`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };
   

  useEffect(() => {
    getAllProjects();
  }, [] );
   
  projects && console.log(projects)
    
  return (
    <div className="ProjectListPage">
        
      {projects.map((project) => {
        return (
          <>

            <div className="ProjectCard card" key={project._id} >
              {/* <Link to={`/projects/${project._id}`}> */}
              <Link onClick={() => setIsShown(project._id)}> 
                <h3>{project.title}</h3>
              </Link>
            </div>

            <div>
              
             {isShown === project._id && project.tasks && project.tasks.map((task) => {
                return (
                  <>
                  <div className="TaskCard card" key={task._id} >
                    <h3>{task.title}</h3>
                    <h4>{project._id}</h4>
                    <button onClick={()=>deleteProject(task._id)} > Delete </button> 
                  </div>
                  
                
                </>
                )
              })}

               
            </div>

            {isShown === project._id && <div><CreateTask projectId={project._id} refresh={getAllProjects}/></div> }

          </>
        );
      })}  

      <div>
      <CreateProject />
      </div> 

    </div>
  );
}
   
  export default ProjectListPage;