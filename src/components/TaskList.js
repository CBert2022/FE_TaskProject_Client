import EditTask from "./EditTask";
import QuickEntryTask from "./QuickEntryTask";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Confetti from './Confetti'; // Confetti Test
import FilteredScheduledTasks from "./FilteredScheduledTasks";
import FilteredImportantTasks from "./FilteredImportantTasks";
import 'animate.css';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"

function TaskListPage({ getAllProjects, deleteTask, allTasks, tasks, setTasks, getSpecificTasks, projectId, getAllTasks, showChosenTaskForm, getChosenTask, taskId, schedueldTaskIsShown, importantTaskIsShown, user}) {

  useEffect(()=> {
    allTasks && allTasks.map((task) => {
        console.log(task.important)
    })
},[allTasks])

  const [isVisible, setIsVisible] = useState(false); // Confetti Test
  const [singleTask, setSingleTask] = useState(null);

  const handleClick = (e) => {
    console.log("getchosenTask", e)
    if (singleTask && e._id === singleTask._id) {
      setSingleTask(null)
    } else {
      setSingleTask(e)
    }
    console.log("task:", singleTask)
  }

  const updateList = (copyListItems) => {
    axios
      .post(`${API_URL}/api/tasks/${projectId}/sort`, { array: copyListItems })
      .then(() => { getSpecificTasks(projectId) })
  };


  const handleDoneSubmit = (e, task) => {

    e.stopPropagation()

    if (!task.done) {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 1000)
    }

    console.log("EEEE", task)
    e.preventDefault();
    return axios
      .put(`${API_URL}/api/tasks/${task._id}/edit`, { done: !task.done })
      .then((res) => {
        console.log("STATESTATE", res)
        getSpecificTasks(projectId)
      })
      .catch((error) => console.log(error));
  };

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (element, position) => {
    console.log("TASKS: ", tasks)
    dragItem.current = position;
    console.log("DRAG START ", element.target);
  };
  const dragEnter = (element, position) => {
    dragOverItem.current = position;
  };

  let copyListItems = []

  const drop = () => {
    copyListItems = [...tasks]
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    console.log("copylistitems: ", copyListItems)
    dragItem.current = null;
    dragOverItem.current = null;
    console.log("THIS IS THE ARRAY 2 ", copyListItems)
    setTasks(copyListItems);
    updateList(copyListItems)

  };
  importantTaskIsShown && console.log(importantTaskIsShown)
  return (
  
      <div>
      
      {importantTaskIsShown && <FilteredImportantTasks allTasks={allTasks} getAllTasks={getAllTasks} deleteTask={deleteTask} user={user} />}

      {schedueldTaskIsShown && <FilteredScheduledTasks allTasks={allTasks} getAllTasks={getAllTasks} deleteTask={deleteTask} user={user}/>}

      <h3 className="taskFakeCard animate__animated animate__fadeIn">Tasks</h3>

        {tasks?.map((task, i) => {
          
          return (
            <div>
              <div className={`TaskCard animate__animated animate__fadeIn ${task.done ? "DoneCard" : ""}`}
                onClick={() => {
                  handleClick(task)
                }}
                key={task._id}
                onDragStart={(elem) => dragStart(elem, i)}
                onDragEnter={(elem) => dragEnter(elem, i)}
                onDragEnd={drop}
                draggable>

                <div className="icon">
                  <h3>{task?.title}</h3>
                  <h3>✎</h3>
                </div>
                <div>
                </div>

                <button className='push' onClick={(e) => deleteTask(e, task._id)}  > Delete </button>
                <button onClick={(e) => { handleDoneSubmit(e, task) }}> Done </button>
                {isVisible && <Confetti />}

              </div>

              <div className="animate__animated animate__fadeIn">

                {singleTask && task._id === singleTask._id && <EditTask projectId={projectId} refresh={getAllProjects} setTasks={setTasks} tasks={tasks} getSpecificTasks={getSpecificTasks} singleTask={singleTask} getAllTasks={getAllTasks} allTasks={allTasks} taskId={taskId} getChosenTask={getChosenTask} showChosenTaskForm={showChosenTaskForm} setSingleTask={setSingleTask} />}

              </div>
            </div>

          )

        })}
        <div>
          {projectId && <QuickEntryTask projectId={projectId} getSpecificTasks={getSpecificTasks} />}
        </div>

      </div>
  );
}

export default TaskListPage;


