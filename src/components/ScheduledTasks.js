import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function ScheduledTask({allProjects, tasks, getAllTasks, deleteTask}) {
    const [isShown, setIsShown] = useState();

      useEffect(() => {
        getAllTasks();
      }, [allProjects] );

      return (
        <>
        <div className="ScheduledCard card">
              <Link onClick={() => setIsShown(!isShown)}>
                Scheduled Tasks
              </Link>
        </div>
        {isShown && tasks.map((task) => {
              if (task.dueDate){
                return (
                  <div className="TaskCard card" key={task._id} >
                    <h3>SCHEDUELD:{task.title}</h3>
                    <h3>{task.dueDate}</h3>
                    <button onClick={()=>deleteTask(task._id)}  > Delete </button>
                  </div>
                );
              }
            })}
        </>
      );
}


export default ScheduledTask;