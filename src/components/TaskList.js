import ImportantTask from "../components/ImportantTasks";
import ScheduledTask from "../components/ScheduledTasks";

import EditTask from "./EditTask";
import QuickEntryTask from "./QuickEntryTask";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"


function TaskListPage({ getAllProjects, deleteTask, allTasks, tasks, setTasks, getSpecificTasks, projectId, getAllTasks, showChosenTaskForm, getChosenTask, taskId, refresh }) {

  const { isLoggedIn, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("")
  const [important, setImportant] = useState(false)
  const [checked, setChecked] = useState(false)
  const [singleTask, setSingleTask] = useState(null);



  useEffect(() => {
    axios
      .get(`${API_URL}/api/task/${taskId}`)
      .then((response) => {
        const oneTask = response.data;
        setTitle(oneTask.title);
        setDescription(oneTask.description);
        setDueDate(oneTask.dueDate);
        setImportant(oneTask.important);
        setChecked(oneTask.checked)
      })
      .catch((error) => console.log(error));

  }, [taskId]);
  taskId && console.log(taskId)


   const handleClick = (e) => {
 
     console.log("getchosenTask", e)
     setSingleTask(e)
 
   }
  return (

    <div>
      {tasks?.map((task) => {
        return (
          <div key={task._id}>

            <div className="TaskCard" /* key={task._id} onDragStart={(elem) => dragStart(elem, i)} onDragEnter={(elem) => dragEnter(elem, i)} onDragEnd={drop} draggable */>

              <div onClick={(e) => {
                handleClick(task)
              }}>
                <h3>{task?.title}</h3>
              </div>
              <button className='push' onClick={() => deleteTask(task._id)}  > Delete </button>

              <button > Done </button>
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

