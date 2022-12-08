import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function ScheduledTask({allProjects}) {
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [isShown, setIsShown] = useState();
    console.log(isShown)

      const getAllScheduledTasks = () => {
/*         const today = new Date().toISOString()
        const newDate = today + 86400000
         console.log(newDate) */
   /*      allProjects.map((project)=>{
         const x = project.tasks.filter((task)=> {
          return task.dueDate 
          })
          setScheduledTasks(x)
  
        }) */
        };

      const deleteTask = (id) => {
        console.log("delete called")
        axios
          .post(`${API_URL}/api/tasks/${id}/delete`)
          .then(() => getAllScheduledTasks())
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllScheduledTasks();
      }, [allProjects] );

      scheduledTasks && console.log(scheduledTasks)

      return (
        <>
        <div className="ScheduledCard card">
              <Link onClick={() => setIsShown(!isShown)}>
                Scheduled Tasks
              </Link>
        </div>
           {/*  {isShown && scheduledTasks.map((scheduledTask) => {
              return (
                <div className="TaskCard card" key={scheduledTask._id} >
                  <h3>SCHEDUELD:{scheduledTask.title}</h3>
                  <h3>{scheduledTask.dueDate}</h3>
                  <button onClick={()=>deleteTask(scheduledTask._id)}  > Delete </button>
                </div>
              );
            })}   */}  
        </>
      );
}


export default ScheduledTask;