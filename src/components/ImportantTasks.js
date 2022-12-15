import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function ImportantTask({allTasks, deleteTask, getAllTasks, user}) {
    const [isShown, setIsShown] = useState(false);

      useEffect(() => {
        getAllTasks();
      },[]);

      return (
        <>
        <div className="ImportantCard card" onClick={() => setIsShown(!isShown)}>
              <h2>
                Important Tasks
              </h2>
        </div>
            {isShown && allTasks.map((task) => {
              if (task.createdBy === user._id && task.important){
                return (
                  <div className="TaskCard" key={task._id} >
                    {<h3>IMPORTANT:{task.title}</h3>}
                    <button className="push" onClick={(e)=>deleteTask(e, task._id)}  > Delete </button>
                  </div>
                );
              }
            })}    
        </>
      );
}


export default ImportantTask;
