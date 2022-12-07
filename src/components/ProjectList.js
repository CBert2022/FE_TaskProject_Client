import { useState, useEffect } from "react";
import axios from "axios";
import CreateProject from "./CreateProject";
import { Link } from "react-router-dom";
 
const API_URL = "http://localhost:5005";

function ProjectListPage() {
    const [projects, setProjects] = useState([]);
   
    const getAllProjects = () => {
      axios
        .get(`${API_URL}/api/projects`)
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
              <div className="ProjectCard card" key={project._id} >
              <Link to={`/projects/${project._id}`}>
                <h3>{project.title}</h3>
              </Link>
              </div>
            );
          })}    
          <div>
          <CreateProject />
          </div> 
      </div>

    );
  }
   
  export default ProjectListPage;