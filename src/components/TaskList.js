import axios from "axios";
import { useState, useEffect, useRef } from "react";
import EditTask from "./EditTask";

function TaskListPage(props) {

  const dragItem = useRef();
  const dragOverItem = useRef();

 const dragStart = (element, position) => {
  console.log("TASKS: ", props.project.tasks)
    dragItem.current = position;
    console.log("DRAG START ",element.target);
  };
  const dragEnter = (element, position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    let copyListItems = [...props.project.tasks]
    // const copyListItems = JSON.parse(JSON.stringify(projects));
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    props.setTasks(copyListItems);
  };
 
    return (
        <div>
             {props.isShown === props.project?._id && props.project?.tasks && props.project.tasks.map((task, i) => {
                return (
                  <div key={task._id}>
                  <div className="TaskCard card" key={task._id} 
                  onDragStart={(elem) => dragStart(elem, i)}
                  onDragEnter={(elem) => dragEnter(elem, i)} 
                  onDragEnd={drop}
                  draggable>
                    <h3>{task.title}</h3>
                    <button onClick={()=>props.deleteTask(task._id)}  > Delete </button> 
                  </div>
                </div>
                )
              })}
        </div>
    );
  } 
   
  export default TaskListPage;