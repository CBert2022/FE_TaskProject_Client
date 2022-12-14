import { useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"


function ProjectListPage({ projects, setProjects, getAllProjects, getSpecificTasks, showForm }) {
  // console.log("PROJECTS: ", projects)

  /*   const dragItem = useRef();
    const dragOverItem = useRef(); */

  const { user } = useContext(AuthContext);


  /*    const updateList = (projects) => {
      console.log("projects", projects)
      axios
        .post(`${API_URL}/api/projects/sort`, { array: projects })
    };  */


  /*   const dragStart = (element, position) => {
      console.log("PROjECTS: ", projects)
      dragItem.current = position;
      // console.log("DRAG START ",element.target);
    };
  
    const dragEnter = (element, position) => {
      // console.log("PROJECTS2", projects)
      dragOverItem.current = position;
      // console.log("DRAG END ",element.target);
    };
  
    let copyListItems = [null]
  
    const drop = () => {
      // console.log("PROJECTS3", projects)
      copyListItems = [...projects]
      // const copyListItems = JSON.parse(JSON.stringify(projects));
       console.log("COPY LIST ITEMS: ", copyListItems)
      // console.log("DRAG ITEM", dragItem);
      const dragItemContent = copyListItems[dragItem.current];
      // console.log("DRAG ITEM CONTENT: ", dragItemContent)
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      console.log("LIST: ", copyListItems)
      const matches = copyListItems.filter((oneProject) => { return oneProject.createdBy === user._id })
      console.log("MATCHES",matches)
      setProjects(matches)
      updateList(matches)
    }; */



  const deleteProject = (id) => {
    axios
      .post(`${API_URL}/api/projects/${id}/delete`)
      .then(() => getAllProjects())
      .catch((error) => console.log(error));
  }

  return (
    <div className="ProjectListPage">

      {projects?.filter((oneProject) => { return oneProject.createdBy === user._id })
        .map((project, i) => {
          return (
            <div key={i}>

              <div>
                <div className="ProjectCard card"
                  key={i}
/*                   onDragStart={(elem) => dragStart(elem, i)}
                  onDragEnter={(elem) => dragEnter(elem, i)}
                  onDragEnd={drop}
                  draggable  */>

                  <div onClick={() => {
                    getSpecificTasks(project?._id)
                    showForm(project?._id)
                  }}>

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
