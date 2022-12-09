import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import QuickEntryTask from "./QuickEntryTask";
import { Link } from "react-router-dom";
import TaskListPage from "./TaskList";
 
const API_URL = "http://localhost:5005"

function ProjectListPage({projects, setProjects, getAllProjects, deleteTask}) {
  // console.log("PROJECTS: ", projects)

  const [isShown, setIsShown] = useState("")
   const dragItem = useRef();
  const dragOverItem = useRef();



  const updateList =() => {
    console.log("HELLOO")
  projects && setTimeout(()=> {
    axios
    .post(`${API_URL}/api/projects/sort`, {array: projects})
  },1000)
    };
  


 const dragStart = (element, position) => {
  console.log("PROjECTS: ", projects)
    dragItem.current = position;
    // console.log("DRAG START ",element.target);
  };

  const dragEnter = (element, position) => {
    // console.log("PROJECTS2", projects)
    dragOverItem.current = position;
    // console.log("DRAG END ",element.target);
  };



  const drop = () => {
    // console.log("PROJECTS3", projects)
    let copyListItems = [...projects]
    // const copyListItems = JSON.parse(JSON.stringify(projects));
    // console.log("COPY LIST ITEMS: ", copyListItems)
    // console.log("DRAG ITEM", dragItem);
    const dragItemContent = copyListItems[dragItem.current];
    // console.log("DRAG ITEM CONTENT: ", dragItemContent)
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    console.log("LIST: ", copyListItems)
    setProjects(copyListItems);
      updateList()
    
  };
 
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
        
      {projects?.map((project, i) => {
        return (
          <>

<div>
            <div className="ProjectCard card" 
            key={project._id} 
            onDragStart={(elem) => dragStart(elem, i)}
            onDragEnter={(elem) => dragEnter(elem, i)} 
            onDragEnd={drop}
            draggable >
              
              <Link onClick={() => setIsShown(project?._id)}> 
                <h3>{project?.title}</h3>
              </Link>
              <button onClick={()=>deleteProject(project?._id)}  > Delete </button> 
            </div>
            <div>

              <TaskListPage 
              project={project} 
              isShown={isShown} 
              deleteTask={deleteTask} 
              dragStart={dragStart}
              dragEnter={dragEnter}
              drop={drop} 
              setProjects={setProjects}/>
               
            </div>
</div>
{/* 
            {isShown === project._id && <div><QuickEntryTask projectId={project._id} refresh={getAllProjects}/></div>}
            {isShown === project._id && <div><CreateTask projectId={project._id} refresh={getAllProjects}/></div> }
 */}
          </>
        );
      })}  



    </div>
  );
}
   
  export default ProjectListPage;