import { useState, useEffect } from "react";

function ImportantTask({allTasks, deleteTask, getAllTasks, ImportantTaskIsShown, setImportantTaskIsShown}) {

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
            {/* {ImportantTaskIsShown && allTasks.map((task) => {
              if (task.important){
                return (
                  <div className="TaskCard" key={task._id} >
                    {<h3>IMPORTANT:{task.title}</h3>}
                    <button className="push" onClick={(e)=>deleteTask(e, task._id)}  > Delete </button>
                  </div>
                );
              }
            })}     */}
        </>
      );
}


export default ImportantTask;
