import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CreateProject from "./CreateProject";
import QuickEntryTask from "./QuickEntryTask"
import EditTask from "./EditTask";

import { Link } from "react-router-dom";
import TaskListPage from "./TaskList";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"


function ProjectListPage({ projects, setProjects, getAllProjects, deleteTask, getSpecificTasks, tasks, setTasks, showForm}) {
  // console.log("PROJECTS: ", projects)

  const dragItem = useRef();
  const dragOverItem = useRef();



  const updateList = () => {
    /* projects && setTimeout(() => { */
    axios
      .post(`${API_URL}/api/projects/sort`, { array: copyListItems })
    /* }, 10) */
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

  let copyListItems = []

  const drop = () => {
    // console.log("PROJECTS3", projects)
    copyListItems = [...projects]
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
    setProjects(copyListItems)
    console.log(copyListItems)
    updateList()

  };

  const { user } = useContext(AuthContext);


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
                  onDragStart={(elem) => dragStart(elem, i)}
                  onDragEnter={(elem) => dragEnter(elem, i)}
                  onDragEnd={drop}
                  draggable >

                  <Link onClick={() => {
                    getSpecificTasks(project?._id) 
                    showForm(project?._id)
                    }}>

                    <h3>{project?.title}</h3>
                  </Link>

                  <button onClick={() => deleteProject(project?._id)}  > Delete </button>
                </div>
{/*                 <div>

                  <TaskListPage
                    project={project}
                    isShown={isShown}
                    deleteTask={deleteTask}
                    dragStart={dragStart}
                    dragEnter={dragEnter}
                    drop={drop}
                    setProjects={setProjects} 
                    setTasks={setTasks} 
                    tasks={tasks}
                    />


                </div> */}
              </div>


            </div>
          );
        })}
    </div>
  );
}

export default ProjectListPage;
