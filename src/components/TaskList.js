import { useState, useEffect, useRef } from "react";
import CreateTask from "./CreateTask";

function TaskListPage(props) {


  const dragItem = useRef();
  const dragOverItem = useRef();

 const dragStart = (element, position) => {
  console.log("TASKS: ", props.project.tasks)
    dragItem.current = position;
    console.log("DRAG START ",element.target);
  };
console.log(props)
  const dragEnter = (element, position) => {
    console.log("TASKS2", props.project.tasks)
    dragOverItem.current = position;
    console.log("DRAG ENTER ",element.target);
  };

  const drop = () => {
    console.log("TASKS3", props.project.tasks)
    let copyListItems = [...props.project.tasks]
    // const copyListItems = JSON.parse(JSON.stringify(projects));
    console.log("COPY LIST ITEMS: ", copyListItems)
    console.log("DRAG ITEM", dragItem);
    const dragItemContent = copyListItems[dragItem.current];
    console.log("DRAG ITEM CONTENT: ", dragItemContent)
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    console.log("list" , props.project)
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