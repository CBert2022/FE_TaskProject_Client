import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function ImportantTask({allTasks, deleteTask, getAllTasks}) {
    const [isShown, setIsShown] = useState(false);

      useEffect(() => {
        getAllTasks();
      },[]);

      return (
        <>
        <div className="ImportantCard card">
              <h2 onClick={() => setIsShown(!isShown)}>
                Important Tasks
              </h2>
        </div>
            {isShown && allTasks.map((task) => {
              if (task.important){
                return (
                  <div className="TaskCard card" key={task._id} >
                    {<h3>IMPORTANT:{task.title}</h3>}
                    <button className="push" onClick={()=>deleteTask(task._id)}  > Delete </button>
                  </div>
                );
              }
            })}    
        </>
      );
}


export default ImportantTask;
