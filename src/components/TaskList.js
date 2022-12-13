import ImportantTask from "../components/ImportantTasks";
import ScheduledTask from "../components/ScheduledTasks";

import EditTask from "./EditTask";
import QuickEntryTask from "./QuickEntryTask";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"


function TaskListPage({ getAllProjects, deleteTask, allTasks, tasks, setTasks, getSpecificTasks, projectId, getAllTasks, showChosenTaskForm, getChosenTask, taskId, refresh }) {

  const [checked, setChecked] = useState(true)
  const [singleTask, setSingleTask] = useState(null);

   const handleClick = (e) => {
 
     console.log("getchosenTask", e)
     setSingleTask(e)
 
   }

   const handleDoneSubmit = (e ,id) => {
    e.preventDefault();


   return axios
   .put(`${API_URL}/api/tasks/${id}/edit`, {done: !checked})
   .then(() => {
    setChecked(!checked);
     getSpecificTasks(projectId)
   })
   .catch((error) => console.log(error));
};


  return (

    <div>
      {tasks?.map((task) => {
        return (
          <div key={task._id}>
          {console.log(task.done)}
            <div className={`card ${task.done? "ImportantCard" : ""}`} /* key={task._id} onDragStart={(elem) => dragStart(elem, i)} onDragEnter={(elem) => dragEnter(elem, i)} onDragEnd={drop} draggable */>

              <div onClick={(e) => {
                handleClick(task)
              }}>
                <h3>{task?.title}</h3>
              </div>
              <button className='push' onClick={() => deleteTask(task._id)}  > Delete </button>
              <button onClick={(e)=> handleDoneSubmit(e, task._id)}> Done </button>
            </div>
          </div>


        )
      })}
      <div>
        {projectId && <QuickEntryTask projectId={projectId} getSpecificTasks={getSpecificTasks}/>}
        {singleTask && <EditTask projectId={projectId} refresh={getAllProjects} setTasks={setTasks} tasks={tasks} getSpecificTasks={getSpecificTasks} singleTask={singleTask} getAllTasks={getAllTasks} allTasks={allTasks} taskId={taskId} getChosenTask={getChosenTask} showChosenTaskForm={showChosenTaskForm}/>}
      </div>

    </div>
  );
}

export default TaskListPage;

/*   const dragItem = useRef();
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

  }; */

