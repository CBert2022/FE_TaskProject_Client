import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ScheduledTask({allTasks, deleteTask, getAllTasks}) {
    const [isShown, setIsShown] = useState();

      useEffect(() => {
        getAllTasks();
      }, [] );

      return (
        <>
        <div className="ScheduledCard card">
              <h2 onClick={() => setIsShown(!isShown)}>
                Scheduled Tasks
              </h2>
        </div>
        {isShown && allTasks.map((task) => {
              if (task.dueDate){
                return (
                  <div className="TaskCard card" key={task._id} >
                    <h3>SCHEDULED:{task.title}</h3>
{/*                     <h3>{task.dueDate}</h3>
 */}                    <button className="push" onClick={()=>deleteTask(task._id)}  > Delete </button>
                  </div>
                );
              }
            })}
        </>
      );
}


export default ScheduledTask;
