import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function ImportantTask({allProjects, tasks, getSpecificTasks, deleteTask}) {
    const [isShown, setIsShown] = useState(false);

      useEffect(() => {
        getSpecificTasks();
      },[allProjects]);

      return (
        <>
        <div className="ImportantCard card">
              <Link onClick={() => setIsShown(!isShown)}>
                Important Tasks
              </Link>
        </div>
            {isShown && tasks.map((task) => {
              if (task.important){
                return (
                  <div className="TaskCard card" key={task._id} >
                    {<h3>IMPORTANT:{task.title}</h3>}
                    <button onClick={()=>deleteTask(task._id)}  > Delete </button>
                  </div>
                );
              }
            })}    
        </>
      );
}


export default ImportantTask;
