import { useState, useEffect } from "react";

function ImportantTask({allTasks, deleteTask, getAllTasks, ImportantTaskIsShown, setImportantTaskIsShown}) {

      useEffect(() => {
        getAllTasks();
      },[]);

      return (
        <>
        <div className="ImportantCard card">
              <h2 onClick={() => setImportantTaskIsShown(!ImportantTaskIsShown)}>
                Important Tasks
              </h2>
        </div>
            {/* {ImportantTaskIsShown && allTasks.map((task) => {
              if (task.important){
                return (
                  <div className="TaskCard card" key={task._id} >
                    {<h3>IMPORTANT:{task.title}</h3>}
                    <button className="push" onClick={()=>deleteTask(task._id)}  > Delete </button>
                  </div>
                );
              }
            })}     */}
        </>
      );
}


export default ImportantTask;
