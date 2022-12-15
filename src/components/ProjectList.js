import { useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function ProjectListPage({ projects, setSchedueldTaskIsShown, setImportantTaskIsShown, getAllProjects, getSpecificTasks, showForm }) {

  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState("")
  const deleteProject = (id) => {
    axios
      .post(`${API_URL}/api/projects/${id}/delete`)
      .then(() => {
        getAllProjects()
        showForm(null)
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="ProjectListPage">

      {projects?.filter((oneProject) => { return oneProject.createdBy === user._id })
        .map((project, i) => {
          return (
            <div key={i} onClick={() => {
              getSpecificTasks(project?._id)
              showForm(project?._id)
              setSelected(project?._id)
              setSchedueldTaskIsShown(false)
              setImportantTaskIsShown(false)
            }}>
              <div>
                <div className="ProjectCard card" style={{backgroundColor: selected === project._id ? "#0a3842a0" : ""}} key={i}>
                  <div >
                    <h3>{project?.title}</h3>
                  </div>
                  <button className='push' onClick={() => deleteProject(project?._id)}  > Delete </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProjectListPage;
